import Layout from '../layout/MainLayout'
import Container from 'reactstrap/lib/Container'

import { branding } from '../components/common/Constants'

export default () => (
  <Layout
    title={`Über uns ${branding.seoname}`}
    description="neoSearch UG (haftungsbeschränkt) entwickelt Web- und mobile Angebote
  rund um das Thema Informationssuche."
  >
    <Container>
      <h1>Über uns</h1>

      <h2>Das Unternehmen</h2>
      <p>
        neoSearch UG (haftungsbeschränkt) entwickelt Web- und mobile Angebote
        rund um das Thema Informationssuche.
      </p>
      <p>Gerne helfen wir Ihnen bei Ihrem Projekt weiter!</p>

      <h2>Weitere Profile im Netz</h2>
      <p>
        Wir sind auch in verschiedenen Netzwerke im Internet vertreten. Hier
        unsere Online-Profile
      </p>
      <ul>
        <li>
          <a href="https://www.lto.de/autoren/name/daniel-beck/">
            Urteile & Gesetze Profil bei Legal Tribune Online
          </a>
        </li>
        <li>
          <a href="https://plus.google.com/u/0/116310509828182688093">
            Urteile & Gesetze Google+ Community
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/urteilegesetze/">
            Urteile & Gesetze Facebook Seite
          </a>
        </li>
        <li>
          <a href="https://twitter.com/urteile_gesetze">
            Urteile & Gesetze Twitter
          </a>
        </li>
      </ul>
    </Container>
  </Layout>
)
