import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_EtpoA556_FimDPUidgGY5ZAVCAruXchmM')

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email is in allowlist
    const allowedViewer = await prisma.allowedViewer.findUnique({
      where: { email: normalizedEmail },
    })

    if (!allowedViewer) {
      return NextResponse.json(
        { error: 'Email not in allowlist' },
        { status: 403 }
      )
    }

    // Invalidate any existing unused OTPs for this email
    await prisma.oTPCode.updateMany({
      where: {
        email: normalizedEmail,
        used: false,
      },
      data: { used: true },
    })

    // Generate new OTP
    const code = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Save OTP to database
    await prisma.oTPCode.create({
      data: {
        email: normalizedEmail,
        code,
        expiresAt,
      },
    })

    // Send OTP email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'ProductOS <contact@mail.productos.dev>',
      to: normalizedEmail,
      subject: 'Your ProductOS Pitch Deck Access Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" style="max-width: 480px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <tr>
                      <td style="padding: 40px 40px 20px;">
                        <!-- Logo -->
                        <div style="text-align: center; margin-bottom: 24px;">
                          <svg width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 32 L18 4 L32 32 Z" fill="#E5E5E5"/>
                            <path d="M18 4 L4 32 L18 32 Z" fill="#B3B3B3"/>
                            <path d="M18 4 L18 32 L32 4 Z" fill="#808080"/>
                          </svg>
                          <h1 style="margin: 12px 0 0; font-size: 24px; font-weight: 700; color: #18181b;">ProductOS</h1>
                        </div>
                        
                        <p style="margin: 0 0 8px; font-size: 16px; color: #27272a; text-align: center;">
                          Hi ${allowedViewer.name},
                        </p>
                        <p style="margin: 0 0 24px; font-size: 16px; color: #52525b; text-align: center; line-height: 1.5;">
                          Use this code to access the ProductOS pitch deck:
                        </p>
                        
                        <!-- OTP Code -->
                        <div style="background: #fafafa; border: 2px solid #e4e4e7; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                          <span style="font-family: 'Monaco', 'Consolas', monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #18181b;">
                            ${code}
                          </span>
                        </div>
                        
                        <p style="margin: 0; font-size: 14px; color: #71717a; text-align: center;">
                          This code expires in <strong>10 minutes</strong>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 40px 40px;">
                        <div style="border-top: 1px solid #e4e4e7; padding-top: 20px;">
                          <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">
                            If you didn't request this code, you can safely ignore this email.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('Error sending OTP email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // Return partial email for UI display (e.g., h***@example.com)
      maskedEmail: normalizedEmail.replace(/(.{1,2}).*@/, '$1***@'),
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
