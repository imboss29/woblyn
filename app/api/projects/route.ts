import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

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
    const accentColor = formData?.primaryColorChoice || '#a85b32'
    const logoUrl = formData?.logoUrl || null
    const hasLogo = !!logoUrl

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        name,
        formData,
        language: language || 'fr',
        status: 'DRAFT',
        theme: visualStyle,
        accentColor,
        logoUrl,
        primaryColorChoice: accentColor,
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