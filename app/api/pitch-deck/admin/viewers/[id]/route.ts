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

// DELETE - Remove allowed viewer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAdminAuthenticated(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if viewer exists
    const viewer = await prisma.allowedViewer.findUnique({
      where: { id },
    })

    if (!viewer) {
      return NextResponse.json(
        { error: 'Viewer not found' },
        { status: 404 }
      )
    }

    // Delete the allowed viewer
    await prisma.allowedViewer.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Viewer removed from allowlist',
    })
  } catch (error) {
    console.error('Error deleting allowed viewer:', error)
    return NextResponse.json(
      { error: 'Failed to delete allowed viewer' },
      { status: 500 }
    )
  }
}
