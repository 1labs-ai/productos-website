import { NextRequest, NextResponse } from 'next/server'

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

    // Log the submission (you can integrate with your preferred service)
    console.log('Early Access Request:', { name, email, company, role, useCase })

    // TODO: Integrate with email service (Resend, etc.) or CRM
    // For now, we'll send a notification email

    // Send notification to founders
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
