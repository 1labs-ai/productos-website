import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.PITCH_DECK_ADMIN_PASSWORD || 'ProductOS2026!'

// Helper to check admin auth
async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  // Check header
  const authHeader = request.headers.get('x-admin-password')
  if (authHeader === ADMIN_PASSWORD) return true
  
  // Check cookie
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get('pitch_admin_auth')?.value
  if (adminCookie === 'authenticated') return true
  
  return false
}

// GET - List all allowed viewers
export async function GET(request: NextRequest) {
  try {
    if (!(await isAdminAuthenticated(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const allowedViewers = await prisma.allowedViewer.findMany({
      orderBy: { addedAt: 'desc' },
      include: {
        viewer: {
          include: {
            sessions: {
              orderBy: { startedAt: 'desc' },
              take: 5,
              include: {
                slideViews: true,
              },
            },
          },
        },
      },
    })

    // Process viewer data with session info
    const viewersWithStats = allowedViewers.map(av => {
      const totalSessions = av.viewer?.sessions.length || 0
      const totalTimeMs = av.viewer?.sessions.reduce((acc, session) => {
        return acc + session.slideViews.reduce((sAcc, sv) => sAcc + sv.timeSpentMs, 0)
      }, 0) || 0
      
      return {
        id: av.id,
        email: av.email,
        name: av.name,
        company: av.company,
        addedAt: av.addedAt,
        hasViewed: av.hasViewed,
        viewedAt: av.viewedAt,
        totalSessions,
        totalTimeMs,
        lastSession: av.viewer?.sessions[0]?.startedAt || null,
      }
    })

    return NextResponse.json({ viewers: viewersWithStats })
  } catch (error) {
    console.error('Error fetching allowed viewers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch allowed viewers' },
      { status: 500 }
    )
  }
}

// POST - Add new allowed viewer
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminAuthenticated(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { email, name, company } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if already exists
    const existing = await prisma.allowedViewer.findUnique({
      where: { email: normalizedEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already in allowlist' },
        { status: 409 }
      )
    }

    const allowedViewer = await prisma.allowedViewer.create({
      data: {
        email: normalizedEmail,
        name: name.trim(),
        company: company?.trim() || null,
      },
    })

    return NextResponse.json({
      success: true,
      viewer: allowedViewer,
    })
  } catch (error) {
    console.error('Error adding allowed viewer:', error)
    return NextResponse.json(
      { error: 'Failed to add allowed viewer' },
      { status: 500 }
    )
  }
}
