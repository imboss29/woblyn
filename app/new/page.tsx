'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  // 0. Langue
  language: string
  // 1. Projet
  projectName: string
  activity: string
  sector: string
  legalStatus: string
  // 2. Proposition de valeur
  problem: string
  solution: string
  advantage: string
  timing: string
  // 3. Marché
  targetCustomers: string
  geographicZone: string
  competitors: string
  marketSize: string
  // 4. Modèle économique
  revenueModel: string
  averagePrice: string
  variableCost: string
  monthlyVolume: string
  // 5. Acquisition
  acquisitionChannels: string
  marketingBudget: string
  retentionStrategy: string
  // 6. Investissement
  initialInvestment: string
  monthlyCharges: string
  fundingSources: string
  launchDate: string
  // 7. Projections
  growthY2: string
  growthY3: string
  revenueY3: string
  // 8. Équipe
  foundersCount: string
  founderProfile: string
  hiringPlan: string
  keySkills: string
  // 9. Vision & risques
  visionY5: string
  risks: string
  exitStrategy: string
  // 10. Visuel
  primaryColorChoice: string
  visualStyle: string
  hasLogo: string
  logoUrl: string
  // 11. Précisions
  additionalDetails: string
}

const initialForm: FormData = {
  language: 'fr',
  projectName: '', activity: '', sector: '', legalStatus: '',
  problem: '', solution: '', advantage: '', timing: '',
  targetCustomers: '', geographicZone: '', competitors: '', marketSize: '',
  revenueModel: '', averagePrice: '', variableCost: '', monthlyVolume: '',
  acquisitionChannels: '', marketingBudget: '', retentionStrategy: '',
  initialInvestment: '', monthlyCharges: '', fundingSources: '', launchDate: '',
  growthY2: '', growthY3: '', revenueY3: '',
  foundersCount: '', founderProfile: '', hiringPlan: '', keySkills: '',
  visionY5: '', risks: '', exitStrategy: '', primaryColorChoice: '', visualStyle: '', hasLogo: '', logoUrl: '',
  additionalDetails: '',
}

