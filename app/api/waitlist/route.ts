import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { formRatelimit, getIp } from '../../../lib/ratelimit'

export async function POST(req: Request) {
  try {
    // Rate limiting (3 req par 10 min)
    const ip = getIp(req)
    const { success } = await formRatelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Réessayez dans 10 minutes.' },
        { status: 429 }
      )
    }

    const { email, plan } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }
    if (!plan || !['pro', 'business'].includes(plan)) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
    }

    await prisma.waitlist.create({
      data: { email: email.toLowerCase().trim(), plan },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}