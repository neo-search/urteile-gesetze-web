import Head from "next/head";
import Link from "next/link";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import css from "styled-jsx/css";
import Banner from "../components/frontpage/Banner";
import Card from "../components/frontpage/card";
import Supportbanner from "../components/frontpage/Supportbanner";
import Layout from "../layout/MainLayout";

const styles = css`
  /*
   * Abstands-System (Best Practice: margin-bottom statt margin-top)
   * Jede section hat denselben Abstand nach unten (48px).
   * h2 hat keinen top-Margin – der section-Abstand übernimmt die Trennung.
   */

  .content-row {
    padding-top: 40px;
    padding-bottom: 64px;
  }

  section {
    margin-bottom: 48px;
  }

  section:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 13px;
    font-weight: 600;
    color: #666666; /* Kontrastverhältnis ~5.7:1 – erfüllt WCAG AA */
    margin-top: 0;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 2px solid #e8e8e8;
    padding-bottom: 8px;
  }

  .sidebar {
    border-left: 1px solid #e8e8e8;
    padding-left: 28px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 8px;
  }

  @media (max-width: 576px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .sidebar {
      border-left: none;
      padding-left: 0;
      border-top: 1px solid #e8e8e8;
      padding-top: 8px;
      margin-top: 8px;
    }
  }

  :global(a.chip:hover) {
    background-color: #1a3f7a;
    color: white;
  }
`;

// In Next.js 13+ rendert <Link> selbst ein <a> — kein child-<a> mehr nötig
const LabelLink = ({ href, as, children }) => (
  <Link
    href={href || as}
    as={as}
    className="chip"
    style={{
      display: "inline-block",
      marginRight: 8,
      marginBottom: 10,
      padding: "6px 14px",
      backgroundColor: "#e8eef8",
      color: "#1a3f7a",
      borderRadius: "999px",
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
      whiteSpace: "nowrap",
      textDecoration: "none",
      transition: "background-color 0.15s ease, color 0.15s ease",
    }}
  >
    {children}
  </Link>
);

const CardLink = ({ asHref, href, label, img, alt }) => (
  <Card
    label={label}
    asHref={asHref}
    href={href}
    imgsrc={img}
    alt={alt}
    title={alt}
  />
);

const renderSocialMetaData = () => {
  return (
    <>
      <Head>
        <meta name="msvalidate.01" content="C251808E1C75AD34739DB1A71F474DCA" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "http://schema.org",
              "@type": "Blog",
              "url": "https://blog.urteile-gesetze.de"
              }`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Urteile & Gesetze",
            "url": "https://urteile-gesetze.de",
            "sameAs": [
              "https://www.facebook.com/urteilegesetze/",
              "https://twitter.com/urteile_gesetze"
            ]}`,
          }}
        />
      </Head>
    </>
  );
};

