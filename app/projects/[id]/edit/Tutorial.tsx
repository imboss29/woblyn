'use client'

import { useState, useEffect } from 'react'

type Step = {
  target: string
  title: string
  text: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

const STEPS: Step[] = [
  {
    target: 'center',
    title: 'Bienvenue dans l\'éditeur',
    text: 'Découvrez en 6 étapes comment personnaliser votre business plan pour qu\'il vous ressemble.',
    position: 'center',
  },
  {
    target: '[data-tour="sidebar"]',
    title: '01 — Le sommaire',
    text: 'Naviguez entre la couverture et les 10 sections de votre business plan en cliquant ici. Chaque section est sauvegardée automatiquement.',
    position: 'right',
  },
  {
    target: '[data-tour="document"]',
    title: '02 — Le document',
    text: 'C\'est votre business plan. Cliquez sur "Éditer" en haut pour modifier le texte directement, ou laissez l\'IA travailler pour vous.',
    position: 'left',
  },
  {
    target: '[data-tour="ai-tab"]',
    title: '03 — L\'IA à votre service',
    text: 'Régénérez une section complète, raccourcissez, enrichissez, formalisez ou simplifiez le texte en un clic. L\'IA s\'adapte à vos besoins.',
    position: 'left',
  },
  {
    target: '[data-tour="style-tab"]',
    title: '04 — Personnalisation visuelle',
    text: 'Changez de template, modifiez les couleurs, polices, taille du texte, ajoutez votre logo. Votre BP devient le vôtre.',
    position: 'left',
  },
  {
    target: '[data-tour="zoom"]',
    title: '05 — Zoom',
    text: 'Ajustez le zoom pour voir une page entière ou zoomer sur les détails.',
    position: 'top',
  },
  {
    target: '[data-tour="export"]',
    title: '06 — Export PDF',
    text: 'Une fois satisfait, téléchargez votre business plan en PDF prêt à présenter à vos banquiers, investisseurs ou incubateurs.',
    position: 'right',
  },
]

export default function Tutorial({ onClose }: { onClose: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [highlight, setHighlight] = useState<DOMRect | null>(null)
  const step = STEPS[stepIndex]

  useEffect(() => {
    if (step.target === 'center') {
      setHighlight(null)
      return
    }
    const el = document.querySelector(step.target) as HTMLElement | null
    if (el) {
      const rect = el.getBoundingClientRect()
      setHighlight(rect)
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [stepIndex, step.target])

  const next = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1)
    else finish()
  }
  const prev = () => stepIndex > 0 && setStepIndex(stepIndex - 1)
  const finish = () => {
    localStorage.setItem('woblyn-tutorial-done', 'true')
    onClose()
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed', background: 'white',
    border: '2px solid #0d1b2a', padding: '24px',
    maxWidth: '360px', zIndex: 10001,
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  }

  let positioning: React.CSSProperties = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  
  if (highlight && step.position !== 'center') {
    const margin = 16
    if (step.position === 'right') {
      positioning = { top: `${highlight.top + highlight.height / 2}px`, left: `${highlight.right + margin}px`, transform: 'translateY(-50%)' }
    } else if (step.position === 'left') {
      positioning = { top: `${highlight.top + highlight.height / 2}px`, right: `${window.innerWidth - highlight.left + margin}px`, transform: 'translateY(-50%)' }
    } else if (step.position === 'top') {
      positioning = { bottom: `${window.innerHeight - highlight.top + margin}px`, left: `${highlight.left + highlight.width / 2}px`, transform: 'translateX(-50%)' }
    } else if (step.position === 'bottom') {
      positioning = { top: `${highlight.bottom + margin}px`, left: `${highlight.left + highlight.width / 2}px`, transform: 'translateX(-50%)' }
    }
  }

  return (
    <>
      {/* Overlay sombre */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(13,27,42,0.7)',
        zIndex: 10000, transition: 'all 0.3s',
      }} />

      {/* Highlight de l'élément */}
      {highlight && (
        <div style={{
          position: 'fixed',
          top: highlight.top - 6, left: highlight.left - 6,
          width: highlight.width + 12, height: highlight.height + 12,
          border: '3px solid #a85b32', borderRadius: '4px',
          boxShadow: '0 0 0 9999px rgba(13,27,42,0.7)',
          zIndex: 10000, pointerEvents: 'none',
          transition: 'all 0.3s',
        }} />
      )}

      {/* Tooltip */}
      <div style={{ ...tooltipStyle, ...positioning }}>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px', letterSpacing: '2px', color: '#a85b32',
          textTransform: 'uppercase', marginBottom: '8px',
        }}>
          {stepIndex + 1} / {STEPS.length}
        </div>
        <h3 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px',
          marginBottom: '10px', lineHeight: 1.2, color: '#0d1b2a',
        }}>
          {step.title}
        </h3>
        <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#374151', marginBottom: '20px' }}>
          {step.text}
        </p>

        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: '3px',
              background: i <= stepIndex ? '#a85b32' : '#e5e1d4',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <button onClick={finish} style={{
            background: 'transparent', border: 'none', color: '#6b7280',
            fontSize: '11px', textDecoration: 'underline', cursor: 'pointer',
            fontFamily: 'inherit', padding: '4px 0',
          }}>
            Passer
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {stepIndex > 0 && (
              <button onClick={prev} style={{
                background: 'transparent', border: '1px solid #0d1b2a', color: '#0d1b2a',
                padding: '8px 14px', fontSize: '11px', fontWeight: 600,
                letterSpacing: '1px', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                ← Précédent
              </button>
            )}
            <button onClick={next} style={{
              background: '#0d1b2a', border: 'none', color: 'white',
              padding: '8px 14px', fontSize: '11px', fontWeight: 600,
              letterSpacing: '1px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {stepIndex === STEPS.length - 1 ? 'Terminer ✓' : 'Suivant →'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}