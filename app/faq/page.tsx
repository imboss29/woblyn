'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    category: 'Général',
    items: [
      {
        q: "Qu'est-ce que Woblyn ?",
        a: "Woblyn est un générateur de business plan propulsé par l'intelligence artificielle. En répondant à un questionnaire de quelques minutes, vous obtenez un business plan professionnel complet (10 sections, projections financières, tableaux) prêt à présenter à votre banque, vos investisseurs ou un incubateur."
      },
      {
        q: "À qui s'adresse Woblyn ?",
        a: "Woblyn s'adresse aux entrepreneurs, porteurs de projet, créateurs d'entreprise, freelances en reconversion, étudiants en école de commerce, ou toute personne ayant besoin d'un business plan professionnel sans avoir le temps ou l'expertise pour le rédiger de A à Z."
      },
      {
        q: "Combien de temps faut-il pour créer un business plan ?",
        a: "Le questionnaire prend environ 5 à 10 minutes à remplir. La génération par l'IA dure ensuite 2 à 3 minutes. Au total, vous avez votre première version en moins de 15 minutes."
      },
      {
        q: "Le business plan est-il vraiment exploitable ?",
        a: "Oui. Notre IA utilise une méthodologie éprouvée (analyse TAM/SAM/SOM, projections financières détaillées, plan de trésorerie) et produit des documents au niveau de cabinets de conseil. Vous pouvez ensuite l'ajuster dans notre éditeur pour le personnaliser."
      },
    ]
  },
  {
    category: 'Tarifs & Paiement',
    items: [
      {
        q: "Combien coûte un business plan ?",
        a: "Le plan Starter à 97€ inclut un business plan complet (10 sections, projections financières, design professionnel, export PDF). C'est un paiement unique, sans abonnement."
      },
      {
        q: "Que comprend le plan gratuit ?",
        a: "Le plan gratuit vous permet de remplir le questionnaire et de voir un aperçu (3 premières sections) de votre business plan. Pour débloquer le document complet et le télécharger, vous devez passer au plan Starter."
      },
      {
        q: "Puis-je obtenir un remboursement ?",
        a: "Conformément à la législation française, le service étant un contenu numérique généré immédiatement après paiement, le droit de rétractation ne s'applique pas (Article L221-28 du Code de la consommation). Cependant, en cas de problème technique, contactez-nous : nous étudions chaque cas."
      },
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Carte bancaire (Visa, Mastercard, American Express) via Stripe, notre prestataire de paiement sécurisé. Aucune donnée bancaire n'est stockée sur nos serveurs."
      },
    ]
  },
  {
    category: 'Utilisation',
    items: [
      {
        q: "Puis-je modifier mon business plan après génération ?",
        a: "Oui, l'éditeur intégré vous permet de modifier librement chaque section. Vous pouvez aussi utiliser l'IA pour régénérer, raccourcir, enrichir, formaliser ou simplifier n'importe quelle partie en un clic."
      },
      {
        q: "Puis-je personnaliser le design du document ?",
        a: "Absolument. Vous avez accès à 4 templates (Éditorial, Corporate, Tech, Premium) et pouvez modifier les couleurs, les polices, la taille du texte, ajouter votre logo. Le rendu PDF s'adapte automatiquement à vos choix."
      },
      {
        q: "Le business plan est-il disponible en anglais ?",
        a: "Vous pouvez choisir la langue de génération (français ou anglais) au début du questionnaire. Pour obtenir les deux versions, une option de traduction sera bientôt disponible (39€)."
      },
      {
        q: "Puis-je télécharger mon business plan plusieurs fois ?",
        a: "Oui, votre business plan reste accessible dans votre dashboard et vous pouvez le télécharger autant de fois que nécessaire."
      },
    ]
  },
  {
    category: 'Sécurité & Confidentialité',
    items: [
      {
        q: "Mes données sont-elles confidentielles ?",
        a: "Oui. Nous ne partageons jamais vos données avec des tiers. Vos business plans sont privés et accessibles uniquement par vous. Consultez notre politique de confidentialité pour plus de détails."
      },
      {
        q: "Mes données servent-elles à entraîner l'IA ?",
        a: "Non. Nous utilisons l'API Claude d'Anthropic qui, par défaut, n'utilise pas les données envoyées pour entraîner ses modèles."
      },
      {
        q: "Puis-je supprimer mon compte ?",
        a: "Oui. Vous pouvez supprimer votre compte à tout moment depuis votre dashboard. Toutes vos données seront définitivement effacées dans un délai de 30 jours."
      },
    ]
  },
  {
    category: 'Support',
    items: [
      {
        q: "Comment vous contacter ?",
        a: "Vous pouvez nous contacter via notre formulaire de contact ou directement par email à contact@woblyn.com. Notre équipe vous répond sous 24-48h ouvrées."
      },
      {
        q: "Je rencontre un problème technique, que faire ?",
        a: "Essayez d'abord de vider le cache de votre navigateur et de rafraîchir la page. Si le problème persiste, contactez-nous en détaillant le problème et en joignant si possible une capture d'écran."
      },
    ]
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '8px 60px', fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px', letterSpacing: '1px',
        display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase',
      }}>
        <span>FAQ</span>
        <span>Woblyn</span>
      </div>

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

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '60px 40px 100px' }}>
        
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px',
          letterSpacing: '4px', color: '#a85b32', textTransform: 'uppercase',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '40px', height: '2px', background: '#a85b32' }} />
          Questions fréquentes
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display", serif', fontSize: '56px', fontWeight: 900,
          letterSpacing: '-2px', lineHeight: 1, color: 'var(--ink)', marginBottom: '24px',
        }}>
          Tout ce que vous voulez <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#a85b32' }}>savoir</em>.
        </h1>

        <p style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '60px', fontWeight: 300 }}>
          Vous ne trouvez pas votre réponse ? <a href="/contact" style={{ color: '#a85b32', textDecoration: 'underline' }}>Contactez-nous</a>.
        </p>

        {FAQ_ITEMS.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '48px' }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #d4cfc0',
            }}>
              {section.category}
            </div>

            {section.items.map((item, iIdx) => {
              const key = `${sIdx}-${iIdx}`
              const isOpen = openItems.has(key)
              return (
                <div key={key} style={{ background: 'white', border: '1px solid #d4cfc0', marginBottom: '8px' }}>
                  <button
                    onClick={() => toggleItem(key)}
                    style={{
                      width: '100%', padding: '20px 24px', textAlign: 'left',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      gap: '20px', fontFamily: 'inherit',
                    }}
                  >
                    <span style={{
                      fontSize: '15px', fontWeight: 600, color: 'var(--ink)',
                      fontFamily: '"Playfair Display", serif',
                    }}>
                      {item.q}
                    </span>
                    <span style={{
                      fontSize: '20px', color: '#a85b32', fontWeight: 300,
                      transition: 'transform 0.2s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px 24px', fontSize: '14px',
                      lineHeight: 1.7, color: '#374151',
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        <div style={{ marginTop: '60px', padding: '40px', background: '#0d1b2a', color: 'white', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
            letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            ✦ Toujours bloqué ?
          </div>
          <h2 style={{
            fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900,
            letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1,
          }}>
            Notre équipe est là pour vous
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Une question spécifique ? Un problème technique ? Contactez-nous, nous répondons sous 24-48h ouvrées.
          </p>
          <a href="/contact" style={{
            display: 'inline-block', background: '#a85b32', color: 'white',
            padding: '16px 32px', fontSize: '13px', fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace',
          }}>
            Nous contacter →
          </a>
        </div>

      </div>
    </div>
  )
}