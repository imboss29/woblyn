import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { stripe } from '../../../lib/stripe'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { projectId } = await req.json()
    if (!projectId) {
      return NextResponse.json({ error: 'Projet manquant' }, { status: 400 })
    }

    // Vérifier que le projet existe et appartient au user
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 })
    }

    if (project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    if (project.isPaid) {
      return NextResponse.json({ error: 'Projet déjà payé' }, { status: 400 })
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_STARTER_PRICE_ID!,
          quantity: 1,
        },
      ],
      customer_email: session.user.email || undefined,
      success_url: `${baseUrl}/projects/${projectId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/projects/${projectId}`,
      metadata: {
        projectId: projectId,
        userId: session.user.id,
      },
      locale: 'fr',
    })

    // Sauvegarder l'ID de session Stripe sur le projet
    await prisma.project.update({
      where: { id: projectId },
      data: { stripeSessionId: checkoutSession.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 })
  }
}