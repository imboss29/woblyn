import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

    return NextResponse.json({
      id: project.id,
      name: project.name,
      content: project.content,
      formData: project.formData,
      isPaid: project.isPaid,
      theme: project.theme,
      bgColor: project.bgColor,
      textColor: project.textColor,
      accentColor: project.accentColor,
      titleFont: project.titleFont,
      bodyFont: project.bodyFont,
      fontSize: project.fontSize,
      logoUrl: project.logoUrl,
      tagline: project.tagline,
    })
  } catch (error) {
    console.error('Get project error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}