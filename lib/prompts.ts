export type FormData = {
  projectName: string
  activity: string
  sector: string
  legalStatus: string
  problem: string
  solution: string
  advantage: string
  timing: string
  targetCustomers: string
  geographicZone: string
  competitors: string
  marketSize: string
  revenueModel: string
  averagePrice: string
  variableCost: string
  monthlyVolume: string
  acquisitionChannels: string
  marketingBudget: string
  retentionStrategy: string
  initialInvestment: string
  monthlyCharges: string
  fundingSources: string
  launchDate: string
  growthY2: string
  growthY3: string
  revenueY3: string
  foundersCount: string
  founderProfile: string
  hiringPlan: string
  keySkills: string
  visionY5: string
  risks: string
  exitStrategy: string
}

export type Language = 'fr' | 'en'

const buildContextFR = (data: FormData) => `
DONNÉES DU PROJET :

PROJET
- Nom : ${data.projectName}
- Activité : ${data.activity}
- Secteur : ${data.sector}
- Statut juridique : ${data.legalStatus}
- Date de lancement : ${data.launchDate}

PROPOSITION DE VALEUR
- Problème résolu : ${data.problem}
- Solution : ${data.solution}
- Avantage concurrentiel : ${data.advantage}
- Timing du marché : ${data.timing}

MARCHÉ
- Clientèle cible : ${data.targetCustomers}
- Zone géographique : ${data.geographicZone}
- Concurrents : ${data.competitors}
- Taille du marché : ${data.marketSize}

MODÈLE ÉCONOMIQUE
- Modèle de revenus : ${data.revenueModel}
- Prix moyen : ${data.averagePrice}€
- Coût variable : ${data.variableCost}€
- Volume mois 12 : ${data.monthlyVolume}/mois

ACQUISITION
- Canaux : ${data.acquisitionChannels}
- Budget marketing : ${data.marketingBudget}€/mois
- Stratégie de fidélisation : ${data.retentionStrategy}

FINANCES
- Investissement de départ : ${data.initialInvestment}€
- Charges fixes mensuelles : ${data.monthlyCharges}€
- Sources de financement : ${data.fundingSources}

PROJECTIONS
- Croissance année 2 : ${data.growthY2}%
- Croissance année 3 : ${data.growthY3}%
- CA cible année 3 : ${data.revenueY3}€

ÉQUIPE
- Nombre de fondateurs : ${data.foundersCount}
- Profil fondateurs : ${data.founderProfile}
- Recrutements année 1 : ${data.hiringPlan}
- Compétences clés : ${data.keySkills}

VISION
- Vision 5 ans : ${data.visionY5}
- Risques identifiés : ${data.risks}
- Stratégie de sortie : ${data.exitStrategy}
`

const buildContextEN = (data: FormData) => `
PROJECT DATA:

PROJECT
- Name: ${data.projectName}
- Activity: ${data.activity}
- Sector: ${data.sector}
- Legal form: ${data.legalStatus}
- Launch date: ${data.launchDate}

VALUE PROPOSITION
- Problem solved: ${data.problem}
- Solution: ${data.solution}
- Competitive advantage: ${data.advantage}
- Market timing: ${data.timing}

MARKET
- Target customers: ${data.targetCustomers}
- Geographic area: ${data.geographicZone}
- Competitors: ${data.competitors}
- Market size: ${data.marketSize}

BUSINESS MODEL
- Revenue model: ${data.revenueModel}
- Average price: €${data.averagePrice}
- Variable cost: €${data.variableCost}
- Volume month 12: ${data.monthlyVolume}/month

ACQUISITION
- Channels: ${data.acquisitionChannels}
- Marketing budget: €${data.marketingBudget}/month
- Retention strategy: ${data.retentionStrategy}

FINANCES
- Initial investment: €${data.initialInvestment}
- Fixed monthly costs: €${data.monthlyCharges}
- Funding sources: ${data.fundingSources}

PROJECTIONS
- Year 2 growth: ${data.growthY2}%
- Year 3 growth: ${data.growthY3}%
- Year 3 revenue target: €${data.revenueY3}

TEAM
- Number of founders: ${data.foundersCount}
- Founders profile: ${data.founderProfile}
- Year 1 hires: ${data.hiringPlan}
- Key skills: ${data.keySkills}

VISION
- 5-year vision: ${data.visionY5}
- Identified risks: ${data.risks}
- Exit strategy: ${data.exitStrategy}
`

