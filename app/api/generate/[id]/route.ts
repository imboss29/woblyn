import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import { prompts, SECTION_KEYS, FormData } from '../../../../lib/prompts'
import { generateSection } from '../../../../lib/anthropic'
import { expensiveRatelimit, getIp } from '../../../../lib/ratelimit'

export const maxDuration = 300 // 5 minutes max

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Rate limiting (10 req/min par IP)
    const ip = getIp(req)
    const { success } = await expensiveRatelimit.limit(ip)
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

    // Génère les sections une par une (évite le rate limit)
const sections: Record<string, string> = {}

for (const key of SECTION_KEYS) {
  const lang = ((project.language as 'fr' | 'en') || 'fr')
  const prompt = prompts[key](formData, lang)
  const text = await generateSection(prompt)
  sections[key] = text
  // Petit délai entre chaque appel pour rester safe
  await new Promise(resolve => setTimeout(resolve, 500))
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