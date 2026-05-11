import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    let userId: string | null = null

    // Vérification par token (pour PDFShift)
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any
        if (decoded.purpose === 'pdf_generation' && decoded.projectId === params.id) {
          userId = decoded.userId
        }
      } catch (err) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
      }
    } else {
      // Vérification par session classique
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
      userId = session.user.id
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== userId) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

    return NextResponse.json({
      id: project.id,
      name: project.name,
      content: project.content,
      contentEN: project.contentEN,
      contentFR: project.contentFR,
      hasTranslation: project.hasTranslation,
      language: project.language,
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