const baseFR = `
Tu es un consultant senior en business plans, 15 ans d'expérience.
Tu rédiges pour des banques, investisseurs et incubateurs.

RÈGLES ABSOLUES :
1. Rédige EXCLUSIVEMENT en français professionnel et soigné.
2. Utilise UNIQUEMENT les données fournies. N'invente jamais de chiffres.
3. Si une donnée manque, contourne intelligemment sans souligner le manque.
4. Ton confiant, factuel, jamais grandiloquent.
5. Pas de phrases creuses ("dans un monde en constante évolution").
6. Pas de superlatifs vides ("révolutionnaire", "incomparable").
7. Renvoie UNIQUEMENT le texte de la section, sans préambule ni titre principal.

FORMATAGE MARKDOWN :
- Utilise des sous-titres ## pour structurer (mais pas de # principal).
- Utilise **gras** pour souligner les points clés et chiffres importants.
- Utilise des tableaux markdown pour TOUTES les données comparatives ou chiffrées.
- Aère le texte avec des sauts de ligne.
`

const baseEN = `
You are a senior business plan consultant with 15 years of experience.
You write for banks, investors, and incubators.

ABSOLUTE RULES:
1. Write EXCLUSIVELY in professional, polished English.
2. Use ONLY the provided data. Never invent numbers.
3. If data is missing, work around it intelligently without highlighting the gap.
4. Confident, factual tone, never grandiose.
5. No empty phrases ("in today's ever-changing world").
6. No empty superlatives ("revolutionary", "unparalleled").
7. Return ONLY the section text, without preamble or main title.

MARKDOWN FORMATTING:
- Use ## subtitles to structure (but no main # heading).
- Use **bold** for key points and important figures.
- Use markdown tables for ALL comparative or numerical data.
- Use line breaks to keep text breathable.
`

const buildContext = (data: FormData, lang: Language) => lang === 'en' ? buildContextEN(data) : buildContextFR(data)
const baseInstructions = (lang: Language) => lang === 'en' ? baseEN : baseFR

export const prompts = {
  executiveSummary: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}

${buildContext(data, lang)}

TASK: Write the EXECUTIVE SUMMARY.

Structure:
- 3-4 dense paragraphs
- Project, founders, opportunity overview
- Unique value proposition and target market
- Business model and key financial projections
- Funding needs and outlook

End with a markdown table of key figures:
| Indicator | Value |
|-----------|-------|
| Revenue Year 1 | €XXX |
| Revenue Year 3 | €XXX |
| Break-even | Month X |
| Investment required | €XXX |

Target length: 350-450 words + table.
` : `
${baseInstructions(lang)}

${buildContext(data, lang)}

TÂCHE : Rédige l'EXECUTIVE SUMMARY.

Structure :
- 3-4 paragraphes denses
- Présentation projet, fondateurs, opportunité
- Proposition de valeur unique et marché ciblé
- Modèle économique et projections financières clés
- Besoins de financement et perspectives

Termine par un tableau markdown récapitulatif des chiffres clés :
| Indicateur | Valeur |
|------------|--------|
| CA Année 1 | XXX€ |
| CA Année 3 | XXX€ |
| Break-even | Mois X |
| Investissement requis | XXX€ |

Longueur cible : 350-450 mots + tableau.
`,

  projectPresentation: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "PROJECT AND FOUNDERS PRESENTATION" section.
Structure (with ## subtitles):
## Project genesis
## Activity description
## Founding team
## Legal structure
Use a table for the team if relevant:
| Founder | Role | Key experience |
Target length: 400-500 words.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "PRÉSENTATION DU PROJET ET DES FONDATEURS".
Structure (avec sous-titres ##) :
## Genèse du projet
## Description de l'activité
## L'équipe fondatrice
## Statut juridique et structure
Si pertinent, utilise un tableau pour présenter l'équipe :
| Fondateur | Rôle | Expérience clé |
Longueur cible : 400-500 mots.
`,

  marketAnalysis: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "MARKET AND COMPETITION ANALYSIS" section.
