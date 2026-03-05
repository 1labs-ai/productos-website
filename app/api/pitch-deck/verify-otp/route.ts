import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const normalizedCode = code.trim()

    // Find valid OTP
    const otpRecord = await prisma.oTPCode.findFirst({
      where: {
        email: normalizedEmail,
        code: normalizedCode,
        used: false,
        expiresAt: { gt: new Date() },
      },
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired code. Please request a new one.' },
        { status: 400 }
      )
    }

    // Mark OTP as used
    await prisma.oTPCode.update({
      where: { id: otpRecord.id },
      data: { used: true },
    })

    // Get allowed viewer details
    const allowedViewer = await prisma.allowedViewer.findUnique({
      where: { email: normalizedEmail },
    })

    if (!allowedViewer) {
      return NextResponse.json(
        { error: 'Email not in allowlist' },
        { status: 403 }
      )
    }

    // Create or update viewer record
    let viewer = await prisma.pitchDeckViewer.findUnique({
      where: { email: normalizedEmail },
    })

    if (!viewer) {
      viewer = await prisma.pitchDeckViewer.create({
        data: {
          email: normalizedEmail,
          name: allowedViewer.name,
          company: allowedViewer.company,
        },
      })
    }

    // Update allowed viewer to mark as viewed
    await prisma.allowedViewer.update({
      where: { email: normalizedEmail },
      data: {
        hasViewed: true,
        viewedAt: new Date(),
        viewerId: viewer.id,
      },
    })

    // Create a new session
    const session = await prisma.pitchDeckSession.create({
      data: {
        viewerId: viewer.id,
        userAgent: request.headers.get('user-agent') || undefined,
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0] || undefined,
      },
    })

    // Set cookies for authentication
    const cookieStore = await cookies()
    cookieStore.set('pitch_viewer_id', viewer.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    cookieStore.set('pitch_session_id', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({
      success: true,
      viewer: {
        name: viewer.name,
        email: viewer.email,
      },
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}
