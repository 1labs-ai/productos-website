import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, role, useCase } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    // Send notification email to founders
    try {
      const notificationResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'ProductOS <contact@mail.1labs.ai>',
          to: ['founders@productos.dev'],
          subject: `[Early Access] New Request from ${name}`,
          html: `
            <h2>New Early Access Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
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
      // Don't fail the request if email fails
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
