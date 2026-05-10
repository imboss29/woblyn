'use client'

import { useState } from 'react'
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
  visionY5: '', risks: '', exitStrategy: '',
}

export default function NewProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const totalSteps = 10

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
          {step === 10 && <Step10 form={form} />}

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

    <div style={{ marginBottom: '24px', padding: '20px', background: '#f4f1ea', border: '1px solid #d4cfc0' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, marginBottom: '12px', fontFamily: '"IBM Plex Mono", monospace', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#a85b32' }}>
        ✦ Langue du business plan
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button type="button" onClick={() => update('language', 'fr')} style={{
          padding: '14px', border: `2px solid ${form.language === 'fr' ? '#0d1b2a' : '#d4cfc0'}`,
          background: form.language === 'fr' ? '#0d1b2a' : 'white',
          color: form.language === 'fr' ? 'white' : '#0d1b2a',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          🇫🇷 Français
        </button>
        <button type="button" onClick={() => update('language', 'en')} style={{
          padding: '14px', border: `2px solid ${form.language === 'en' ? '#0d1b2a' : '#d4cfc0'}`,
          background: form.language === 'en' ? '#0d1b2a' : 'white',
          color: form.language === 'en' ? 'white' : '#0d1b2a',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          🇬🇧 English
        </button>
      </div>
      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '10px', lineHeight: 1.5 }}>
        Vous pouvez répondre aux questions dans la langue de votre choix. L'IA générera le business plan dans la langue sélectionnée ici.
      </div>
    </div>

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

function Step10({ form }: { form: FormData }) {
  const items = [
    ['Langue', form.language === 'en' ? '🇬🇧 English' : '🇫🇷 Français'],
    ['Projet', form.projectName],
    ['Activité', form.activity?.substring(0, 60) + (form.activity?.length > 60 ? '...' : '')],
    ['Secteur', form.sector],
    ['Statut juridique', form.legalStatus],
    ['Zone', form.geographicZone],
    ['Modèle de revenus', form.revenueModel],
    ['Prix moyen', form.averagePrice + '€'],
    ['Coût variable', form.variableCost + '€'],
    ['Volume M12', form.monthlyVolume + '/mois'],
    ['Investissement', form.initialInvestment + '€'],
    ['Charges fixes', form.monthlyCharges + '€/mois'],
    ['Lancement', form.launchDate],
    ['CA Année 3', form.revenueY3 + '€'],
    ['Fondateurs', form.foundersCount],
  ]
  return (
    <>
      <Header cat="10 — Récapitulatif" title="Tout est bon ?" />
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