// query kommt jetzt über getServerSideProps statt props.url (seit Next.js 9 entfernt)
export default function HomePage({ query }) {
  return (
    <Layout
      title="Urteile, Gesetze und Verordnungen der Bundesrepublik Deutschland"
      query={query}
      noSearchbar={true}
      description="Finden Sie Gesetze, Verordnungen und Entscheidungen der Bundesrepublik Deutschland. Aktuell und kostenlos bei urteile-gesetze.de"
      canonical="/"
    >
      {renderSocialMetaData()}
      <Banner />
      <Container>
        <style jsx>{styles}</style>
        <Supportbanner />
        <Row className="content-row">

          {/* Hauptspalte (links) */}
          <Col md={8} className="main-col">
            <section aria-labelledby="heading-opensource">
              <h2 id="heading-opensource">Open-Source</h2>
              <p>
                <em>Kostenfrei und Open Source!</em> urteile-gesetze.de ist das
                erste juristische Informationssystem unter einer Open Source Lizenz.
                Quellcode einfach forken und auf{" "}
                <a href="https://github.com/neo-search/urteile-gesetze-web/">
                  GitHub
                </a>{" "}
                ändern.
              </p>
            </section>

            <section aria-labelledby="heading-rechtsgebiete">
              <h2 id="heading-rechtsgebiete">Rechtsgebiete</h2>
              <div className="cards-grid">
                <CardLink asHref="/arbeitsrecht" href="/rechtsgebiet?landingpage=/arbeitsrecht" label="Arbeitsrecht" alt="Rechtsgebiet Arbeitsrecht" img="/assets/arbeitsrecht.svg" />
                <CardLink asHref="/sozialrecht" href="/rechtsgebiet?landingpage=/sozialrecht" label="Sozialrecht" alt="Rechtsgebiet Sozialrecht" img="/assets/sozialrecht.svg" />
                <CardLink asHref="/staats-verfassungsrecht" href="/rechtsgebiet?landingpage=/staats-verfassungsrecht" label="Staats- & Verfassungsrecht" alt="Rechtsgebiet Staats- und Verfassungsrecht" img="/assets/staatssrecht.svg" />
                <CardLink asHref="/steuerrecht" href="/rechtsgebiet?landingpage=/steuerrecht" label="Steuerrecht" alt="Rechtsgebiet Steuerrecht" img="/assets/steuerrecht.svg" />
                <CardLink asHref="/strafrecht" href="/rechtsgebiet?landingpage=/strafrecht" label="Strafrecht" alt="Rechtsgebiet Strafrecht" img="/assets/strafrecht.svg" />
              </div>
            </section>

            <section aria-labelledby="heading-urteile">
              <h2 id="heading-urteile">Letzte Urteile</h2>
              <nav aria-label="Urteile nach Gerichten">
                <LabelLink as="/bverfg">Bundesverfassungsgericht (BVerfG)</LabelLink>
                <LabelLink as="/bgh">Bundesgerichtshof (BGH)</LabelLink>
                <LabelLink as="/bverwg">Bundesverwaltungsgericht (BVerwG)</LabelLink>
                <LabelLink as="/bfh">Bundesfinanzhof (BFH)</LabelLink>
                <LabelLink as="/bag">Bundesarbeitsgericht (BAG)</LabelLink>
                <LabelLink as="/bsg">Bundessozialgericht (BSG)</LabelLink>
                <LabelLink as="/bpatg-entscheidungen">Bundespatentgericht (BPatG)</LabelLink>
                <LabelLink as="/gmsogb">Gemeinsamer Senat (GmS-OGB)</LabelLink>
                <LabelLink href="/themenbasierte-urteile" as="/themenbasierte-urteile">Urteile nach Themen</LabelLink>
              </nav>
              <p style={{ marginTop: 12, marginBottom: 0 }}>
                <a href="/gerichte">Alle Gerichte sehen →</a>
              </p>
            </section>
          </Col>

          {/* Sidebar (rechts) */}
          <Col md={4} className="sidebar">
            <section aria-labelledby="heading-gesetze">
              <h2 id="heading-gesetze">Wichtigste Gesetze</h2>
              <nav aria-label="Wichtigste Gesetze">
                <LabelLink as="/gesetze/bgb" href="/gesetz/?kanonischeUrl=/gesetze/bgb">BGB</LabelLink>
                <LabelLink as="/gesetze/stgb" href="/gesetz/?kanonischeUrl=/gesetze/stgb">StGB</LabelLink>
                <LabelLink as="/gesetze/zpo" href="/gesetz/?kanonischeUrl=/gesetze/zpo">ZPO</LabelLink>
                <LabelLink as="/gesetze/gg" href="/gesetz/?kanonischeUrl=/gesetze/gg">GG</LabelLink>
                <LabelLink as="/gesetze/hgb" href="/gesetz/?kanonischeUrl=/gesetze/hgb">HGB</LabelLink>
                <LabelLink as="/gesetze/stpo" href="/gesetz/?kanonischeUrl=/gesetze/stpo">StPO</LabelLink>
              </nav>
              <p style={{ marginTop: 12, marginBottom: 0 }}>
                <Link href="/gesetze">Alle Gesetze sehen →</Link>
              </p>
            </section>

            <section aria-labelledby="heading-neueste">
              <h2 id="heading-neueste">Neueste Gesetze</h2>
              <LabelLink as="/gesetze/mufklag" href="/gesetz/?kanonischeUrl=/gesetze/mufklag">MuFKlaG</LabelLink>
            </section>
          </Col>

        </Row>
      </Container>
    </Layout>
  );
}

export function getServerSideProps({ query }) {
  return {
    props: {
      query: query.query || null,
    },
  };
}
