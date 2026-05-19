'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteProjectButton({ projectId, isPaid }: { projectId: string; isPaid: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState(false)

  if (isPaid) return null // pas de suppression possible si payé

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 4000)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${projectId}/delete`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Erreur lors de la suppression')
        setLoading(false)
        setConfirming(false)
      }
    } catch (err) {
      alert('Erreur de connexion')
      setLoading(false)
      setConfirming(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        fontSize: '11px',
        color: confirming ? 'white' : '#dc2626',
        background: confirming ? '#dc2626' : 'transparent',
        border: `1px solid ${confirming ? '#dc2626' : '#dc2626'}`,
        padding: '6px 10px',
        cursor: loading ? 'wait' : 'pointer',
        fontFamily: '"IBM Plex Mono", monospace',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontWeight: 600,
        opacity: loading ? 0.5 : 1,
      }}
      title="Supprimer ce projet"
    >
      {loading ? '...' : confirming ? '✓ Confirmer' : '🗑 Supprimer'}
    </button>
  )
}