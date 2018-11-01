import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Section from "../components/document/Section";
import SectionHeader from "../components/document/SectionHeader";
import Layout from "../layout/MainLayout";
import css from "styled-jsx/css";
import backend from "../services/backend";
import { branding } from "../components/common/Constants";
import Error from "./_error";
import titleGenerator from "../services/titleGenerator";

const contentStyles = css`
  div.content {
    background-color: white;
    padding-top: 20px;
    padding-bottom: 40px;
  }
`;

const renderAltLink = doc => {
  if (process.env.NODE_ENV !== "production")
    return (
      <Row>
        <Col md="10">
          <p style={{ fontSize: 10 }}>
            <a
              target="_blank"
              href={"http://urteile-gesetze.de/" + doc.kanonischeUrl}
            >
              Alt
            </a>
          </p>
        </Col>
      </Row>
    );
};

const computeGesetzTitle = (kurzueberschrift, titel, abkuerzung) => {
  const maxTitelSize = 72 - `${abkuerzung} |  ${branding.seoname}`.length;

  if (kurzueberschrift && kurzueberschrift.length <= maxTitelSize)
    return kurzueberschrift;
  if (titel && titel.length <= maxTitelSize) return kurzueberschrift;

  let gesetzTitle = kurzueberschrift
    ? kurzueberschrift.substring(
        0,
        Math.min(kurzueberschrift.length, maxTitelSize)
      )
    : titel.substring(0, Math.min(titel.length, maxTitelSize));

  gesetzTitle = kurzueberschrift.substring(
    0,
    Math.min(gesetzTitle.length, gesetzTitle.lastIndexOf(" "))
  );
  return gesetzTitle;
};

const computeLayoutTitel = (abkuerzung, abkuerzungNorm, titel) => {
  if (!titel || titel == "")
    return `${abkuerzung} ${abkuerzungNorm} ${branding.seoname}`;

  const length = `${abkuerzung} ${abkuerzungNorm} |  ${branding.seoname}`
    .length;

  const sectionTitel = titleGenerator.title(titel, length);

  return `${abkuerzung} ${abkuerzungNorm} | ${sectionTitel} ${
    branding.seoname
  }`;
};

const SectionPage = ({ doc, errorCode, zitierendeUrteile }) => {
  if (errorCode) return <Error statusCode={errorCode} />;

  const { seoDescription, titel } = doc;
  const { abkuerzung, abkuerzungNorm, smallNorm, kanonischeUrlNorm } = doc.sectionInfo;

  const layoutTitel = computeLayoutTitel(abkuerzung, abkuerzungNorm, titel);
  const kanonischeUrl = smallNorm ? kanonischeUrlNorm : doc.kanonischeUrl;
  return (
    <Layout
      title={layoutTitel}
      description={seoDescription}
      canonical={kanonischeUrl}
    >
      <div>
        <Container>
          <SectionHeader doc={doc} />
        </Container>
      </div>

      <div className="content">
        <style jsx>{contentStyles}</style>
        <Container>
          <Row>
            <Col md="10">
              <Section doc={doc} zitierendeUrteile={zitierendeUrteile} />
            </Col>
          </Row>
          {renderAltLink(doc)}
        </Container>
      </div>
    </Layout>
  );
};

SectionPage.getInitialProps = async function(props) {
  const { kanonischeUrl } = props.query;

  if (kanonischeUrl) {
    try {
      const doc = await backend.retrieveDoc(kanonischeUrl);

      const { abkuerzungNorm, abkuerzung } = doc.doc.sectionInfo;
      const query = abkuerzung
        ? `${abkuerzungNorm} ${abkuerzung}`
        : abkuerzungNorm;

      const zitierendeUrteile = await backend.search({
        query: query,
        page: 0,
        filter: {
          docTypes: ["r"],
          gerichte: [],
          rechtsgebiete: []
        },
        anzahlDerErgebnisse: 6
      });

      return {
        ...doc,
        pageName: "/section",
        zitierendeUrteile: zitierendeUrteile.docs
      };
    } catch (e) {
      console.error(
        "Error /section: Dokument wurde nicht gefunden ",
        kanonischeUrl,
        `, HTTP StatusCode :${e.response.status}`,
        `, HTTP StatusText: ${e.response.statusText}`
      );
      return { errorCode: 404 };
    }
  }
};

export default SectionPage;
