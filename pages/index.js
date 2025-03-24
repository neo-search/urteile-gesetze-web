import Head from "next/head";
import Link from "next/link";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Banner from "../components/frontpage/Banner";
import Card from "../components/frontpage/card";
import Layout from "../layout/MainLayout";
import styles from "./IndexH2.module.css";

const LabelLink = ({ href, as, children }) => (
  <Link href={href} as={as || href}>
    <a
      style={{
        marginRight: 24,
        backgroundColor: "white",
        marginBottom: 18,
        border: "none",
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
      }}
    >
      {children}
    </a>
  </Link>
);

const CardLink = ({ asHref, href, label, img, alt }) => (
  <Col xs={6} sm={6} md={4} lg={3}>
    <Link as={asHref} href={href}>
      <div>
        <Card
          label={label}
          asHref={asHref}
          href={href}
          imgsrc={img}
          alt={alt}
          title={alt}
        />
      </div>
    </Link>
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
              "https://plus.google.com/116310509828182688093",
              "https://twitter.com/urteile_gesetze"
            ]}`,
          }}
        />
      </Head>
    </>
  );
};

export default (props) => {
  <p>
    Kostenfrei und Open Source! urteile-gesetze ist das erste juristische
    Informationssystem unter einer Open Source Lizenz.
  </p>;
  console.log(props);
  return (
    <Layout
      title="Urteile, Gesetze und Verordnungen der Bundesrepublik Deutschland"
      query={props.url.query.query}
      noSearchbar={true}
      description="Finden Sie Gesetze, Verordnungen und Entscheidungen der Bundesrepublik Deutschland. Aktuell und kostenlos bei urteile-gesetze.de"
      canonical="/"
    >
      {renderSocialMetaData()}
      <Banner />
      <Container>
        {/* <style jsx>{styles}</style> */}
        <div>
          <h2 className={styles.h2}>Open-Source</h2>
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
          <h2 className={styles.h2}>Rechtsgebiete</h2>
          <Row>
            <CardLink
              asHref="/arbeitsrecht"
              href="/rechtsgebiet?landingpage=/arbeitsrecht"
              label="Arbeitsrecht"
              alt="Rechtsgebiet Arbeitsrecht"
              img="/static/assets/arbeitsrecht.svg"
            />
            <CardLink
              asHref="/sozialrecht"
              href="/rechtsgebiet?landingpage=/sozialrecht"
              label="Sozialrecht"
              alt="Rechtsgebiet Sozialrecht"
              img="/static/assets/sozialrecht.svg"
            />
            <CardLink
              asHref="/staats-verfassungsrecht"
              href="/rechtsgebiet?landingpage=/staats-verfassungsrecht"
              label="Staats- & Verfassungrecht"
              alt="Rechtsgebiete Staats- & Verfassungrecht"
              img="/static/assets/staatssrecht.svg"
            />
            <CardLink
              asHref="/steuerrecht"
              href="/rechtsgebiet?landingpage=/steuerrecht"
              label="Steuerrecht"
              alt="Rechtsgebiet Steuerrecht"
              img="/static/assets/steuerrecht.svg"
            />
            <CardLink
              asHref="/strafrecht"
              href="/rechtsgebiet?landingpage=/strafrecht"
              label="Strafrecht"
              alt="Rechtsgebiet Strafrecht"
              img="/static/assets/strafrecht.svg"
            />
          </Row>
        </div>

        <div>
          <h2 className={styles.h2}>Letzte Urteile</h2>
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
          <Link as={`/urteile`} href={`/urteile`}>
            ...&nbsp;Alle Urteile sehen
          </Link>
        </div>

        <div>
          <h2 className={styles.h2}>Neueste Gesetze</h2>
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
          <h2 className={styles.h2}>Wichtigste Gesetze</h2>

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
          <Link href="/gesetze">
            <a>... Alle Gesetze sehen</a>
          </Link>
        </div>
      </Container>
    </Layout>
  );
};
