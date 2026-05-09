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

const buildContext = (data: FormData) => `
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

const baseInstructions = `
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
- Utilise des listes à puces uniquement quand pertinent (pas systématiquement).
- Aère le texte avec des sauts de ligne.

EXEMPLE DE TABLEAU MARKDOWN :
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Donnée 1 | Donnée 2 | Donnée 3 |
`

export const prompts = {
  executiveSummary: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  projectPresentation: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  marketAnalysis: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  valueProposition: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  goToMarket: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  operationalPlan: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  financialProjections: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

TÂCHE : Rédige la section "PROJECTIONS FINANCIÈRES".

Calcule à partir des données fournies. Le volume passe progressivement de ~30% du volume cible au mois 1 à 100% au mois 12.

Structure (avec sous-titres ##) :
## Hypothèses retenues
## Compte de résultat prévisionnel
## Plan de trésorerie
## Point mort

OBLIGATOIRE : Inclus 3 tableaux :

1. Compte de résultat sur 3 ans :
| Indicateur | Année 1 | Année 2 | Année 3 |
|------------|---------|---------|---------|
| Chiffre d'affaires | XX€ | XX€ | XX€ |
| Coûts variables | XX€ | XX€ | XX€ |
| Marge brute | XX€ | XX€ | XX€ |
| Charges fixes | XX€ | XX€ | XX€ |
| Résultat d'exploitation | XX€ | XX€ | XX€ |

2. Évolution du CA mois par mois (année 1) :
| Mois | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 | M11 | M12 |
|------|----|----|----|----|----|----|----|----|----|----|----|-----|
| CA | XX€ | XX€ | ... |

3. Indicateurs clés :
| Indicateur | Valeur |
|------------|--------|
| Marge brute % | X% |
| Break-even (mois) | MX |
| ROI Année 3 | X% |

Longueur cible : 500-600 mots + 3 tableaux.
`,

  fundingPlan: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

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

  risksAnalysis: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

TÂCHE : Rédige la section "ANALYSE DES RISQUES".

Présente les 3 risques majeurs identifiés par le porteur + 2 risques sectoriels supplémentaires.

OBLIGATOIRE : Tableau d'analyse des risques :
| Risque | Probabilité | Impact | Plan de mitigation |
|--------|-------------|--------|--------------------|
| Risque 1 | Moyenne | Élevé | ... |

Pour chaque risque, ajoute un paragraphe explicatif détaillé après le tableau.

Longueur cible : 450-550 mots + tableau.
`,

  conclusion: (data: FormData) => `
${baseInstructions}

${buildContext(data)}

TÂCHE : Rédige la section "CONCLUSION ET ROADMAP".

Structure (avec sous-titres ##) :
## Synthèse des forces du projet
## Vision à 5 ans
## Roadmap stratégique
## Stratégie de sortie

OBLIGATOIRE : Tableau de roadmap stratégique :
| Année | Jalon clé | Indicateur de réussite |
|-------|-----------|------------------------|
| Année 1 | ... | ... |
| Année 2 | ... | ... |
| Année 3 | ... | ... |
| Année 5 | ... | ... |

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

export const SECTION_LABELS: Record<SectionKey, string> = {
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