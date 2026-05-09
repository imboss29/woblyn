import LegalLayout from '../LegalLayout'

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="9 mai 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site woblyn.com est édité par <strong>[NOM DE L'ENTREPRISE]</strong>.
      </p>
      <ul>
        <li><strong>Forme juridique :</strong> [À COMPLÉTER]</li>
        <li><strong>Numéro SIRET :</strong> [À COMPLÉTER]</li>
        <li><strong>Adresse :</strong> [À COMPLÉTER]</li>
        <li><strong>Email :</strong> contact@woblyn.com</li>
        <li><strong>Directeur de la publication :</strong> Corentin Leclerc</li>
      </ul>

      <h2>Hébergement</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li><strong>Vercel Inc.</strong></li>
        <li>340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
        <li>vercel.com</li>
      </ul>

      <h2>Base de données</h2>
      <p>Les données utilisateurs sont stockées sur :</p>
      <ul>
        <li><strong>Railway Corp.</strong></li>
        <li>2261 Market Street #4382, San Francisco, CA 94114, USA</li>
        <li>railway.app</li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur le site woblyn.com (textes, images, logo, design) sont la propriété exclusive de Woblyn et protégés par le droit d'auteur. Toute reproduction est interdite sans autorisation écrite préalable.
      </p>
      <p>
        Les business plans générés par l'IA appartiennent intégralement à l'utilisateur qui les a créés.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site, vous pouvez nous contacter à : <strong>contact@woblyn.com</strong>
      </p>
    </LegalLayout>
  )
}