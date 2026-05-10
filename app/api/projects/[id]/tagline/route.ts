import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import { generateSection } from '../../../../../lib/anthropic'
import { FormData } from '../../../../../lib/prompts'

export const maxDuration = 30

const stylesFR = {
  impact: 'percutant et direct, en 6 à 10 mots maximum, ton confiant',
  poetic: 'évocateur et inspirant, en 6 à 12 mots, un peu poétique',
  corporate: 'sobre et institutionnel, en 6 à 12 mots, ton sérieux',
}

const stylesEN = {
  impact: 'punchy and direct, 6 to 10 words maximum, confident tone',
  poetic: 'evocative and inspiring, 6 to 12 words, slightly poetic',
  corporate: 'sober and institutional, 6 to 12 words, serious tone',
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { style } = await req.json() as { style: keyof typeof stylesFR }

    const project = await prisma.project.findUnique({ where: { id: params.id } })
    if (!project) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    if (project.userId !== session.user.id) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    if (!project.isPaid) return NextResponse.json({ error: 'Paiement requis' }, { status: 402 })
    if (!project.formData) return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })

    const data = project.formData as unknown as FormData
    const lang = ((project.language as 'fr' | 'en') || 'fr')

    const prompt = lang === 'en' ? `You are a branding and copywriting expert.

Based on the following information, generate ONE single tagline for the cover of a business plan.

Project: ${data.projectName}
Activity: ${data.activity}
Sector: ${data.sector}
Problem solved: ${data.problem}
Solution: ${data.solution}
Competitive advantage: ${data.advantage}

REQUESTED STYLE: ${stylesEN[style]}

RULES:
- In English
- No quotes
- No final period
- No preamble
- Return ONLY the tagline, nothing else
- Avoid clichés ("revolutionize", "reinvent the future")

Example of good tagline: "Premium coffee, delivered every morning." or "For those who don't sell their time."

Now generate the tagline for this project:` : `Tu es un expert en branding et copywriting.

À partir des informations suivantes, génère UNE SEULE accroche pour la couverture d'un business plan.

Projet : ${data.projectName}
Activité : ${data.activity}
Secteur : ${data.sector}
Problème résolu : ${data.problem}
Solution : ${data.solution}
Avantage concurrentiel : ${data.advantage}

STYLE DEMANDÉ : ${stylesFR[style]}

RÈGLES :
- En français
- Pas de guillemets
- Pas de point final
- Pas de préambule
- Renvoie UNIQUEMENT l'accroche, rien d'autre
- Évite les clichés ("révolutionner", "réinventer le futur")

Exemple de bonne accroche : "Le café d'exception, livré chaque matin." ou "Pour ceux qui ne vendent pas leur temps."

Génère maintenant l'accroche pour ce projet :`

    const tagline = (await generateSection(prompt)).trim().replace(/^["']|["']$/g, '').replace(/\.$/, '')

    await prisma.project.update({
      where: { id: params.id },
      data: { tagline },
    })

    return NextResponse.json({ tagline })
  } catch (error: any) {
    console.error('Tagline error:', error)
    return NextResponse.json({ error: error.message || 'Erreur' }, { status: 500 })
  }
}