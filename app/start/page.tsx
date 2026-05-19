'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const templates = [
  {
    id: 'creation',
    title: 'Création d\'entreprise',
    desc: 'Pour structurer votre projet, valider sa viabilité et clarifier votre stratégie avant de vous lancer.',
    icon: '◆',
  },
  {
    id: 'bank',
    title: 'Prêt bancaire',
    desc: 'Pour convaincre un banquier (BPI, banque traditionnelle, prêt d\'honneur) et obtenir un financement.',
    icon: '$',
  },
  {
    id: 'fundraise',
    title: 'Levée de fonds',
    desc: 'Pour convaincre des business angels, fonds d\'investissement ou VCs. Pitch et data room.',
    icon: '⚡',
  },
]

export default function StartPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('creation')

  const handleStart = () => {
    sessionStorage.setItem('woblyn_template', selected)
    router.push('/new')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: '40px' }}>
          <a href="/dashboard" style={{ fontSize: '12px', color: 'var(--gray)', textDecoration: 'none' }}>← Retour au dashboard</a>
        </div>

        {/* INTRO */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase', marginBottom: '16px' }}>
            Nouveau business plan
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '56px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '20px' }}>
            Avant de commencer.
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: 1.6, fontWeight: 300, maxWidth: '600px' }}>
            Quelques informations pour personnaliser votre business plan et garantir un résultat à la hauteur de vos attentes.
          </p>
        </div>

        {/* TEMPLATES */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '16px' }}>
            01 — Quel type de business plan ?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{
                  background: selected === t.id ? 'var(--ink)' : 'white',
                  color: selected === t.id ? 'white' : 'var(--ink)',
                  border: `2px solid var(--ink)`,
                  padding: '24px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{
                  fontSize: '24px',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: selected === t.id ? '#a85b32' : '#a85b32',
                }}>
                  {t.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>
                    {t.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* WHAT TO EXPECT */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '16px' }}>
            02 — Ce qui vous attend
          </div>
          <div style={{ background: 'white', border: '1px solid #d4cfc0', padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '24px' }}>
              <div>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#1d4ed8', lineHeight: 1, marginBottom: '8px' }}>
                  10
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                  Étapes de questionnaire
                </div>
              </div>
              <div>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#1d4ed8', lineHeight: 1, marginBottom: '8px' }}>
                  ~12 min
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                  Temps estimé
                </div>
              </div>
              <div>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, color: '#1d4ed8', lineHeight: 1, marginBottom: '8px' }}>
                  10+
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                  Sections générées
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '16px' }}>
            03 — Quelques conseils avant de commencer
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { num: '01', title: 'Préparez vos chiffres clés', desc: 'Investissement de départ, charges fixes, prix moyen — ayez ces données en tête pour gagner du temps.' },
              { num: '02', title: 'Connaissez vos concurrents', desc: 'Trois noms de concurrents principaux suffisent. Plus vous êtes précis, meilleur sera le résultat.' },
              { num: '03', title: 'Soyez précis dans vos réponses', desc: 'Plus les informations sont détaillées, plus votre business plan sera personnalisé et crédible.' },
              { num: '04', title: 'Vous pourrez tout modifier', desc: "L'IA génère une V1 complète en 5 minutes. Vous l'ajustez ensuite dans l'éditeur." },
            ].map((tip) => (
              <div key={tip.num} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '20px',
                padding: '20px',
                background: 'white',
                border: '1px solid #d4cfc0',
              }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>
                  {tip.num}
                </div>
                <div>
                  <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>
                    {tip.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    {tip.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--ink)', paddingTop: '24px' }}>
          <a href="/dashboard" style={{ fontSize: '13px', color: 'var(--gray)', textDecoration: 'none' }}>
            Annuler
          </a>
          <button
            onClick={handleStart}
            style={{
              background: 'var(--ink)',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Commencer le questionnaire →
          </button>
        </div>

      </div>
    </div>
  )
}