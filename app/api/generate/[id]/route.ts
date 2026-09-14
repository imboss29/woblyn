import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import { prompts, SECTION_KEYS, FormData } from '../../../../lib/prompts'
import { generateSection } from '../../../../lib/anthropic'
import { expensiveRatelimit, getIp, checkRateLimit } from '../../../../lib/ratelimit'

export const maxDuration = 60 // limite plan Hobby

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Rate limiting (10 req/min par IP)
    const ip = getIp(req)
    const success = await checkRateLimit(expensiveRatelimit, ip)
    if (!success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessayez dans 1 minute.' },
        { status: 429 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) {
      return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
    }

    if (project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    if (!project.formData) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const formData = project.formData as unknown as FormData

       // Génère TOUTES les sections en parallèle (le plus rapide)
    const sections: Record<string, string> = {}
    const lang = ((project.language as 'fr' | 'en') || 'fr')

    const results = await Promise.all(
      SECTION_KEYS.map(async (key) => {
        const prompt = prompts[key](formData, lang)
        const text = await generateSection(prompt)
        return { key, text }
      })
    )
    for (const { key, text } of results) {
      sections[key] = text
    }

    // Sauvegarde
    await prisma.project.update({
      where: { id: params.id },
      data: {
        content: sections,
        status: 'GENERATED',
      },
    })

    return NextResponse.json({ success: true, sections })
  } catch (error: any) {
  console.error('GENERATE ERROR:', error)
  console.error('Error message:', error?.message)
  console.error('Error stack:', error?.stack)
  return NextResponse.json({ 
    error: error?.message || 'Erreur de génération',
    details: error?.stack?.substring(0, 500),
  }, { status: 500 })
}
}