import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, linkedin, company, role, useCase } = body

    if (!name || !email || !linkedin) {
      return NextResponse.json(
        { error: 'Name, email, and LinkedIn profile are required' },
        { status: 400 }
      )
    }

    // Get metadata
    const userAgent = request.headers.get('user-agent') || undefined
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || undefined

    // Check if email already exists
    const existing = await prisma.earlyAccessRequest.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existing) {
      return NextResponse.json(
        { success: true, message: 'Already on the waitlist' },
        { status: 200 }
      )
    }

    // Create new request
    await prisma.earlyAccessRequest.create({
      data: {
        name,
        email: email.toLowerCase(),
        company: company || null,
        role: role || null,
        useCase: useCase || null,
        userAgent,
        ipAddress,
      }
    })

    // Send confirmation email to applicant (from Heemang)
    try {
      const firstName = name.split(' ')[0]
      const confirmationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Heemang from ProductOS <heemang@mail.productos.build>',
          to: [email],
          reply_to: 'heemang@productos.dev',
          subject: `Your ProductOS Application is In Review`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6;">Hey ${firstName},</p>
              
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Thanks for applying to ProductOS! I just received your application and wanted to personally let you know it's now in review.
              </p>
              
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                We're being selective with our beta — we want to work closely with folks who are actively building products. I'll review your application myself and get back to you within the next few days.
              </p>
              
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                In the meantime, if you have any questions, just reply to this email. I read every response.
              </p>
              
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 32px;">
                Talk soon,<br/>
                <strong>Heemang Parmar</strong><br/>
                <span style="color: #666;">Founder, ProductOS</span>
              </p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
              
              <p style="font-size: 13px; color: #999;">
                Follow our journey: <a href="https://twitter.com/productos_dev" style="color: #666;">@productos_dev</a> · <a href="https://productos.dev" style="color: #666;">productos.dev</a>
              </p>
            </div>
          `,
        }),
      })

      if (!confirmationResponse.ok) {
        console.error('Failed to send confirmation email to applicant')
      }
    } catch (emailError) {
      console.error('Confirmation email error:', emailError)
    }

    // Send notification email to Heemang
    try {
      const notificationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'ProductOS <contact@mail.1labs.ai>',
          to: ['heemang@productos.dev'],
          subject: `[Early Access] New Request from ${name}`,
          html: `
            <h2>New Early Access Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Role:</strong> ${role || 'Not provided'}</p>
            <p><strong>Use Case:</strong></p>
            <p>${useCase || 'Not provided'}</p>
          `,
        }),
      })

      if (!notificationResponse.ok) {
        console.error('Failed to send notification email')
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError)
    }

    // Send data to n8n webhook
    try {
      await fetch('https://n8n.virusha.tech/webhook/e8cb6953-4299-4d9d-90d3-322394736b08', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          linkedin,
          company: company || null,
          role: role || null,
          useCase: useCase || null,
          source: 'productos.dev/early-access',
          submittedAt: new Date().toISOString(),
        }),
      })
    } catch (webhookError) {
      console.error('n8n webhook error:', webhookError)
      // Don't fail the request if webhook fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Early access submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    )
  }
}

// GET endpoint to list requests (for admin)
export async function GET(request: NextRequest) {
  try {
    // Simple auth check using admin password
    const authHeader = request.headers.get('authorization')
    const expectedPassword = process.env.PITCH_DECK_ADMIN_PASSWORD?.replace(/\\n/g, '')
    
    if (!authHeader || authHeader !== `Bearer ${expectedPassword}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const requests = await prisma.earlyAccessRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const total = await prisma.earlyAccessRequest.count()
    const pending = await prisma.earlyAccessRequest.count({ where: { status: 'pending' } })

    return NextResponse.json({
      requests,
      stats: { total, pending }
    })
  } catch (error) {
    console.error('Error fetching early access requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}
