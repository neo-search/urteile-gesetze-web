import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";

// import css from "styled-jsx/css";
import Norm from "../components/document/Norm";
import NormHeader from "../components/document/NormHeader";
import Layout from "../layout/MainLayout";
import backend from "../services/backend";
import serpGenerator from "../services/serpGenerator";

// const contentStyles = css`
//   div.content {
//     background-color: white;
//     padding-top: 20px;
//     padding-bottom: 40px;
//   }
// `;

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
  if (kurzueberschrift) return `${kurzueberschrift} (${abkuerzung})`;

  const langTitel = `${abkuerzung} | ${titel}`;
  return serpGenerator.title(langTitel);
};

const GesetzPage = ({ doc, zitierendeUrteile }) => {
  const { titel, abkuerzung, kurzueberschrift } = doc;

  const gesetzTitle = computeGesetzTitle(kurzueberschrift, titel, abkuerzung);

  const description = serpGenerator.description();
  return (
    <Layout
      title={gesetzTitle}
      description={doc.description}
      // canonical={doc.kanonischeUrl}
    >
      <div>
        <Container>
          <NormHeader doc={doc} />
        </Container>
      </div>

      <div className="content">
        {/* <style jsx>{contentStyles}</style> */}
        <Container>
          <Row>
            <Col md="10">
              <Norm doc={doc} zitierendeUrteile={zitierendeUrteile} />
            </Col>
          </Row>
          {renderAltLink(doc)}
        </Container>
      </div>
    </Layout>
  );
};

GesetzPage.getInitialProps = async function(props) {
  const { kanonischeUrl } = props.query;

  if (kanonischeUrl) {
    try {
      const doc = await backend.retrieveDoc(kanonischeUrl);
      let zitierendeUrteile = undefined;
      if (doc.smallNorm && doc.smallNorm === true) {
        zitierendeUrteile = await backend.search({
          query: kanonischeUrl,
          page: 0,
          filter: {
            docTypes: ["r"],
            gerichte: [],
            rechtsgebiete: []
          },
          anzahlDerErgebnisse: 6
        });
      }
      return { ...doc, pageName: "/gesetz", zitierendeUrteile };
    } catch (e) {
      props.res.statusCode = 404;
      props.res.end(
        "Dieses Dokument befindet sich nicht mehr in unserer Datenbank."
      );

      if (!e.response) console.error(e);
      else
        console.error(
          "Error /gesetz: Dokument wurde nicht gefunden ",
          kanonischeUrl,
          `HTTP StatusCode :${e.response.status}`,
          `HTTP StatusText: ${e.response.statusText}`
        );
    }
  }
};

export default GesetzPage;
