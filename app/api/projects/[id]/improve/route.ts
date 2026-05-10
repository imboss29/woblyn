import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import { generateSection } from '../../../../../lib/anthropic'
import { SectionKey, SECTION_LABELS_FR, SECTION_LABELS_EN } from '../../../../../lib/prompts'

export const maxDuration = 60

const actionsFR = {
  shorten: 'Raccourcis ce texte de 30% tout en gardant les informations essentielles. Reste concis et percutant.',
  expand: 'Enrichis ce texte avec plus de détails, d\'exemples et de profondeur. Garde le même ton professionnel.',
  formalize: 'Reformule ce texte dans un ton plus formel et institutionnel, adapté à une présentation à des banques ou des investisseurs sérieux.',
  simplify: 'Simplifie ce texte pour le rendre plus accessible et facile à lire, tout en gardant son professionnalisme.',
}

const actionsEN = {
  shorten: 'Shorten this text by 30% while keeping essential information. Stay concise and punchy.',
  expand: 'Enrich this text with more details, examples and depth. Keep the same professional tone.',
  formalize: 'Rewrite this text in a more formal and institutional tone, suitable for serious presentations to banks or investors.',
  simplify: 'Simplify this text to make it more accessible and easier to read, while maintaining professionalism.',
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { sectionKey, action } = await req.json() as { sectionKey: SectionKey, action: keyof typeof actionsFR }

    const project = await prisma.project.findUnique({ where: { id: params.id } })
    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    if (!project.isPaid) return NextResponse.json({ error: 'Paiement requis' }, { status: 402 })

    const currentContent = (project.content as Record<string, string>) || {}
    const currentText = currentContent[sectionKey]
    if (!currentText) return NextResponse.json({ error: 'Section vide' }, { status: 400 })

    const lang = ((project.language as 'fr' | 'en') || 'fr')
    const actions = lang === 'en' ? actionsEN : actionsFR
    const sectionLabel = lang === 'en' ? SECTION_LABELS_EN[sectionKey] : SECTION_LABELS_FR[sectionKey]

    const prompt = lang === 'en' ? `You are a senior business plan consultant. Here is a section ("${sectionLabel}") of a business plan:

${currentText}

REQUESTED ACTION: ${actions[action]}

Return ONLY the modified text in English, preserving the markdown formatting (headings, tables, bold, etc.). No preamble.` : `Tu es un consultant senior en business plans. Voici une section ("${sectionLabel}") d'un business plan :

${currentText}

ACTION DEMANDÉE : ${actions[action]}

Renvoie UNIQUEMENT le texte modifié en français, en conservant le formatage markdown (titres, tableaux, gras, etc.). Pas de préambule.`

    const newContent = await generateSection(prompt)
    currentContent[sectionKey] = newContent

    await prisma.project.update({
      where: { id: params.id },
      data: { content: currentContent },
    })

    return NextResponse.json({ content: newContent })
  } catch (error: any) {
    console.error('Improve error:', error)
    return NextResponse.json({ error: error.message || 'Erreur' }, { status: 500 })
  }
}