import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import { prompts, FormData, SectionKey } from '../../../../../lib/prompts'
import { generateSection } from '../../../../../lib/anthropic'

export const maxDuration = 60

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { sectionKey } = await req.json() as { sectionKey: SectionKey }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    if (!project.isPaid) return NextResponse.json({ error: 'Paiement requis' }, { status: 402 })
    if (!project.formData) return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })

    const formData = project.formData as unknown as FormData
    const lang = ((project.language as 'fr' | 'en') || 'fr')
    const prompt = prompts[sectionKey](formData, lang)
    const newContent = await generateSection(prompt)

    const currentContent = (project.content as Record<string, string>) || {}
    currentContent[sectionKey] = newContent

    await prisma.project.update({
      where: { id: params.id },
      data: { content: currentContent },
    })

    return NextResponse.json({ content: newContent })
  } catch (error: any) {
    console.error('Regenerate error:', error)
    return NextResponse.json({ error: error.message || 'Erreur de régénération' }, { status: 500 })
  }
}