export default function NewProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const totalSteps = 11

  const update = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const next = () => { window.scrollTo(0,0); setStep(s => Math.min(s + 1, totalSteps)) }
  const prev = () => { window.scrollTo(0,0); setStep(s => Math.max(s - 1, 1)) }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.projectName, formData: form, language: form.language }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/projects/${data.id}/generating`)
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <a href="/dashboard" style={{ fontSize: '12px', color: 'var(--gray)', textDecoration: 'none' }}>← Retour</a>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', color: 'var(--gray)' }}>
              ÉTAPE {step} / {totalSteps}
            </span>
          </div>
          <div style={{ height: '4px', background: '#d4cfc0' }}>
            <div style={{ height: '100%', background: 'var(--ink)', width: `${(step / totalSteps) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ background: 'white', border: '2px solid var(--ink)', padding: '48px' }}>
          {step === 1 && <Step1 form={form} update={update} />}
          {step === 2 && <Step2 form={form} update={update} />}
          {step === 3 && <Step3 form={form} update={update} />}
          {step === 4 && <Step4 form={form} update={update} />}
          {step === 5 && <Step5 form={form} update={update} />}
          {step === 6 && <Step6 form={form} update={update} />}
          {step === 7 && <Step7 form={form} update={update} />}
          {step === 8 && <Step8 form={form} update={update} />}
          {step === 9 && <Step9 form={form} update={update} />}
{step === 10 && <StepVisual form={form} update={update} />}
{step === 11 && <Step10 form={form} />}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #d4cfc0' }}>
            {step > 1 ? <button onClick={prev} style={btnSecondary}>← Précédent</button> : <div />}
            {step < totalSteps ? (
              <button onClick={next} style={btnPrimary}>Suivant →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={btnPrimary}>
                {loading ? 'Création...' : 'Générer mon business plan →'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── STEPS ──────────────────────────────────────
function Step1({ form, update }: any) {
  return <>
    <Header cat="01 — Le projet" title="Parlez-nous de votre projet." />


    <Field label="Nom du projet ou de l'entreprise" value={form.projectName} onChange={(v: string) => update('projectName', v)} placeholder="Ex: Bistrot Lumière" />
    <Field label="Décrivez votre activité en 1-2 phrases" value={form.activity} onChange={(v: string) => update('activity', v)} placeholder="Ex: Restaurant bistronomique avec produits locaux..." textarea />
    <Select label="Secteur d'activité" value={form.sector} onChange={(v: string) => update('sector', v)} options={[
      'Restauration','Tech / SaaS','E-commerce','Conseil & Services','Artisanat',
      'Santé & Bien-être','Mode & Beauté','Immobilier','Éducation','Industrie','Autre'
    ]} />
    <Select label="Statut juridique envisagé" value={form.legalStatus} onChange={(v: string) => update('legalStatus', v)} options={[
      'SASU','SAS','SARL','EURL','EI','Micro-entreprise','Pas encore décidé'
    ]} />
  </>
}

function Step2({ form, update }: any) {
  return <>
    <Header cat="02 — Proposition de valeur" title="Pourquoi votre projet a sa place." />
    <Field label="Quel problème résolvez-vous pour vos clients ?" value={form.problem} onChange={(v: string) => update('problem', v)} placeholder="Ex: Les restaurants traditionnels manquent de produits locaux..." textarea />
    <Field label="Quelle est votre solution ?" value={form.solution} onChange={(v: string) => update('solution', v)} placeholder="Ex: Une carte évolutive 100% basée sur les producteurs locaux..." textarea />
    <Field label="Quel est votre avantage concurrentiel ? (3 points clés)" value={form.advantage} onChange={(v: string) => update('advantage', v)} placeholder="Ex: 1. Réseau local exclusif. 2. Chef étoilé. 3. Prix accessible..." textarea />
    <Field label="Pourquoi maintenant ? (timing du marché)" value={form.timing} onChange={(v: string) => update('timing', v)} placeholder="Ex: Le marché du local explose post-covid..." textarea />
  </>
}

function Step3({ form, update }: any) {
  return <>
    <Header cat="03 — Marché & concurrence" title="Qui sont vos clients et concurrents ?" />
    <Field label="Décrivez votre clientèle cible précisément" value={form.targetCustomers} onChange={(v: string) => update('targetCustomers', v)} placeholder="Ex: Cadres 30-50 ans, urbains, sensibles aux produits locaux..." textarea />
    <Select label="Zone géographique" value={form.geographicZone} onChange={(v: string) => update('geographicZone', v)} options={[
      'Locale (ville/département)','Régionale','Nationale (France)','Européenne','Mondiale'
    ]} />
    <Field label="3 concurrents principaux et leurs forces/faiblesses" value={form.competitors} onChange={(v: string) => update('competitors', v)} placeholder="Ex: Concurrent A (fort en notoriété, faible en innovation)..." textarea />
    <Field label="Taille estimée du marché (si connue)" value={form.marketSize} onChange={(v: string) => update('marketSize', v)} placeholder="Ex: 2,4 Mrd€ en France, ou 'à estimer'" />
  </>
}

function Step4({ form, update }: any) {
  return <>
    <Header cat="04 — Modèle économique" title="Comment vous gagnez de l'argent." />
    
    <div style={{ marginBottom: '24px', padding: '16px 20px', background: '#fff7ed', border: '1px solid #fed7aa', borderLeft: '4px solid #a85b32' }}>
      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', color: '#a85b32', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
        ✦ Bon à savoir
      </div>
      <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
        Pas sûr de vos chiffres ? Pas de panique. Donnez vos <strong>meilleures estimations</strong> — l'IA s'adaptera et vous pourrez tout modifier ensuite dans l'éditeur. L'objectif est d'avoir une première base réaliste.
      </div>
    </div>
    
    <Select label="Modèle de revenus" value={form.revenueModel} onChange={(v: string) => update('revenueModel', v)} options={[
      'Vente directe (produit)','Prestation de service','Abonnement / SaaS','Commission / marketplace','Publicité','Mixte','Autre'
    ]} />
    <Field label="Prix moyen par vente / client (€)" value={form.averagePrice} onChange={(v: string) => update('averagePrice', v)} placeholder="Ex: 50" type="number" />
    <Field label="Coût variable par vente (€)" value={form.variableCost} onChange={(v: string) => update('variableCost', v)} placeholder="Ex: 18 (achats, matières, livraison...)" type="number" />
    <Field label="Volume de vente estimé en mois 12 (clients/ventes par mois)" value={form.monthlyVolume} onChange={(v: string) => update('monthlyVolume', v)} placeholder="Ex: 200" type="number" />
  </>
}

function Step5({ form, update }: any) {
  return <>
    <Header cat="05 — Acquisition clients" title="Comment vous trouvez vos clients." />
    <Field label="Canaux d'acquisition prévus" value={form.acquisitionChannels} onChange={(v: string) => update('acquisitionChannels', v)} placeholder="Ex: SEO, Instagram, partenariats, bouche-à-oreille..." textarea />
    <Field label="Budget marketing mensuel estimé (€)" value={form.marketingBudget} onChange={(v: string) => update('marketingBudget', v)} placeholder="Ex: 800" type="number" />
    <Field label="Stratégie de fidélisation" value={form.retentionStrategy} onChange={(v: string) => update('retentionStrategy', v)} placeholder="Ex: Programme fidélité, newsletter, événements..." textarea />
  </>
}

function Step6({ form, update }: any) {
  return <>
    <Header cat="06 — Investissement & charges" title="Combien il faut pour démarrer." />
    <Field label="Investissement de départ requis (€)" value={form.initialInvestment} onChange={(v: string) => update('initialInvestment', v)} placeholder="Ex: 50000" type="number" />
    <Field label="Charges fixes mensuelles estimées (€)" value={form.monthlyCharges} onChange={(v: string) => update('monthlyCharges', v)} placeholder="Ex: 5000" type="number" />
    <Field label="Sources de financement envisagées" value={form.fundingSources} onChange={(v: string) => update('fundingSources', v)} placeholder="Ex: Apport perso 15k€, prêt bancaire 30k€, BPI 5k€..." textarea />
    <Field label="Date de lancement prévue" value={form.launchDate} onChange={(v: string) => update('launchDate', v)} placeholder="Ex: Janvier 2026" />
  </>
}

function Step7({ form, update }: any) {
  return <>
    <Header cat="07 — Projections 3 ans" title="Vos objectifs de croissance." />
    <Field label="Croissance estimée année 2 (%)" value={form.growthY2} onChange={(v: string) => update('growthY2', v)} placeholder="Ex: 50" type="number" />
    <Field label="Croissance estimée année 3 (%)" value={form.growthY3} onChange={(v: string) => update('growthY3', v)} placeholder="Ex: 35" type="number" />
    <Field label="Objectif chiffre d'affaires année 3 (€)" value={form.revenueY3} onChange={(v: string) => update('revenueY3', v)} placeholder="Ex: 350000" type="number" />
  </>
}

function Step8({ form, update }: any) {
  return <>
    <Header cat="08 — L'équipe" title="Qui porte le projet ?" />
    <Select label="Nombre de fondateurs" value={form.foundersCount} onChange={(v: string) => update('foundersCount', v)} options={[
      '1 (solo)','2','3','4 ou plus'
    ]} />
    <Field label="Profil et expérience clés des fondateurs" value={form.founderProfile} onChange={(v: string) => update('founderProfile', v)} placeholder="Ex: 10 ans en marketing digital chez Total..." textarea />
    <Field label="Recrutements prévus année 1" value={form.hiringPlan} onChange={(v: string) => update('hiringPlan', v)} placeholder="Ex: 1 commercial M3, 1 dev M6..." textarea />
    <Field label="Compétences clés à recruter ou acquérir" value={form.keySkills} onChange={(v: string) => update('keySkills', v)} placeholder="Ex: Expertise SEO, gestion supply chain..." textarea />
  </>
}

function Step9({ form, update }: any) {
  return <>
    <Header cat="09 — Vision & risques" title="L'avenir et les défis." />
    <Field label="Vision à 5 ans (où voyez-vous le projet ?)" value={form.visionY5} onChange={(v: string) => update('visionY5', v)} placeholder="Ex: Leader régional avec 5 établissements..." textarea />
    <Field label="3 principaux risques identifiés" value={form.risks} onChange={(v: string) => update('risks', v)} placeholder="Ex: 1. Saturation du marché. 2. Hausse des matières premières. 3. ..." textarea />
    <Field label="Stratégie de sortie envisagée (optionnel)" value={form.exitStrategy} onChange={(v: string) => update('exitStrategy', v)} placeholder="Ex: Revente d'ici 7 ans, transmission familiale..." textarea />
  </>
}

function StepVisual({ form, update }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (file: File) => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'woblyn_logos')
      
      const res = await fetch('https://api.cloudinary.com/v1_1/dqdwsum2l/image/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.secure_url) {
        update('logoUrl', data.secure_url)
      } else {
        alert('Erreur lors de l\'upload. Réessayez ou utilisez une URL.')
      }
    } catch (err) {
      alert('Erreur de connexion. Réessayez.')
    } finally {
      setUploading(false)
    }
  }

  return <>
    <Header cat="10 — Identité visuelle" title="L'image de votre business plan." />
    
    <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '32px', lineHeight: 1.5 }}>
      Personnalisez l'apparence de votre document. Vous pourrez tout modifier ensuite dans l'éditeur.
    </p>

    {/* STYLE VISUEL avec aperçus */}
    <div style={{ marginBottom: '32px' }}>
      <label style={labelStyle}>Style visuel souhaité</label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[
          { 
            key: 'editorial', name: 'Éditorial', desc: 'Magazine financier',
            preview: { bg: '#f4f1ea', text: '#0d1b2a', accent: '#a85b32', titleFont: 'Playfair Display, serif' }
          },
          { 
            key: 'corporate', name: 'Corporate', desc: 'Banque & finance',
            preview: { bg: '#ffffff', text: '#0a1933', accent: '#1d4ed8', titleFont: 'Fraunces, serif' }
          },
          { 
            key: 'tech', name: 'Tech', desc: 'Startup minimaliste',
            preview: { bg: '#fafafa', text: '#171717', accent: '#6366f1', titleFont: 'Inter, sans-serif' }
          },
          { 
            key: 'premium', name: 'Premium', desc: 'Luxe & cabinet',
            preview: { bg: '#0d0d0d', text: '#f5f1e8', accent: '#c9a558', titleFont: 'Cormorant Garamond, serif' }
          },
        ].map(s => {
          const isActive = form.visualStyle === s.key
          return (
            <button key={s.key} type="button" onClick={() => update('visualStyle', s.key)} style={{
              border: `2px solid ${isActive ? '#0d1b2a' : '#d4cfc0'}`,
              background: 'white', cursor: 'pointer', fontFamily: 'inherit',
              padding: 0, overflow: 'hidden',
            }}>
              {/* Mini aperçu */}
              <div style={{
                background: s.preview.bg, color: s.preview.text,
                padding: '20px 16px', borderBottom: '1px solid #e5e1d4',
                minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ fontSize: '9px', letterSpacing: '2px', color: s.preview.accent, textTransform: 'uppercase', fontWeight: 600 }}>
                  Chapitre 01
                </div>
                <div style={{ fontFamily: s.preview.titleFont, fontSize: '20px', fontWeight: 700, lineHeight: 1.1 }}>
                  Executive Summary
                </div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  <div style={{ width: '60%', height: '2px', background: s.preview.accent }} />
                  <div style={{ width: '20%', height: '2px', background: s.preview.text, opacity: 0.3 }} />
                </div>
              </div>
              {/* Label */}
              <div style={{
                padding: '12px 16px',
                background: isActive ? '#0d1b2a' : 'white',
                color: isActive ? 'white' : '#0d1b2a',
                textAlign: 'left',
              }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>{s.desc}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>

    {/* COULEUR avec presets + roue + hex */}
    <div style={{ marginBottom: '32px' }}>
      <label style={labelStyle}>Couleur d'accent dominante</label>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {[
          { name: 'Terracotta', color: '#a85b32' },
          { name: 'Bleu marine', color: '#1d4ed8' },
          { name: 'Vert forêt', color: '#166534' },
          { name: 'Or', color: '#c9a558' },
          { name: 'Bordeaux', color: '#991b1b' },
          { name: 'Graphite', color: '#374151' },
          { name: 'Prune', color: '#6b21a8' },
          { name: 'Sarcelle', color: '#0f766e' },
        ].map(c => (
          <button key={c.color} type="button" 
            onClick={() => update('primaryColorChoice', c.color)} 
            title={c.name}
            style={{
              width: '100%', aspectRatio: '1', background: c.color,
              border: `3px solid ${form.primaryColorChoice === c.color ? '#0d1b2a' : 'transparent'}`,
              cursor: 'pointer', padding: 0,
            }} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '16px' }}>
        <input 
          type="color" 
          value={form.primaryColorChoice && form.primaryColorChoice.startsWith('#') ? form.primaryColorChoice : '#a85b32'} 
          onChange={(e) => update('primaryColorChoice', e.target.value)}
          style={{ width: '50px', height: '40px', border: '1px solid #d4cfc0', cursor: 'pointer', padding: 0 }}
        />
        <input 
          type="text" 
          value={form.primaryColorChoice || ''} 
          onChange={(e) => update('primaryColorChoice', e.target.value)}
          placeholder="#a85b32"
          style={{ flex: 1, padding: '10px', border: '1px solid #d4cfc0', fontSize: '13px', fontFamily: '"IBM Plex Mono", monospace', outline: 'none' }}
        />
        <div style={{ 
          width: '40px', height: '40px', 
          background: form.primaryColorChoice && form.primaryColorChoice.startsWith('#') ? form.primaryColorChoice : 'transparent',
          border: '1px solid #d4cfc0',
        }} />
      </div>
      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '8px', lineHeight: 1.5 }}>
        Choisissez parmi les 8 couleurs proposées, utilisez la roue chromatique ou entrez un code hexadécimal (ex: #ff5733).
      </div>
    </div>

    {/* LOGO upload */}
    <div style={{ marginBottom: '8px' }}>
      <label style={labelStyle}>Logo de votre entreprise (optionnel)</label>
      
      {form.logoUrl ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f4f1ea', border: '1px solid #d4cfc0', marginBottom: '12px' }}>
          <img src={form.logoUrl} alt="Logo" style={{ height: '60px', maxWidth: '120px', objectFit: 'contain' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>✓ Logo uploadé</div>
            <button type="button" onClick={() => update('logoUrl', '')} style={{
              fontSize: '11px', color: '#b91c1c', background: 'transparent', border: 'none',
              textDecoration: 'underline', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
            }}>
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <>
          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} style={{
            width: '100%', padding: '24px', border: '2px dashed #d4cfc0', background: 'white',
            cursor: uploading ? 'wait' : 'pointer', fontFamily: 'inherit', marginBottom: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          }}>
            <div style={{ fontSize: '24px' }}>📎</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>
              {uploading ? 'Upload en cours...' : 'Cliquez pour uploader un fichier'}
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>PNG, JPG, SVG · max 5 Mo</div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />

          <div style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center', margin: '8px 0' }}>— ou —</div>

          <input
            type="url"
            value={form.logoUrl || ''}
            onChange={(e) => update('logoUrl', e.target.value)}
            placeholder="Coller une URL d'image (https://...)"
            style={{ width: '100%', padding: '12px', border: '1px solid #d4cfc0', fontSize: '13px', outline: 'none', fontFamily: 'inherit' }}
          />
        </>
      )}
    </div>

    {/* PRÉCISIONS LIBRES */}
    <div style={{ marginTop: '40px', padding: '24px', background: '#fff7ed', border: '1px solid #fed7aa', borderLeft: '4px solid #a85b32' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, marginBottom: '8px', fontFamily: '"IBM Plex Mono", monospace', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#a85b32' }}>
        ✦ Précisions complémentaires (optionnel)
      </label>
      <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, marginBottom: '12px' }}>
        Vous voulez préciser un élément spécifique à votre projet ? Donner du contexte à l'IA ? C'est ici. Plus vous êtes précis, plus le business plan sera personnalisé.
      </div>
      <textarea
        value={form.additionalDetails || ''}
        onChange={(e) => update('additionalDetails', e.target.value)}
        placeholder="Ex: Nous serons 3 fondateurs avec des compétences complémentaires. Notre plus gros défi sera de trouver un local à moins de 30k€. On vise plutôt le segment haut de gamme..."
        rows={6}
        style={{ width: '100%', padding: '14px', border: '1px solid #d4cfc0', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', background: 'white' }}
      />
      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '8px', textAlign: 'right' }}>
        {(form.additionalDetails || '').length} / 2000 caractères
      </div>
    </div>
  </>
}

function Step10({ form }: { form: FormData }) {
  const styleNames: Record<string, string> = {
    editorial: 'Éditorial', corporate: 'Corporate', tech: 'Tech', premium: 'Premium',
  }
  const colorNames: Record<string, string> = {
    terracotta: 'Terracotta', navy: 'Bleu marine', forest: 'Vert forêt', gold: 'Or',
    burgundy: 'Bordeaux', graphite: 'Graphite', plum: 'Prune', teal: 'Sarcelle',
  }
  const items = [
    ['Langue', form.language === 'en' ? '🇬🇧 English' : '🇫🇷 Français'],
    ['Projet', form.projectName],
    ['Activité', form.activity?.substring(0, 60) + (form.activity?.length > 60 ? '...' : '')],
    ['Secteur', form.sector],
    ['Statut juridique', form.legalStatus],
    ['Zone', form.geographicZone],
    ['Modèle de revenus', form.revenueModel],
    ['Prix moyen', form.averagePrice + '€'],
    ['Volume M12', form.monthlyVolume + '/mois'],
    ['Investissement', form.initialInvestment + '€'],
    ['Charges fixes', form.monthlyCharges + '€/mois'],
    ['Lancement', form.launchDate],
    ['CA Année 3', form.revenueY3 + '€'],
    ['Style visuel', styleNames[form.visualStyle] || '—'],
    ['Couleur', colorNames[form.primaryColorChoice] || '—'],
    ['Logo', form.hasLogo === 'yes' ? 'Oui (à uploader)' : 'Pas encore'],
  ]
  return (
    <>
      <Header cat="11 — Récapitulatif" title="Tout est bon ?" />
      <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '24px' }}>
        Vérifiez les informations avant de lancer la génération. Vous pourrez tout modifier ensuite dans l'éditeur.
      </p>
      <div style={{ display: 'grid', gap: '8px' }}>
        {items.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--paper)', fontSize: '13px', gap: '16px' }}>
            <span style={{ color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', whiteSpace: 'nowrap' }}>{label}</span>
            <strong style={{ textAlign: 'right' }}>{value || '—'}</strong>
          </div>
        ))}
      </div>
    </>
  )
}

// ── COMPONENTS ──────────────────────────────────────
function Header({ cat, title }: { cat: string, title: string }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase', marginBottom: '12px' }}>{cat}</div>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1 }}>{title}</h1>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', textarea = false }: any) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, minHeight: '90px', resize: 'vertical', fontFamily: 'inherit' }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      )}
    </div>
  )
}

function Select({ label, value, onChange, options }: any) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={inputStyle}>
        <option value="">— Choisir —</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600,
  marginBottom: '6px', fontFamily: '"IBM Plex Mono", monospace',
  textTransform: 'uppercase', letterSpacing: '1.5px',
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px', border: '1px solid #d4cfc0',
  fontSize: '14px', fontFamily: '"IBM Plex Sans", sans-serif',
  outline: 'none', background: 'white',
}
const btnPrimary: React.CSSProperties = {
  background: 'var(--ink)', color: 'white', padding: '14px 24px',
  border: 'none', fontSize: '12px', fontWeight: 600,
  letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
}
const btnSecondary: React.CSSProperties = {
  background: 'transparent', color: 'var(--ink)', padding: '14px 24px',
  border: '1px solid var(--ink)', fontSize: '12px', fontWeight: 600,
  letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
}