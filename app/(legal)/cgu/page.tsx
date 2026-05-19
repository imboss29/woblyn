import LegalLayout from '../LegalLayout'

export default function CGUPage() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" updated="19 mai 2026">
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités d'accès et d'utilisation du site woblyn.com édité par <strong>Corentin LECLERC</strong>, entrepreneur individuel (SIRET 885 228 643 00031).
      </p>
      <p>
        En accédant au site ou en créant un compte, l'utilisateur accepte sans réserve les présentes CGU.
      </p>

      <h2>Article 2 — Accès au service</h2>
      <p>
        Le service est accessible 24h/24 et 7j/7, sous réserve d'éventuelles interruptions pour maintenance technique. Woblyn met tout en œuvre pour garantir la disponibilité du service mais ne saurait être tenu responsable des interruptions ponctuelles.
      </p>

      <h2>Article 3 — Inscription</h2>
      <p>
        La création d'un compte est nécessaire pour accéder à l'ensemble des fonctionnalités. L'utilisateur s'engage à fournir des informations exactes lors de son inscription (prénom, email).
      </p>
      <p>
        L'utilisateur est responsable de la confidentialité de son mot de passe et de toutes les actions effectuées depuis son compte.
      </p>

      <h2>Article 4 — Utilisation du service</h2>
      <p>L'utilisateur s'engage à :</p>
      <ul>
        <li>Utiliser le service conformément à sa destination (génération de business plans)</li>
        <li>Ne pas utiliser le service à des fins illégales, frauduleuses ou nuisibles</li>
        <li>Ne pas tenter d'accéder aux comptes d'autres utilisateurs</li>
        <li>Ne pas tenter de contourner les limitations techniques ou les mesures de sécurité</li>
        <li>Ne pas surcharger le service par des requêtes automatisées non autorisées</li>
        <li>Ne pas reproduire, copier ou exploiter commercialement le code, les algorithmes ou les prompts de Woblyn</li>
      </ul>

      <h2>Article 5 — Contenu généré</h2>
      <p>
        Le business plan généré appartient à l'utilisateur. Toutefois, l'utilisateur reconnaît que :
      </p>
      <ul>
        <li>Le contenu est généré par une intelligence artificielle et doit être relu, vérifié et adapté</li>
        <li>Woblyn ne garantit pas l'exactitude absolue des informations générées</li>
        <li>L'utilisateur reste seul responsable de l'utilisation faite du document</li>
      </ul>

      <h2>Article 6 — Limitations d'usage</h2>
      <p>
        Afin de garantir la qualité du service pour tous, Woblyn applique des limitations techniques (rate limiting) sur les actions sensibles (génération IA, soumission de formulaires). Ces limitations sont automatiques et destinées à prévenir les abus.
      </p>

      <h2>Article 7 — Suspension et résiliation</h2>
      <p>
        Woblyn se réserve le droit de suspendre ou de résilier le compte d'un utilisateur en cas de manquement aux présentes CGU, notamment en cas :
      </p>
      <ul>
        <li>D'utilisation frauduleuse du service</li>
        <li>De tentative de contournement des mesures de sécurité</li>
        <li>De comportement abusif envers le service client</li>
        <li>De non-paiement d'une commande</li>
      </ul>

      <h2>Article 8 — Suppression de compte</h2>
      <p>
        L'utilisateur peut supprimer son compte à tout moment depuis son dashboard. La suppression entraîne l'effacement définitif de toutes ses données dans un délai maximum de 30 jours, à l'exception des données conservées pour des raisons légales (facturation).
      </p>

      <h2>Article 9 — Propriété intellectuelle</h2>
      <p>
        Tous les éléments composant le site Woblyn (textes, images, logo, code, design, prompts IA) sont protégés par le droit d'auteur et appartiennent à Corentin Leclerc. Toute reproduction, représentation ou diffusion non autorisée est strictement interdite.
      </p>

      <h2>Article 10 — Responsabilité</h2>
      <p>
        Woblyn s'engage à fournir un service de qualité mais ne peut garantir l'absence totale d'erreurs ou de bugs. La responsabilité de Woblyn ne pourra être engagée pour :
      </p>
      <ul>
        <li>Une mauvaise utilisation du service par l'utilisateur</li>
        <li>Une perte de données liée à un cas de force majeure</li>
        <li>Les conséquences indirectes liées à l'utilisation des business plans générés</li>
      </ul>

      <h2>Article 11 — Données personnelles</h2>
      <p>
        Le traitement des données personnelles est détaillé dans notre <a href="/confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>Article 12 — Modifications</h2>
      <p>
        Woblyn se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications substantielles par email ou via une notification sur le site.
      </p>

      <h2>Article 13 — Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution sera de la compétence exclusive des tribunaux français.
      </p>

      <h2>Article 14 — Contact</h2>
      <p>
        Pour toute question relative aux présentes CGU : <strong>contact@woblyn.com</strong>
      </p>
    </LegalLayout>
  )
}