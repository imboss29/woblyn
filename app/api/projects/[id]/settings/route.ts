import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const data = await req.json()

    const project = await prisma.project.findUnique({ where: { id: params.id } })
    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

    const updateData: any = {}
    const fields = ['name', 'theme', 'bgColor', 'textColor', 'accentColor', 'titleFont', 'bodyFont', 'fontSize', 'logoUrl', 'tagline']
    fields.forEach(f => {
      if (data[f] !== undefined) updateData[f] = data[f]
    })

    await prisma.project.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Settings error:', error)
    return NextResponse.json({ error: error.message || 'Erreur' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const project = await prisma.project.findUnique({ where: { id: params.id } })
    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

    await prisma.project.delete({ where: { id: params.id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: error.message || 'Erreur' }, { status: 500 })
  }
}