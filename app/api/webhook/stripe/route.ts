import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../../lib/stripe'
import { prisma } from '../../../../lib/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret manquant' }, { status: 500 })
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
    }

    // Gérer l'événement de paiement réussi
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const projectId = session.metadata?.projectId

      if (!projectId) {
        console.error('No projectId in metadata')
        return NextResponse.json({ error: 'Project ID manquant' }, { status: 400 })
      }

      // Marquer le projet comme payé
      await prisma.project.update({
        where: { id: projectId },
        data: {
          isPaid: true,
          paidAt: new Date(),
          stripePaymentIntent: session.payment_intent as string,
        },
      })

      console.log(`✅ Payment received for project ${projectId}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}