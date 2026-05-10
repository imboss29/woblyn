import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

const COLOR_MAP: Record<string, string> = {
  terracotta: '#a85b32',
  navy: '#1d4ed8',
  forest: '#166534',
  gold: '#c9a558',
  burgundy: '#991b1b',
  graphite: '#374151',
  plum: '#6b21a8',
  teal: '#0f766e',
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { name, formData, language } = await req.json()

    if (!name) {
      return NextResponse.json({ error: 'Nom du projet requis' }, { status: 400 })
    }

    const visualStyle = formData?.visualStyle || 'editorial'
    const colorChoice = formData?.primaryColorChoice || 'terracotta'
    const accentColor = COLOR_MAP[colorChoice] || COLOR_MAP.terracotta
    const hasLogo = formData?.hasLogo === 'yes'

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        name,
        formData,
        language: language || 'fr',
        status: 'DRAFT',
        theme: visualStyle,
        accentColor,
        primaryColorChoice: colorChoice,
        visualStyle,
        hasLogo,
      },
    })

    return NextResponse.json({ id: project.id })
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}