'use client'

import { useState } from 'react'

export default function WaitlistModal() {
  const [open, setOpen] = useState(false)
  const [plan, setPlan] = useState<'pro' | 'business'>('pro')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Fonction globale pour ouvrir le modal depuis n'importe où
  if (typeof window !== 'undefined') {
    (window as any).openWaitlistModal = (selectedPlan: 'pro' | 'business') => {
      setPlan(selectedPlan)
      setEmail('')
      setStatus('idle')
      setErrorMsg('')
      setOpen(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,27,42,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '20px',
    }} onClick={() => setOpen(false)}>
      <div style={{
        background: 'white', maxWidth: '440px', width: '100%',
        padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative',
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'transparent', border: 'none', fontSize: '20px',
          cursor: 'pointer', color: '#6b7280',
        }}>✕</button>

        {status === 'success' ? (
          <>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✓ Inscription confirmée
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '12px', lineHeight: 1.1,
            }}>
              Merci !
            </h2>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, marginBottom: '24px' }}>
              Nous vous recontacterons dès que le plan <strong>{plan === 'pro' ? 'Pro' : 'Business'}</strong> sera disponible. En attendant, profitez du plan Starter dès maintenant.
            </p>
            <button onClick={() => setOpen(false)} style={{
              width: '100%', background: '#0d1b2a', color: 'white', border: 'none',
              padding: '14px', fontSize: '12px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: '"IBM Plex Mono", monospace',
            }}>
              Fermer
            </button>
          </>
        ) : (
          <>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✦ Liste d'attente · {plan === 'pro' ? 'Pro' : 'Business'}
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '12px', lineHeight: 1.1,
            }}>
              Soyez parmi les <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#a85b32' }}>premiers</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, marginBottom: '20px' }}>
              Le plan {plan === 'pro' ? 'Pro' : 'Business'} arrive bientôt. Laissez-nous votre email pour être prévenu en priorité et bénéficier d'un tarif préférentiel au lancement.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', border: '1px solid #d4cfc0',
                  fontSize: '14px', outline: 'none', marginBottom: '12px',
                  fontFamily: 'inherit',
                }}
              />

              {status === 'error' && (
                <div style={{ color: '#dc2626', fontSize: '12px', marginBottom: '12px' }}>
                  {errorMsg}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} style={{
                width: '100%', background: '#a85b32', color: 'white', border: 'none',
                padding: '14px', fontSize: '12px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                fontFamily: '"IBM Plex Mono", monospace',
                opacity: status === 'loading' ? 0.7 : 1,
              }}>
                {status === 'loading' ? 'Envoi...' : 'Rejoindre la liste →'}
              </button>
            </form>

            <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '14px', lineHeight: 1.5 }}>
              Pas de spam. Vous recevrez uniquement un email lors du lancement.
            </p>
          </>
        )}
      </div>
    </div>
  )
}