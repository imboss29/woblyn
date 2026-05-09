'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (confirmation !== 'SUPPRIMER') return
    setLoading(true)
    try {
      const res = await fetch('/api/account', { method: 'DELETE' })
      if (!res.ok) throw new Error()
      await signOut({ callbackUrl: '/' })
    } catch {
      alert('Erreur lors de la suppression. Veuillez réessayer.')
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{
        fontSize: '12px',
        color: '#b91c1c',
        background: 'transparent',
        border: 'none',
        textDecoration: 'underline',
        cursor: 'pointer',
        padding: '4px 8px',
        fontFamily: 'inherit',
      }}>
        Supprimer mon compte
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(13,27,42,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
        }}>
          <div style={{
            background: 'white',
            border: '2px solid #b91c1c',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
          }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#b91c1c',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Action irréversible
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '28px',
              fontWeight: 900,
              letterSpacing: '-1px',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              Supprimer définitivement votre compte ?
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px' }}>
              Cette action supprimera <strong>définitivement</strong> votre compte ainsi que <strong>tous vos business plans</strong>. Aucune récupération ne sera possible.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '12px' }}>
              Pour confirmer, tapez <strong>SUPPRIMER</strong> ci-dessous :
            </p>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="SUPPRIMER"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d4cfc0',
                fontSize: '14px',
                fontFamily: '"IBM Plex Mono", monospace',
                outline: 'none',
                marginBottom: '20px',
              }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => { setIsOpen(false); setConfirmation('') }} disabled={loading} style={{
                background: 'transparent',
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
                padding: '12px 20px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}>Annuler</button>
              <button
                onClick={handleDelete}
                disabled={confirmation !== 'SUPPRIMER' || loading}
                style={{
                  background: confirmation === 'SUPPRIMER' ? '#b91c1c' : '#d4cfc0',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: confirmation === 'SUPPRIMER' && !loading ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                }}>
                {loading ? 'Suppression...' : 'Supprimer définitivement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}