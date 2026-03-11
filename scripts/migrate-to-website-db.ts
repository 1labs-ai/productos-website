/**
 * Migration Script: ProductOS-pitch → ProductOS-website
 * 
 * Run this script after creating the new ProductOS-website database in Neon.
 * 
 * Usage:
 *   1. Create ProductOS-website in Neon console
 *   2. Set NEW_DATABASE_URL env var with the new connection string
 *   3. Run: npx ts-node scripts/migrate-to-website-db.ts
 */

import { PrismaClient } from '@prisma/client'

// Old database (ProductOS-pitch)
const OLD_DATABASE_URL = process.env.OLD_DATABASE_URL || 
  'postgresql://neondb_owner:npg_XXX@ep-bitter-sky-ai2w3x4k-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'

// New database (ProductOS-website) - set this before running
const NEW_DATABASE_URL = process.env.NEW_DATABASE_URL

async function migrate() {
  if (!NEW_DATABASE_URL) {
    console.error('❌ NEW_DATABASE_URL is not set')
    console.log('Set it to the new ProductOS-website connection string')
    process.exit(1)
  }

  console.log('🚀 Starting migration from ProductOS-pitch to ProductOS-website...\n')

  // Connect to old database
  const oldDb = new PrismaClient({
    datasources: { db: { url: OLD_DATABASE_URL } }
  })

  // Connect to new database  
  const newDb = new PrismaClient({
    datasources: { db: { url: NEW_DATABASE_URL } }
  })

  try {
    // Test connections
    await oldDb.$connect()
    console.log('✅ Connected to old database (ProductOS-pitch)')
    
    await newDb.$connect()
    console.log('✅ Connected to new database (ProductOS-website)\n')

    // Migrate AllowedViewers
    console.log('📋 Migrating AllowedViewers...')
    const allowedViewers = await oldDb.allowedViewer.findMany()
    console.log(`   Found ${allowedViewers.length} records`)
    
    for (const viewer of allowedViewers) {
      await newDb.allowedViewer.upsert({
        where: { email: viewer.email },
        update: viewer,
        create: viewer,
      })
    }
    console.log('   ✅ Done\n')

    // Migrate PitchDeckViewers
    console.log('📋 Migrating PitchDeckViewers...')
    const pitchViewers = await oldDb.pitchDeckViewer.findMany()
    console.log(`   Found ${pitchViewers.length} records`)
    
    for (const viewer of pitchViewers) {
      await newDb.pitchDeckViewer.upsert({
        where: { email: viewer.email },
        update: viewer,
        create: viewer,
      })
    }
    console.log('   ✅ Done\n')

    // Migrate PitchDeckSessions
    console.log('📋 Migrating PitchDeckSessions...')
    const sessions = await oldDb.pitchDeckSession.findMany()
    console.log(`   Found ${sessions.length} records`)
    
    for (const session of sessions) {
      try {
        await newDb.pitchDeckSession.upsert({
          where: { id: session.id },
          update: session,
          create: session,
        })
      } catch (e) {
        console.log(`   ⚠️ Skipped session ${session.id} (viewer may not exist)`)
      }
    }
    console.log('   ✅ Done\n')

    // Migrate PitchDeckSlideViews
    console.log('📋 Migrating PitchDeckSlideViews...')
    const slideViews = await oldDb.pitchDeckSlideView.findMany()
    console.log(`   Found ${slideViews.length} records`)
    
    for (const view of slideViews) {
      try {
        await newDb.pitchDeckSlideView.upsert({
          where: { id: view.id },
          update: view,
          create: view,
        })
      } catch (e) {
        // Session may not exist
      }
    }
    console.log('   ✅ Done\n')

    // Migrate OTPCodes (skip old ones)
    console.log('📋 Migrating recent OTPCodes...')
    const otps = await oldDb.oTPCode.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24h only
      }
    })
    console.log(`   Found ${otps.length} recent records`)
    
    for (const otp of otps) {
      await newDb.oTPCode.create({ data: otp })
    }
    console.log('   ✅ Done\n')

    // Migrate PitchDeckAccessTokens
    console.log('📋 Migrating PitchDeckAccessTokens...')
    const tokens = await oldDb.pitchDeckAccessToken.findMany()
    console.log(`   Found ${tokens.length} records`)
    
    for (const token of tokens) {
      await newDb.pitchDeckAccessToken.upsert({
        where: { token: token.token },
        update: token,
        create: token,
      })
    }
    console.log('   ✅ Done\n')

    console.log('🎉 Migration complete!')
    console.log('\nNext steps:')
    console.log('1. Update DATABASE_URL in Vercel env vars')
    console.log('2. Redeploy the website')
    console.log('3. Test pitch deck and early access flows')
    console.log('4. Delete ProductOS-pitch from Neon console')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await oldDb.$disconnect()
    await newDb.$disconnect()
  }
}

migrate()
