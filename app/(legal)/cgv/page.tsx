import LegalLayout from '../LegalLayout'

export default function CGVPage() {
  return (
    <LegalLayout title="Conditions Générales de Vente" updated="19 mai 2026">
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>Corentin LECLERC</strong>, entrepreneur individuel (SIRET 885 228 643 00031), exploitant le service Woblyn accessible à l'adresse woblyn.com (ci-après « Woblyn »), et toute personne effectuant un achat sur le site (ci-après « le Client »).
      </p>

      <h2>Article 2 — Service proposé</h2>
      <p>Woblyn propose un service de génération automatisée de business plans via intelligence artificielle. Le service comprend :</p>
      <ul>
        <li>La génération automatique de 10 sections d'un business plan à partir d'un questionnaire</li>
        <li>L'accès à un éditeur en ligne pour personnaliser le document</li>
        <li>Le téléchargement du business plan au format PDF</li>
      </ul>

      <h2>Article 3 — Prix</h2>
      <p>
        Le prix du plan Starter est de <strong>97 € TTC</strong> en paiement unique. Conformément à l'article 293 B du Code Général des Impôts, la TVA n'est pas applicable (franchise en base).
      </p>
      <p>
        Le prix est indiqué en euros et est dû à la commande.
      </p>

      <h2>Article 4 — Paiement</h2>
      <p>
        Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) via notre prestataire Stripe, certifié PCI-DSS. Aucune donnée bancaire n'est stockée sur les serveurs de Woblyn.
      </p>

      <h2>Article 5 — Livraison du service</h2>
      <p>
        Dès validation du paiement, le Client accède immédiatement à son business plan complet sur son compte Woblyn. Le business plan peut être téléchargé en PDF autant de fois que nécessaire.
      </p>

      <h2>Article 6 — Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques fournis sur un support immatériel dont l'exécution a commencé avec l'accord préalable exprès du consommateur.
      </p>
      <p>
        En validant son achat, le Client reconnaît expressément que la prestation commence immédiatement et accepte de renoncer à son droit de rétractation.
      </p>

      <h2>Article 7 — Remboursement</h2>
      <p>
        Conformément à l'article 6, aucun remboursement n'est dû. Toutefois, en cas de problème technique avéré empêchant la génération du business plan, Woblyn s'engage à étudier la demande de remboursement au cas par cas. Le Client doit en faire la demande à contact@woblyn.com dans les 7 jours suivant l'achat.
      </p>

      <h2>Article 8 — Propriété intellectuelle</h2>
      <p>
        Le business plan généré appartient au Client. Il peut l'utiliser librement à titre personnel ou professionnel (présentation à des banques, investisseurs, incubateurs, etc.).
      </p>
      <p>
        Le code source de la plateforme Woblyn, le design, les algorithmes et les prompts utilisés restent la propriété exclusive de Corentin Leclerc.
      </p>

      <h2>Article 9 — Garantie et responsabilité</h2>
      <p>
        Woblyn est un outil d'aide à la rédaction. Le business plan généré est une <strong>première version</strong> qui doit être relue, vérifiée et adaptée par le Client. Woblyn ne garantit pas l'obtention d'un financement bancaire ou d'un investissement sur la base du document fourni.
      </p>
      <p>
        La responsabilité de Woblyn ne saurait être engagée pour :
      </p>
      <ul>
        <li>Les décisions prises par le Client sur la base du business plan</li>
        <li>Les refus de financement ou d'investissement</li>
        <li>Les erreurs ou inexactitudes liées aux données saisies par le Client</li>
        <li>Les interruptions temporaires du service liées à des opérations de maintenance</li>
      </ul>

      <h2>Article 10 — Données personnelles</h2>
      <p>
        Le traitement des données personnelles est régi par notre <a href="/confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>Article 11 — Service client</h2>
      <p>
        Pour toute question, le Client peut contacter le service client à : <strong>contact@woblyn.com</strong>. Le délai de réponse est de 24 à 48 heures ouvrées.
      </p>

      <h2>Article 12 — Modification des CGV</h2>
      <p>
        Woblyn se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.
      </p>

      <h2>Article 13 — Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.
      </p>
      <p>
        Conformément à l'article L612-1 du Code de la consommation, le Client peut recourir gratuitement au médiateur de la consommation pour résoudre un litige : <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer">www.economie.gouv.fr/mediation-conso</a>.
      </p>
    </LegalLayout>
  )
}