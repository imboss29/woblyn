import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

export const maxDuration = 60

export async function GET(
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

    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang') || 'fr'

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const printUrl = `${baseUrl}/projects/${params.id}/print?lang=${lang}&clean=1`

    // Transmettre les cookies de session
    const cookieHeader = req.headers.get('cookie') || ''

    const apiKey = process.env.PDFSHIFT_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Configuration PDF manquante' }, { status: 500 })
    }

    const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('api:' + apiKey).toString('base64'),
      },
      body: JSON.stringify({
        source: printUrl,
        format: 'A4',
        margin: '0',
        delay: 3000,
        use_print: false,
        wait_for: 'networkidle',
        cookies: cookieHeader ? cookieHeader.split(';').map(c => {
          const [name, ...rest] = c.trim().split('=')
          return {
            name,
            value: rest.join('='),
            domain: new URL(baseUrl).hostname,
          }
        }) : [],
      }),
    })

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text()
      console.error('PDFShift error:', errorText)
      return NextResponse.json({ error: 'Erreur de génération PDF' }, { status: 500 })
    }

    const pdfBuffer = await pdfResponse.arrayBuffer()

    const filename = `${project.name.replace(/[^a-z0-9]/gi, '_')}_${lang.toUpperCase()}.pdf`

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error: any) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: error.message || 'Erreur de génération PDF' }, { status: 500 })
  }
}