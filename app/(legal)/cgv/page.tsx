import LegalLayout from '../LegalLayout'

export default function CGVPage() {
  return (
    <LegalLayout title="Conditions Générales de Vente" updated="9 mai 2026">
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent l'achat des services proposés par Woblyn sur le site woblyn.com.
      </p>

      <h2>1. Vendeur</h2>
      <p>
        Le service est commercialisé par <strong>[NOM DE L'ENTREPRISE]</strong>, dont les coordonnées complètes figurent dans les <a href="/mentions-legales">mentions légales</a>.
      </p>

      <h2>2. Services proposés</h2>
      <p>
        Woblyn propose un service en ligne de génération de business plans assistée par intelligence artificielle. Le service comprend :
      </p>
      <ul>
        <li>La génération automatique de 10 sections d'un business plan à partir d'un questionnaire</li>
        <li>Un éditeur permettant de personnaliser le contenu et le design</li>
        <li>L'export du document en format PDF</li>
      </ul>

      <h2>3. Tarifs</h2>
      <p>
        Les tarifs sont indiqués en euros, toutes taxes comprises (TTC). Les offres actuelles sont :
      </p>
      <ul>
        <li><strong>Free</strong> — 0€ : aperçu de 3 sections, sans export</li>
        <li><strong>Starter</strong> — 97€ : un business plan complet, paiement unique</li>
        <li><strong>Pro</strong> — 149€/mois : business plans illimités, fonctionnalités avancées</li>
        <li><strong>Business</strong> — 299€/mois : pour cabinets et incubateurs, jusqu'à 10 utilisateurs</li>
      </ul>
      <p>
        Woblyn se réserve le droit de modifier ses tarifs à tout moment. Les modifications n'affectent pas les abonnements en cours.
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        L'achat s'effectue en ligne via notre prestataire de paiement Stripe. Les moyens de paiement acceptés sont les cartes bancaires (Visa, Mastercard, American Express).
      </p>
      <p>
        Le paiement est exigible immédiatement à la commande. Une facture est envoyée par email après chaque paiement.
      </p>

      <h2>5. Livraison du service</h2>
      <p>
        L'accès au service est immédiat après confirmation du paiement. Pour les abonnements mensuels, l'accès est renouvelé automatiquement chaque mois jusqu'à résiliation.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques fournis sur un support immatériel dont l'exécution a commencé avec l'accord exprès du consommateur.
      </p>
      <p>
        En achetant un business plan, vous reconnaissez expressément que :
      </p>
      <ul>
        <li>L'exécution du service commence dès la confirmation du paiement</li>
        <li>Vous renoncez à votre droit de rétractation de 14 jours</li>
      </ul>
      <p>
        Pour les abonnements mensuels, vous pouvez résilier à tout moment depuis votre dashboard. La résiliation prend effet à la fin de la période en cours.
      </p>

      <h2>7. Garanties</h2>
      <p>
        Woblyn s'engage à fournir un service conforme à la description faite sur le site. Toutefois, les business plans générés sont des documents d'aide à la rédaction. Ils doivent être relus, vérifiés et adaptés par l'utilisateur avant toute utilisation officielle (banque, investisseur, administration).
      </p>
      <p>
        Woblyn ne garantit pas l'obtention d'un financement, d'un prêt bancaire ou d'un investissement sur la base des documents générés.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Woblyn ne peut être tenu responsable :
      </p>
      <ul>
        <li>Des décisions prises par l'utilisateur sur la base des documents générés</li>
        <li>Des inexactitudes éventuelles dans le contenu généré par l'IA</li>
        <li>Des conséquences financières liées à l'utilisation des business plans</li>
        <li>D'une interruption ponctuelle du service (maintenance, incident technique)</li>
      </ul>
      <p>
        En cas de défaillance avérée, la responsabilité de Woblyn est limitée au montant payé par l'utilisateur sur les 12 derniers mois.
      </p>

      <h2>9. Propriété intellectuelle</h2>
      <p>
        Les business plans générés appartiennent intégralement à l'utilisateur qui les a créés. Woblyn n'en revendique aucun droit.
      </p>
      <p>
        L'interface, le code source, le design et les fonctionnalités du site restent la propriété exclusive de Woblyn.
      </p>

      <h2>10. Données personnelles</h2>
      <p>
        Le traitement des données personnelles est régi par notre <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>11. Litiges</h2>
      <p>
        En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut d'accord, les tribunaux français seront seuls compétents. Le droit français est applicable.
      </p>
      <p>
        Conformément à l'article L.616-1 du Code de la consommation, l'utilisateur peut recourir gratuitement à un médiateur de la consommation. Plateforme européenne de règlement des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
      </p>
    </LegalLayout>
  )
}