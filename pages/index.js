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
  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #888888;
    font-weight: normal;
    margin-top: 55px;
    text-transform: uppercase;
  }
`;

// In Next.js 13+ rendert <Link> selbst ein <a> — kein child-<a> mehr nötig
const LabelLink = ({ href, as, children }) => (
  <Link
    href={href || as}
    as={as}
    style={{
      marginRight: 24,
      backgroundColor: "white",
      marginBottom: 18,
      boxShadow: "0px 1px 1px grey",
      color: "#014fa4",
      display: "inline-block",
      fontWeight: 400,
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      userSelect: "none",
      border: "1px solid transparent",
      padding: ".375rem .75rem",
      fontSize: "1rem",
      lineHeight: 1.5,
      textDecoration: "none",
    }}
  >
    {children}
  </Link>
);

const CardLink = ({ asHref, href, label, img, alt }) => (
  <Col xs={6} sm={6} md={4} lg={3}>
    <Card
      label={label}
      asHref={asHref}
      href={href}
      imgsrc={img}
      alt={alt}
      title={alt}
    />
  </Col>
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
        <Row>
          <Col>
            <Supportbanner></Supportbanner>
          </Col>
        </Row>
      </Container>
      <Container>
        <style jsx>{styles}</style>
        <div>
          <h2>Open-Source</h2>
          <p>
            <em>Kostenfrei und Open Source!</em> urteile-gesetze.de ist das
            erste juristische Informationssystem unter einer Open Source Lizenz.
            Quellcode einfach forken und auf{" "}
            <a href="https://github.com/neo-search/urteile-gesetze-web/">
              GitHub
            </a>{" "}
            ändern.
          </p>
        </div>
        <div>
          <h2>Rechtsgebiete</h2>
          <Row>
            <CardLink
              asHref="/arbeitsrecht"
              href="/rechtsgebiet?landingpage=/arbeitsrecht"
              label="Arbeitsrecht"
              alt="Rechtsgebiet Arbeitsrecht"
              img="/assets/arbeitsrecht.svg"
            />
            <CardLink
              asHref="/sozialrecht"
              href="/rechtsgebiet?landingpage=/sozialrecht"
              label="Sozialrecht"
              alt="Rechtsgebiet Sozialrecht"
              img="/assets/sozialrecht.svg"
            />
            <CardLink
              asHref="/staats-verfassungsrecht"
              href="/rechtsgebiet?landingpage=/staats-verfassungsrecht"
              label="Staats- & Verfassungrecht"
              alt="Rechtsgebiete Staats- & Verfassungrecht"
              img="/assets/staatssrecht.svg"
            />
            <CardLink
              asHref="/steuerrecht"
              href="/rechtsgebiet?landingpage=/steuerrecht"
              label="Steuerrecht"
              alt="Rechtsgebiet Steuerrecht"
              img="/assets/steuerrecht.svg"
            />
            <CardLink
              asHref="/strafrecht"
              href="/rechtsgebiet?landingpage=/strafrecht"
              label="Strafrecht"
              alt="Rechtsgebiet Strafrecht"
              img="/assets/strafrecht.svg"
            />
          </Row>
        </div>

        <div>
          <h2>Letzte Urteile</h2>
          <LabelLink as="/bverfg">Bundesverfassungsgericht (BVerfG)</LabelLink>
          <LabelLink as="/bgh">Bundesgerichtshof (BGH)</LabelLink>
          <LabelLink as="/bverwg">Bundesverwaltungsgericht (BVerwG)</LabelLink>
          <LabelLink as="/bfh">Bundesfinanzhof (BFH)</LabelLink>
          <LabelLink as="/bag">Bundesarbeitsgericht (BAG)</LabelLink>
          <LabelLink as="/bsg">Bundessozialgericht (BSG)</LabelLink>
          <LabelLink as="/bpatg-entscheidungen">
            Bundespatentgericht (BPatG)
          </LabelLink>
          <LabelLink as="/gmsogb">Gemeinsamer Senat (GmS-OGB)</LabelLink>
          <LabelLink
            href="/themenbasierte-urteile"
            as="/themenbasierte-urteile"
          >
            Urteile nach Themen
          </LabelLink>
          <a href="/gerichte">...&nbsp;Alle Gerichte sehen</a>
          <p />
          <Link href="/urteile">...&nbsp;Alle Urteile sehen</Link>
        </div>

        <div>
          <h2>Neueste Gesetze</h2>
          <LabelLink
            as="/gesetze/mufklag"
            href="/gesetz/?kanonischeUrl=/gesetze/mufklag"
          >
            <b>MuFKlaG</b>
            <br />
            Musterfeststellungsklage
          </LabelLink>
        </div>

        <div>
          <h2>Wichtigste Gesetze</h2>
          <LabelLink
            as="/gesetze/bgb"
            href="/gesetz/?kanonischeUrl=/gesetze/bgb"
          >
            BGB
          </LabelLink>
          <LabelLink
            as="/gesetze/stgb"
            href="/gesetz/?kanonischeUrl=/gesetze/stgb"
          >
            StGB
          </LabelLink>
          <LabelLink
            as="/gesetze/zpo"
            href="/gesetz/?kanonischeUrl=/gesetze/zpo"
          >
            ZPO
          </LabelLink>
          <LabelLink as="/gesetze/gg" href="/gesetz/?kanonischeUrl=/gesetze/gg">
            GG
          </LabelLink>
          <LabelLink
            as="/gesetze/hgb"
            href="/gesetz/?kanonischeUrl=/gesetze/hgb"
          >
            HGB
          </LabelLink>
          <LabelLink
            as="/gesetze/stpo"
            href="/gesetz/?kanonischeUrl=/gesetze/stpo"
          >
            StPO
          </LabelLink>
          <p />
          <Link href="/gesetze">... Alle Gesetze sehen</Link>
          <p />
          unsere selbst entworfenen{" "}
          <a href="https://moppenstedt.de/collections/urkunden-zum-selbst-beschriften">
            Urkunden
          </a>{" "}
          und{" "}
          <a href="https://moppenstedt.de/collections/kinderurkunden">
            Kinderurkunden
          </a>{" "}
          bei moppenstedt.de entdecken.
        </div>
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
