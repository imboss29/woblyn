'use client'

import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('woblyn-cookies-accepted')
    if (!accepted) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('woblyn-cookies-accepted', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      right: 24,
      maxWidth: '640px',
      margin: '0 auto',
      background: '#0d1b2a',
      color: '#f4f1ea',
      padding: '20px 24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      zIndex: 1000,
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap',
      borderTop: '3px solid #a85b32',
    }}>
      <div style={{ flex: 1, minWidth: '240px' }}>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#a85b32',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}>
          Cookies
        </div>
        <p style={{ fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
          Woblyn utilise uniquement des cookies techniques nécessaires au fonctionnement du site (session de connexion). Aucun cookie publicitaire ni tracker tiers.
          {' '}
          <a href="/confidentialite" style={{ color: '#a85b32', textDecoration: 'underline' }}>En savoir plus</a>
        </p>
      </div>
      <button onClick={accept} style={{
        background: '#a85b32',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}>
        J'ai compris
      </button>
    </div>
  )
}