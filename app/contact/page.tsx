'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Question générale')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')
      setStatus('success')
      setName(''); setEmail(''); setMessage(''); setSubject('Question générale')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      
      {/* TOPBAR */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '8px 60px', fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px', letterSpacing: '1px',
        display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase',
      }}>
        <span>Contact</span>
        <span>Woblyn</span>
      </div>

      {/* NAV */}
      <nav style={{
        background: 'var(--paper)', padding: '24px 60px',
        borderBottom: '2px solid var(--ink)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <a href="/" style={{ fontSize: '12px', color: 'var(--ink)', textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
          ← Retour
        </a>
        <a href="/" style={{
          fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900,
          letterSpacing: '-1px', color: 'var(--ink)', textDecoration: 'none',
        }}>
          Woblyn
        </a>
        <div style={{ width: '60px' }} />
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 40px 100px' }}>
        
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px',
          letterSpacing: '4px', color: '#a85b32', textTransform: 'uppercase',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '40px', height: '2px', background: '#a85b32' }} />
          Support · Contact
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display", serif', fontSize: '56px', fontWeight: 900,
          letterSpacing: '-2px', lineHeight: 1, color: 'var(--ink)', marginBottom: '24px',
        }}>
          Une question ?<br/>
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#a85b32' }}>Nous sommes là</em>.
        </h1>

        <p style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '40px', fontWeight: 300 }}>
          Notre équipe vous répond sous 24 à 48 heures ouvrées. Pour une réponse rapide, consultez d'abord notre <a href="/faq" style={{ color: '#a85b32', textDecoration: 'underline' }}>FAQ</a>.
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'white', border: '2px solid #a85b32', padding: '40px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✓ Message envoyé
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '16px',
            }}>
              Merci !
            </h2>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, marginBottom: '24px' }}>
              Nous avons bien reçu votre message. Notre équipe vous répondra sous 24-48h ouvrées à l'adresse email que vous avez indiquée.
            </p>
            <a href="/" style={{
              display: 'inline-block', background: '#0d1b2a', color: 'white',
              padding: '14px 24px', fontSize: '12px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace',
            }}>
              Retour à l'accueil
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: 'white', border: '1px solid #d4cfc0', padding: '40px' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--ink)' }}>
                Votre nom
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', border: '1px solid #d4cfc0',
                  fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--ink)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', border: '1px solid #d4cfc0',
                  fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--ink)' }}>
                Sujet
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', border: '1px solid #d4cfc0',
                  fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                  background: 'white',
                }}
              >
                <option>Question générale</option>
                <option>Problème technique</option>
                <option>Question de facturation</option>
                <option>Suggestion / Amélioration</option>
                <option>Demande de remboursement</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--ink)' }}>
                Votre message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez votre demande..."
                required
                rows={8}
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', border: '1px solid #d4cfc0',
                  fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', textAlign: 'right' }}>
                {message.length} / 5000 caractères
              </div>
            </div>

            {status === 'error' && (
              <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca' }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" disabled={status === 'loading'} style={{
              width: '100%', background: '#0d1b2a', color: 'white', border: 'none',
              padding: '16px', fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              fontFamily: '"IBM Plex Mono", monospace',
              opacity: status === 'loading' ? 0.7 : 1,
            }}>
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message →'}
            </button>

            <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '16px', lineHeight: 1.5, textAlign: 'center' }}>
              Vous pouvez aussi nous écrire directement à <strong>contact@woblyn.com</strong>
            </p>
          </form>
        )}

      </div>
    </div>
  )
}