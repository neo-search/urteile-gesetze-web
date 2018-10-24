import Link from "next/link";
import Layout from "../layout/MainLayout";
import Banner from "../components/frontpage/Banner";
import Card from "../components/frontpage/card";
import css from "styled-jsx/css";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import GitHubSvg from "../components/icons/GitHubSvg";

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
        lineHeight: 1.5
        // borderRadius: ".25rem"
      }}
    >
      {children}
    </a>
    {/* </Label> */}
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

export default props => {
  <p>
    Kostenfrei und Open Source!. urteile-gesetze ist das erste juristische
    Informationssystem unter einer Open Source Lizenz
  </p>;
  return (
    <Layout
      title="Urteile, Gesetze und Verordnungen der Bundesrepublik Deutschland"
      query={props.url.query.query}
      noSearchbar={true}
      description="Finden Sie Gesetze, Verordnungen und Entscheidungen der Bundesrepublik Deutschland. Aktuell und kostenlos bei urteile-gesetze.de"
      canonical="/"
    >
      <Banner />
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
          <h2>Letze Urteile</h2>
          <LabelLink as="/bverfg">Bundesverfassungsgericht (BVerfG)</LabelLink>
          <LabelLink as="/bgh">Bundesgerichtshof (BGH)</LabelLink>
          <LabelLink as="/bverwg">Bundesverwaltungsgericht (BVerwG)</LabelLink>
          <LabelLink as="/bfh">Bundesfinanzhof (BFH)</LabelLink>
          <LabelLink as="/bag">Bundesarbeitsgericht (BAG)</LabelLink>
          <LabelLink as="/bsg">Bundessozialgericht (BSG)</LabelLink>
          <LabelLink as="/bpatg">Bundespatentgericht (BPatG)</LabelLink>
          <LabelLink as="/gmsogb">Gemeinsamer Senat (GmS-OGB)</LabelLink>
          <LabelLink
            href="/themenbasierte-urteile"
            as="/themenbasierte-urteile"
          >
            Urteile nach Themen
          </LabelLink>
          <a href="/gerichte">...&nbsp;Alle Gerichte sehen</a>
          {/* <Link as={`/urteile`} href={`/suche?d=r`}>
            ...&nbsp;Alle Urteile sehen
          </Link> */}
          <p />
          <Link as={`/urteile`} href={`/urteile`}>
            ...&nbsp;Alle Urteile sehen
          </Link>
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
            as="/gesetze/inso"
            href="/gesetz/?kanonischeUrl=/gesetze/inso"
          >
            InsO
          </LabelLink>
          <LabelLink
            as="/gesetze/hgb"
            href="/gesetz/?kanonischeUrl=/gesetze/hgb"
          >
            HGB
          </LabelLink>
          <LabelLink
            as="/gesetze/ustg"
            href="/gesetz/?kanonischeUrl=/gesetze/ustg"
          >
            UStG
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

        <div>
          <h2>Neueste Trends</h2>
          <LabelLink href="/dsgvo">
            <b>DSGVO</b>
            <br />
            Datenschutzgrundverordnung
          </LabelLink>
        </div>
      </Container>
    </Layout>
  );
};
