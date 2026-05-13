'use client'

import { useState } from 'react'

export default function CheckoutButton({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Erreur lors du paiement')
        setLoading(false)
      }
    } catch (err) {
      alert('Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      style={{
        background: '#a85b32',
        color: 'white',
        padding: '16px 32px',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        textDecoration: 'none',
        display: 'inline-block',
        border: 'none',
        cursor: loading ? 'wait' : 'pointer',
        fontFamily: 'inherit',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Chargement...' : 'Débloquer pour 97€ →'}
    </button>
  )
}