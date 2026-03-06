import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// Simple admin password protection (hardcoded for debugging)
const ADMIN_PASSWORD = 'productos2026admin'

export async function GET(request: NextRequest) {
  try {
    // Check admin password from header, query, or cookie
    const authHeader = request.headers.get('x-admin-password')
    const { searchParams } = new URL(request.url)
    const queryPassword = searchParams.get('password')
    
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get('pitch_admin_auth')?.value
    
    const isAuthenticated = 
      authHeader === ADMIN_PASSWORD || 
      queryPassword === ADMIN_PASSWORD ||
      adminCookie === 'authenticated'
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // If password was correct, set the cookie for future requests
    if (queryPassword === ADMIN_PASSWORD && adminCookie !== 'authenticated') {
      cookieStore.set('pitch_admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    // Get all viewers with session counts and analytics
    const viewers = await prisma.pitchDeckViewer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        sessions: {
          orderBy: { startedAt: 'desc' },
          include: {
            slideViews: {
              orderBy: { viewedAt: 'asc' },
            },
          },
        },
      },
    })

    // Process analytics
    const analytics = viewers.map((viewer: typeof viewers[number]) => {
      const totalSessions = viewer.sessions.length
      const allSlideViews = viewer.sessions.flatMap((s: typeof viewer.sessions[number]) => s.slideViews)
      
      // Calculate time spent per slide across all sessions
      const slideAnalytics: Record<string, { views: number; totalTimeMs: number }> = {}
      allSlideViews.forEach((sv: { slideName: string; timeSpentMs: number }) => {
        if (!slideAnalytics[sv.slideName]) {
          slideAnalytics[sv.slideName] = { views: 0, totalTimeMs: 0 }
        }
        slideAnalytics[sv.slideName].views++
        slideAnalytics[sv.slideName].totalTimeMs += sv.timeSpentMs
      })

      return {
        id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        phone: viewer.phone,
        company: viewer.company,
        linkedin: viewer.linkedin,
        createdAt: viewer.createdAt,
        totalSessions,
        totalSlideViews: allSlideViews.length,
        slideAnalytics,
        lastVisit: viewer.sessions[0]?.startedAt || viewer.createdAt,
      }
    })

    // Overall stats
    const totalViewers = viewers.length
    const totalSessions = viewers.reduce((acc: number, v: typeof viewers[number]) => acc + v.sessions.length, 0)
    const totalSlideViews = viewers.reduce(
      (acc: number, v: typeof viewers[number]) => acc + v.sessions.reduce((sacc: number, s: typeof v.sessions[number]) => sacc + s.slideViews.length, 0),
      0
    )

    return NextResponse.json({
      overview: {
        totalViewers,
        totalSessions,
        totalSlideViews,
      },
      viewers: analytics,
    })
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin data' },
      { status: 500 }
    )
  }
}