Structure (with ## subtitles):
## Market size and dynamics
## Key sector trends
## Customer segmentation
## Competitive analysis
## Differentiated positioning
MANDATORY: Include a competitive analysis table:
| Competitor | Strengths | Weaknesses | Positioning |
Target length: 500-600 words + table.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "ANALYSE DU MARCHÉ ET DE LA CONCURRENCE".
Structure (avec sous-titres ##) :
## Taille et dynamique du marché
## Tendances clés du secteur
## Segmentation client
## Analyse concurrentielle
## Positionnement différenciant
OBLIGATOIRE : Inclus un tableau d'analyse concurrentielle :
| Concurrent | Forces | Faiblesses | Positionnement |
Longueur cible : 500-600 mots + tableau.
`,

  valueProposition: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "VALUE PROPOSITION" section.
Structure (with ## subtitles):
## The problem
## The solution
## Our competitive advantages
## Why now
Present competitive advantages as a table:
| Advantage | Description | Customer impact |
Target length: 400-500 words + table.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "PROPOSITION DE VALEUR".
Structure (avec sous-titres ##) :
## Le problème
## La solution
## Nos avantages concurrentiels
## Pourquoi maintenant
Présente les avantages concurrentiels sous forme de tableau :
| Avantage | Description | Impact pour le client |
Longueur cible : 400-500 mots + tableau.
`,

  goToMarket: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "GO-TO-MARKET STRATEGY" section.
Structure (with ## subtitles):
## Acquisition channels
## Pricing strategy
## Retention plan
## Marketing budget allocation
MANDATORY: Budget allocation table:
| Channel | Monthly budget (€) | Goal | Key KPI |
Target length: 450-550 words + table.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "STRATÉGIE COMMERCIALE ET MARKETING".
Structure (avec sous-titres ##) :
## Canaux d'acquisition
## Stratégie de pricing
## Plan de fidélisation
## Allocation du budget marketing
OBLIGATOIRE : Tableau d'allocation budgétaire :
| Canal | Budget mensuel (€) | Objectif | KPI principal |
Longueur cible : 450-550 mots + tableau.
`,

  operationalPlan: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "OPERATIONAL PLAN" section.
Structure (with ## subtitles):
## Internal organization and HR
## Tools and technology
## Key operational processes
## Critical partnerships
## Launch timeline
MANDATORY: First 12 months timeline table:
| Month | Key milestone | Concrete action |
Target length: 400-500 words + table.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "PLAN OPÉRATIONNEL".
Structure (avec sous-titres ##) :
## Organisation interne et RH
## Outils et technologies
## Processus opérationnels clés
## Partenariats critiques
## Calendrier de lancement
OBLIGATOIRE : Tableau du calendrier sur les 12 premiers mois :
| Mois | Jalon clé | Action concrète |
Longueur cible : 400-500 mots + tableau.
`,

  financialProjections: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "FINANCIAL PROJECTIONS" section.
Calculate from the provided data. Volume progresses from ~30% of target in month 1 to 100% in month 12.
Structure (with ## subtitles):
## Assumptions
## Profit and loss forecast
## Cash flow plan
## Break-even point
MANDATORY: 3 tables:
1. P&L over 3 years:
| Indicator | Year 1 | Year 2 | Year 3 |
2. Monthly revenue (Year 1):
| Month | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 |
3. Key indicators:
| Indicator | Value |
Target length: 500-600 words + 3 tables.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "PROJECTIONS FINANCIÈRES".
Calcule à partir des données fournies. Le volume passe progressivement de ~30% du volume cible au mois 1 à 100% au mois 12.
Structure (avec sous-titres ##) :
## Hypothèses retenues
## Compte de résultat prévisionnel
## Plan de trésorerie
## Point mort
OBLIGATOIRE : 3 tableaux :
1. Compte de résultat sur 3 ans :
| Indicateur | Année 1 | Année 2 | Année 3 |
2. Évolution du CA mois par mois (année 1) :
| Mois | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 |
3. Indicateurs clés :
| Indicateur | Valeur |
Longueur cible : 500-600 mots + 3 tableaux.
`,

  fundingPlan: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "FUNDING PLAN" section.
Structure (with ## subtitles):
## Financial needs
## Funding sources
## Mobilization timeline
## Return on investment
MANDATORY: 2 tables:
1. Detailed needs:
| Item | Amount (€) | Justification |
2. Funding plan:
| Source | Amount (€) | Type | Timeline |
Target length: 350-450 words + 2 tables.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "PLAN DE FINANCEMENT".
Structure (avec sous-titres ##) :
## Besoins financiers
## Sources de financement
## Calendrier de mobilisation
## Retour sur investissement
OBLIGATOIRE : 2 tableaux :
1. Détail des besoins :
| Poste | Montant (€) | Justification |
2. Plan de financement :
| Source | Montant (€) | Type | Échéance |
Longueur cible : 350-450 mots + 2 tableaux.
`,

  risksAnalysis: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "RISK ANALYSIS" section.
Present 3 major risks identified by the founder + 2 additional sector-specific risks.
MANDATORY: Risk analysis table:
| Risk | Probability | Impact | Mitigation plan |
For each risk, add an explanatory paragraph after the table.
Target length: 450-550 words + table.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "ANALYSE DES RISQUES".
Présente les 3 risques majeurs identifiés par le porteur + 2 risques sectoriels supplémentaires.
OBLIGATOIRE : Tableau d'analyse des risques :
| Risque | Probabilité | Impact | Plan de mitigation |
Pour chaque risque, ajoute un paragraphe explicatif détaillé après le tableau.
Longueur cible : 450-550 mots + tableau.
`,

  conclusion: (data: FormData, lang: Language = 'fr') => lang === 'en' ? `
${baseInstructions(lang)}
${buildContext(data, lang)}
TASK: Write the "CONCLUSION AND ROADMAP" section.
Structure (with ## subtitles):
## Project strengths summary
## 5-year vision
## Strategic roadmap
## Exit strategy
MANDATORY: Strategic roadmap table:
| Year | Key milestone | Success indicator |
Target length: 350-450 words + table.
` : `
${baseInstructions(lang)}
${buildContext(data, lang)}
TÂCHE : Rédige la section "CONCLUSION ET ROADMAP".
Structure (avec sous-titres ##) :
## Synthèse des forces du projet
## Vision à 5 ans
## Roadmap stratégique
## Stratégie de sortie
OBLIGATOIRE : Tableau de roadmap stratégique :
| Année | Jalon clé | Indicateur de réussite |
Longueur cible : 350-450 mots + tableau.
`,
}

export const SECTION_KEYS = [
  'executiveSummary',
  'projectPresentation',
  'marketAnalysis',
  'valueProposition',
  'goToMarket',
  'operationalPlan',
  'financialProjections',
  'fundingPlan',
  'risksAnalysis',
  'conclusion',
] as const

export type SectionKey = typeof SECTION_KEYS[number]

export const SECTION_LABELS_FR: Record<SectionKey, string> = {
  executiveSummary: 'Executive Summary',
  projectPresentation: 'Présentation du projet',
  marketAnalysis: 'Analyse du marché',
  valueProposition: 'Proposition de valeur',
  goToMarket: 'Stratégie commerciale',
  operationalPlan: 'Plan opérationnel',
  financialProjections: 'Projections financières',
  fundingPlan: 'Plan de financement',
  risksAnalysis: 'Analyse des risques',
  conclusion: 'Conclusion & Roadmap',
}

export const SECTION_LABELS_EN: Record<SectionKey, string> = {
  executiveSummary: 'Executive Summary',
  projectPresentation: 'Project Overview',
  marketAnalysis: 'Market Analysis',
  valueProposition: 'Value Proposition',
  goToMarket: 'Go-to-Market Strategy',
  operationalPlan: 'Operational Plan',
  financialProjections: 'Financial Projections',
  fundingPlan: 'Funding Plan',
  risksAnalysis: 'Risk Analysis',
  conclusion: 'Conclusion & Roadmap',
}

// Pour rétrocompatibilité (sera remplacé progressivement)
export const SECTION_LABELS = SECTION_LABELS_FR