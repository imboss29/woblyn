import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import { prompts, FormData, SECTION_KEYS } from '../../../../../lib/prompts'
import { generateSection } from '../../../../../lib/anthropic'

export const maxDuration = 300

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    if (!project.isPaid) return NextResponse.json({ error: 'Paiement requis' }, { status: 402 })
    if (!project.hasTranslation) return NextResponse.json({ error: 'Traduction non activée' }, { status: 402 })
    if (!project.formData) return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })

    const sourceLang = (project.language as 'fr' | 'en') || 'fr'
    const targetLang = sourceLang === 'fr' ? 'en' : 'fr'

    const formData = project.formData as unknown as FormData
    const translatedSections: Record<string, string> = {}

    for (const key of SECTION_KEYS) {
      const prompt = prompts[key](formData, targetLang)
      const text = await generateSection(prompt)
      translatedSections[key] = text
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const updateData: any = {}
    if (sourceLang === 'fr') {
      updateData.contentFR = project.content
      updateData.contentEN = translatedSections
    } else {
      updateData.contentEN = project.content
      updateData.contentFR = translatedSections
    }

    await prisma.project.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ success: true, sections: translatedSections })
  } catch (error: any) {
    console.error('Translate error:', error)
    return NextResponse.json({ error: error.message || 'Erreur de traduction' }, { status: 500 })
  }
}