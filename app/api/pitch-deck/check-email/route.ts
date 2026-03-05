import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    if (allowedViewer) {
      return NextResponse.json({
        allowed: true,
        name: allowedViewer.name,
        company: allowedViewer.company,
      })
    }

    return NextResponse.json({
      allowed: false,
      message: 'This pitch deck is invite-only. Contact founders@productos.dev for access.',
    })
  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    )
  }
}
