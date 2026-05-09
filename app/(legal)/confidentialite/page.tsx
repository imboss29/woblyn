import LegalLayout from '../LegalLayout'

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="9 mai 2026">
      <p>
        La présente politique de confidentialité décrit comment Woblyn collecte, utilise et protège vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française "Informatique et Libertés".
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est <strong>[NOM DE L'ENTREPRISE]</strong>, dont les coordonnées figurent dans les <a href="/mentions-legales">mentions légales</a>.
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les données suivantes :</p>
      <ul>
        <li><strong>Lors de la création de compte :</strong> nom, adresse email, mot de passe (chiffré)</li>
        <li><strong>Lors de l'utilisation :</strong> données saisies dans le questionnaire (description du projet, données financières, informations sur l'équipe)</li>
        <li><strong>Données techniques :</strong> adresse IP, type de navigateur, dates et heures de connexion</li>
        <li><strong>En cas de paiement :</strong> les données bancaires sont collectées et traitées exclusivement par notre prestataire Stripe (PCI-DSS certifié). Nous ne stockons jamais vos données bancaires.</li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Créer et gérer votre compte utilisateur</li>
        <li>Générer vos business plans via l'intelligence artificielle</li>
        <li>Vous fournir un accès continu à vos documents</li>
        <li>Traiter vos paiements (le cas échéant)</li>
        <li>Vous contacter en cas de besoin lié au service</li>
        <li>Améliorer notre service de manière agrégée et anonyme</li>
      </ul>

      <h2>4. Base légale</h2>
      <p>
        Le traitement de vos données repose sur l'exécution du contrat qui nous lie (article 6.1.b du RGPD) ainsi que sur votre consentement explicite (article 6.1.a) lors de la création du compte.
      </p>

      <h2>5. Destinataires des données</h2>
      <p>Vos données sont accessibles à :</p>
      <ul>
        <li><strong>Notre équipe</strong> (administration et support)</li>
        <li><strong>Anthropic PBC</strong> (États-Unis) — fournisseur de l'IA générative Claude utilisée pour rédiger les business plans. Les données du questionnaire sont transmises pour générer le contenu, sans persistance chez Anthropic.</li>
        <li><strong>Vercel Inc.</strong> (États-Unis) — hébergeur du site</li>
        <li><strong>Railway Corp.</strong> (États-Unis) — hébergeur de la base de données</li>
        <li><strong>Stripe Inc.</strong> (États-Unis) — prestataire de paiement (le cas échéant)</li>
      </ul>
      <p>
        Les transferts hors Union Européenne sont encadrés par les clauses contractuelles types de la Commission européenne.
      </p>

      <h2>6. Durée de conservation</h2>
      <ul>
        <li><strong>Données de compte :</strong> conservées tant que votre compte est actif. Supprimées 30 jours après suppression du compte.</li>
        <li><strong>Business plans générés :</strong> conservés tant que votre compte est actif.</li>
        <li><strong>Données de facturation :</strong> conservées 10 ans (obligation légale comptable).</li>
        <li><strong>Logs de connexion :</strong> conservés 12 mois.</li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès</strong> : obtenir une copie des données vous concernant</li>
        <li><strong>Droit de rectification</strong> : corriger les données inexactes</li>
        <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données ("droit à l'oubli")</li>
        <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
        <li><strong>Droit d'opposition</strong> : vous opposer à certains traitements</li>
        <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à <strong>contact@woblyn.com</strong>. Nous répondons sous 30 jours maximum.
      </p>
      <p>
        Vous pouvez également supprimer directement votre compte depuis votre dashboard.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Vos données sont protégées par des mesures techniques et organisationnelles : chiffrement des mots de passe (bcrypt), connexions HTTPS, hébergement sécurisé, sauvegardes automatiques quotidiennes.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Le site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement (session de connexion). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
      </p>

      <h2>10. Réclamation</h2>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">www.cnil.fr</a>.
      </p>
    </LegalLayout>
  )
}