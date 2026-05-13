'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const sessionId = searchParams.get('session_id')

  const [isPaid, setIsPaid] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Vérifie périodiquement que le projet est marqué comme payé (le webhook met quelques secondes)
    let attempts = 0
    const interval = setInterval(async () => {
      attempts++
      try {
        const res = await fetch(`/api/projects/${id}`)
        const data = await res.json()
        if (data.isPaid) {
          setIsPaid(true)
          setChecking(false)
          clearInterval(interval)
        } else if (attempts >= 10) {
          setChecking(false)
          clearInterval(interval)
        }
      } catch {}
    }, 1500)

    return () => clearInterval(interval)
  }, [id])

  return (
    <div style={{ 
      minHeight: '100vh', background: 'var(--paper)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'white', maxWidth: '560px', width: '100%',
        padding: '60px 40px', border: '2px solid var(--ink)',
        textAlign: 'center',
      }}>
        {checking ? (
          <>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✦ Confirmation en cours
            </div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1,
            }}>
              Validation de votre paiement...
            </h1>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
              Quelques secondes le temps que nous confirmions votre paiement avec Stripe.
            </p>
          </>
        ) : isPaid ? (
          <>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✓ Paiement confirmé
            </div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '48px', fontWeight: 900,
              letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1,
            }}>
              Bienvenue dans <em style={{ fontStyle: 'italic', color: '#a85b32' }}>Woblyn</em>.
            </h1>
            <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
              Votre business plan est maintenant débloqué. Vous pouvez le télécharger, le modifier librement et l'envoyer à vos banquiers ou investisseurs.
            </p>
            <a href={`/projects/${id}`} style={{
              display: 'inline-block', background: '#0d1b2a', color: 'white',
              padding: '18px 32px', fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace',
              marginRight: '12px',
            }}>
              Voir mon business plan →
            </a>
            <a href={`/projects/${id}/export`} style={{
              display: 'inline-block', background: 'transparent', color: 'var(--ink)',
              padding: '18px 32px', fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace',
              border: '1px solid var(--ink)',
            }}>
              Télécharger PDF
            </a>
          </>
        ) : (
          <>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#dc2626', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ⚠ Confirmation en attente
            </div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1,
            }}>
              Confirmation lente
            </h1>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, marginBottom: '24px' }}>
              Votre paiement semble avoir réussi mais la confirmation prend plus de temps que prévu. 
              Rechargez la page ou contactez-nous si le problème persiste.
            </p>
            <a href={`/projects/${id}`} style={{
              display: 'inline-block', background: '#0d1b2a', color: 'white',
              padding: '14px 24px', fontSize: '12px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace',
            }}>
              Voir mon projet
            </a>
          </>
        )}
      </div>
    </div>
  )
}