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

    const isLocal = !process.env.VERCEL_ENV

    let browser
    if (isLocal) {
      const puppeteer = await import('puppeteer')
      browser = await puppeteer.default.launch({
        headless: true,
      })
    } else {
      const chromium = (await import('@sparticuz/chromium')).default
      const puppeteer = await import('puppeteer-core')
      browser = await puppeteer.default.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      })
    }

    const page = await browser.newPage()

    // URL de la page print (avec un cookie ou un token pour passer l'auth)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const printUrl = `${baseUrl}/projects/${params.id}/print?lang=${lang}&auto=1`

    // Transmettre les cookies de session
    const cookieHeader = req.headers.get('cookie')
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => {
        const [name, ...rest] = c.trim().split('=')
        return {
          name,
          value: rest.join('='),
          domain: new URL(baseUrl).hostname,
        }
      })
      await page.setCookie(...cookies)
    }

    await page.goto(printUrl, { waitUntil: 'networkidle0', timeout: 50000 })

    // Attendre que les fonts soient chargées
    await page.evaluateHandle('document.fonts.ready')
    
    // Attendre un peu pour les images/charts
    await new Promise(resolve => setTimeout(resolve, 2000))

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    })

    await browser.close()

    const filename = `${project.name.replace(/[^a-z0-9]/gi, '_')}_${lang.toUpperCase()}.pdf`

    return new NextResponse(pdfBuffer as any, {
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