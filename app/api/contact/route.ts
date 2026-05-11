import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }
    if (message.length < 10) {
      return NextResponse.json({ error: 'Message trop court (10 caractères minimum)' }, { status: 400 })
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message trop long (5000 caractères maximum)' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}