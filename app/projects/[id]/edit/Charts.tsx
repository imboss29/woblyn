'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'

type FormData = {
  averagePrice?: string
  variableCost?: string
  monthlyVolume?: string
  monthlyCharges?: string
  marketingBudget?: string
  initialInvestment?: string
  growthY2?: string
  growthY3?: string
  fundingSources?: string
}

type Props = {
  formData: FormData
  accent: string
  text: string
}

export function RevenueChart({ formData, accent, text }: Props) {
  const price = parseFloat(formData.averagePrice || '0')
  const targetVolume = parseFloat(formData.monthlyVolume || '0')
  const growthY2 = parseFloat(formData.growthY2 || '50') / 100
  const growthY3 = parseFloat(formData.growthY3 || '35') / 100

  // Année 1 : volume passe de 30% à 100% du target progressivement
  const data: any[] = []
  for (let m = 1; m <= 12; m++) {
    const ratio = 0.3 + (0.7 * (m - 1) / 11)
    const ca = Math.round(price * targetVolume * ratio)
    data.push({ month: `M${m}`, ca, year: 'Année 1' })
  }

  // Année 2 : CA mensuel = CA M12 * (1 + growthY2) / 12
  const y1Total = data.slice(-1)[0].ca * 12 // approximation
  const y2Monthly = Math.round((y1Total * (1 + growthY2)) / 12)
  for (let m = 13; m <= 24; m++) {
    data.push({ month: `M${m}`, ca: y2Monthly, year: 'Année 2' })
  }

  // Année 3
  const y3Monthly = Math.round((y1Total * (1 + growthY2) * (1 + growthY3)) / 12)
  for (let m = 25; m <= 36; m++) {
    data.push({ month: `M${m}`, ca: y3Monthly, year: 'Année 3' })
  }

  return (
    <div style={{ marginTop: '24px', padding: '24px', background: `${text}05`, border: `1px solid ${text}15` }}>
      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: accent, marginBottom: '8px' }}>
        Graphique 01
      </div>
      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: text }}>
        Évolution du chiffre d'affaires sur 36 mois
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={`${text}15`} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: text }} stroke={`${text}40`} interval={2} />
          <YAxis tick={{ fontSize: 10, fill: text }} stroke={`${text}40`} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k€`} />
          <Tooltip
            contentStyle={{ background: 'white', border: `1px solid ${text}30`, fontSize: '12px' }}
            formatter={(v: any) => [`${Number(v).toLocaleString('fr-FR')}€`, 'CA mensuel']}
          />
          <Line type="monotone" dataKey="ca" stroke={accent} strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ChargesChart({ formData, accent, text }: Props) {
  const charges = parseFloat(formData.monthlyCharges || '0')
  const marketing = parseFloat(formData.marketingBudget || '0')
  const variable = parseFloat(formData.variableCost || '0') * parseFloat(formData.monthlyVolume || '0')

  const data = [
    { name: 'Charges fixes', value: charges },
    { name: 'Marketing', value: marketing },
    { name: 'Coûts variables', value: Math.round(variable) },
  ].filter(d => d.value > 0)

  if (data.length === 0) return null

  return (
    <div style={{ marginTop: '24px', padding: '24px', background: `${text}05`, border: `1px solid ${text}15` }}>
      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: accent, marginBottom: '8px' }}>
        Graphique 02
      </div>
      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: text }}>
        Répartition des charges mensuelles
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={`${text}15`} />
          <XAxis type="number" tick={{ fontSize: 10, fill: text }} stroke={`${text}40`} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k€`} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: text }} stroke={`${text}40`} width={110} />
          <Tooltip
            contentStyle={{ background: 'white', border: `1px solid ${text}30`, fontSize: '12px' }}
            formatter={(v: any) => [`${Number(v).toLocaleString('fr-FR')}€/mois`, '']}
          />
          <Bar dataKey="value" fill={accent} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FundingChart({ formData, accent, text }: Props) {
  // Parse "Apport perso 15k€, prêt bancaire 30k€..." → [{name, value}]
  const sources = formData.fundingSources || ''
  const matches = Array.from(sources.matchAll(/([a-zàâäéèêëïîôùûüÿç\s'-]+?)\s*(\d+(?:[\s.,]?\d+)*)\s*(?:k€|€|k)/gi))
  
  const data: { name: string, value: number }[] = []
  matches.forEach(m => {
    const name = m[1].trim().replace(/^[,;]/, '').trim()
    let val = parseFloat(m[2].replace(/[\s,]/g, ''))
    if (sources.toLowerCase().includes(`${m[2]}k`)) val *= 1000
    if (name && val > 0) data.push({ name: name.charAt(0).toUpperCase() + name.slice(1), value: val })
  })

  if (data.length === 0) return null

  const colors = [accent, `${accent}aa`, `${accent}77`, `${accent}55`, `${accent}33`]

  return (
    <div style={{ marginTop: '24px', padding: '24px', background: `${text}05`, border: `1px solid ${text}15` }}>
      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: accent, marginBottom: '8px' }}>
        Graphique 03
      </div>
      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: text }}>
        Sources de financement
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={(e: any) => `${e.name}`} labelLine={false}>
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'white', border: `1px solid ${text}30`, fontSize: '12px' }}
            formatter={(v: any) => [`${Number(v).toLocaleString('fr-FR')}€`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}