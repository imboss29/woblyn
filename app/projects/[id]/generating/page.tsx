'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

const SECTIONS = [
  'Executive Summary',
  'Présentation du projet',
  'Analyse du marché',
  'Proposition de valeur',
  'Stratégie commerciale',
  'Plan opérationnel',
  'Projections financières',
  'Plan de financement',
  'Analyse des risques',
  'Conclusion & Roadmap',
]

export default function GeneratingPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    let interval: NodeJS.Timeout

    const generate = async () => {
      // Animation de progression
      interval = setInterval(() => {
        if (mounted) {
          setCurrentStep((prev) => (prev < SECTIONS.length - 1 ? prev + 1 : prev))
        }
      }, 3500)

      try {
        const res = await fetch(`/api/generate/${id}`, { method: 'POST' })
        const data = await res.json()
        
        if (!res.ok) throw new Error(data.error || 'Erreur de génération')
        
        clearInterval(interval)
        if (mounted) {
          setCurrentStep(SECTIONS.length)
          setTimeout(() => router.push(`/projects/${id}`), 1000)
        }
      } catch (err: any) {
        clearInterval(interval)
        if (mounted) setError(err.message)
      }
    }

    generate()

    return () => {
      mounted = false
      if (interval) clearInterval(interval)
    }
  }, [id, router])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        
        {error ? (
          <div style={{
            background: 'white',
            border: '2px solid #b91c1c',
            padding: '40px',
            textAlign: 'center',
          }}>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900, marginBottom: '12px', color: '#b91c1c' }}>
              Erreur de génération
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '24px' }}>{error}</p>
            <a href="/dashboard" style={{
              background: 'var(--ink)',
              color: 'white',
              padding: '12px 24px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              Retour au dashboard
            </a>
          </div>
        ) : (
          <div style={{ background: 'white', border: '2px solid var(--ink)', padding: '48px' }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#a85b32',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Génération en cours
            </div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '40px',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              marginBottom: '32px',
            }}>
              L'IA rédige votre business plan.
            </h1>

            <div style={{ marginBottom: '32px' }}>
              {SECTIONS.map((section, i) => {
                const isDone = i < currentStep
                const isCurrent = i === currentStep
                return (
                  <div key={section} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    fontSize: '14px',
                    color: isDone ? 'var(--ink)' : isCurrent ? 'var(--ink)' : '#a3a3a3',
                    fontWeight: isCurrent ? 600 : 400,
                    transition: 'color 0.3s',
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: isDone ? 'var(--ink)' : isCurrent ? 'transparent' : 'transparent',
                      border: isDone ? 'none' : `2px solid ${isCurrent ? 'var(--ink)' : '#d4cfc0'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '11px',
                      flexShrink: 0,
                      animation: isCurrent ? 'pulse 1.5s ease-in-out infinite' : 'none',
                    }}>
                      {isDone && '✓'}
                    </div>
                    {section}
                  </div>
                )
              })}
            </div>

            <div style={{
              padding: '16px',
              background: 'var(--paper)',
              fontSize: '12px',
              color: 'var(--gray)',
              fontFamily: '"IBM Plex Mono", monospace',
              letterSpacing: '0.5px',
            }}>
              Cette opération prend généralement 1 à 3 minutes. Ne fermez pas cette page.
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}