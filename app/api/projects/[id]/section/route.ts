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
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { sectionKey, content } = await req.json()

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

    const currentContent = (project.content as Record<string, string>) || {}
    currentContent[sectionKey] = content

    await prisma.project.update({
      where: { id: params.id },
      data: { content: currentContent },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update section error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}