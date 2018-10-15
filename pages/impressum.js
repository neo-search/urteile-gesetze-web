import Link from "next/link";
import Layout from "../layout/MainLayout";
import Container from "reactstrap/lib/Container";
import { branding } from "../components/common/Constants";

export default () => (
  <Layout
    title={`Impressum ${branding.seoname}`}
    description="Impressum-Angaben der Urteile und Gesetze Datenbank - Urteile und Gesetze"
  >
    <Container>
      <h1>Impressum</h1>

      <p>Seitenbetreiber i.S.d. § 5 TMG:</p>
      <p>
        neoSearch UG (haftungsbeschränkt)<br /> Dieselstraße 13<br />
        66123 Saarbrücken<br />
      </p>
      <p>
        Telefon: 06819406422<br />E-Mail:{" "}
        <a href="mailto:info@neosearch.de">info@neosearch.de</a>
        <br />
        Internet: <a href="http://www.neosearch.de">www.neosearch.de</a>
      </p>
      <p>
        Handelsregister:<br /> Registergericht: <b>Amtsgericht Saarbrücken</b>
        <br />
        Registernummer: <b>HRB 104011</b>
      </p>
      <p>
        Geschäftsführer:<br />
        <b>Karin Beck</b>
        <br />
        <b>Daniel Beck</b>
      </p>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        <b>DE313019254</b>
      </p>
      <p>
        Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV:<br /> Daniel Beck<br />{" "}
        (Anschrift wie oben)
      </p>
      <p>
        Impressum erstellt durch:<br /> © IT-Recht-Kanzlei DURY –{" "}
        <a href="http://www.dury.de">www.dury.de</a>
        <br /> © Website-Check GmbH –{" "}
        <a href="http://www.website-check.de">www.website-check.de</a>
      </p>
    </Container>
  </Layout>
);
