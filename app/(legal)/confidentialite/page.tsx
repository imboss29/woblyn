import LegalLayout from '../LegalLayout'

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="19 mai 2026">
      <p>
        La présente politique de confidentialité décrit la manière dont Woblyn collecte, utilise et protège les données personnelles de ses utilisateurs.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est <strong>Corentin LECLERC</strong>, entrepreneur individuel, SIRET 885 228 643 00031, situé au 3 rue des Arbousiers, 66300 Thuir, France.
      </p>
      <p>
        Contact : <strong>contact@woblyn.com</strong>
      </p>

      <h2>Données collectées</h2>
      <p>Nous collectons les données suivantes :</p>
      <ul>
        <li><strong>Compte utilisateur :</strong> prénom, email, mot de passe (haché)</li>
        <li><strong>Business plans :</strong> données saisies dans le questionnaire (description de projet, données financières, etc.)</li>
        <li><strong>Paiement :</strong> traité par notre prestataire Stripe (nous ne stockons aucune donnée bancaire)</li>
        <li><strong>Logs techniques :</strong> adresse IP, navigateur, dates de connexion (à des fins de sécurité)</li>
      </ul>

      <h2>Finalités du traitement</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Créer et gérer votre compte</li>
        <li>Générer vos business plans personnalisés</li>
        <li>Traiter les paiements</li>
        <li>Vous contacter en cas de problème ou pour des informations relatives au service</li>
        <li>Améliorer le service et détecter les abus</li>
      </ul>

      <h2>Base légale</h2>
      <p>
        Le traitement de vos données repose sur l'exécution du contrat (CGV) ainsi que sur votre consentement explicite lors de l'inscription.
      </p>

      <h2>Durée de conservation</h2>
      <ul>
        <li><strong>Compte utilisateur :</strong> jusqu'à la suppression du compte par l'utilisateur</li>
        <li><strong>Business plans :</strong> jusqu'à suppression par l'utilisateur ou suppression du compte</li>
        <li><strong>Données de facturation :</strong> 10 ans (obligation légale fiscale)</li>
        <li><strong>Logs techniques :</strong> 12 mois maximum</li>
      </ul>

      <h2>Sous-traitants</h2>
      <p>Nous utilisons les sous-traitants suivants, soumis au RGPD :</p>
      <ul>
        <li><strong>Vercel Inc.</strong> (hébergement) — USA, conforme au cadre de protection des données UE-USA</li>
        <li><strong>Railway Corp.</strong> (base de données) — USA, conforme au cadre de protection des données UE-USA</li>
        <li><strong>Anthropic</strong> (génération IA) — USA. Anthropic n'utilise pas vos données pour entraîner ses modèles</li>
        <li><strong>Stripe</strong> (paiements) — conforme PCI-DSS</li>
        <li><strong>PDFShift</strong> (génération PDF) — UE</li>
        <li><strong>Sentry</strong> (monitoring d'erreurs) — USA</li>
        <li><strong>Upstash</strong> (limitation de débit) — UE</li>
      </ul>

      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
        <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
        <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
        <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
        <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
        <li><strong>Droit de réclamation :</strong> auprès de la CNIL (cnil.fr)</li>
      </ul>
      <p>
        Pour exercer vos droits, contactez-nous à : <strong>contact@woblyn.com</strong>
      </p>

      <h2>Cookies</h2>
      <p>
        Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement (session, authentification). Nous n'utilisons pas de cookies de tracking ou de publicité.
      </p>

      <h2>Sécurité</h2>
      <p>
        Vos données sont protégées par chiffrement HTTPS, des mots de passe hachés, des sauvegardes régulières et un système de limitation des accès. Aucune donnée bancaire n'est stockée sur nos serveurs.
      </p>

      <h2>Modifications</h2>
      <p>
        Cette politique peut être modifiée à tout moment. La date de dernière mise à jour est indiquée en haut du document.
      </p>
    </LegalLayout>
  )
}