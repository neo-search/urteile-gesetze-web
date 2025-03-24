import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

import Urteil from "../components/document/Urteil";
import UrteilHeader from "../components/document/UrteilHeader";
import Layout from "../layout/MainLayout";
// import css from "styled-jsx/css";
import backend from "../services/backend";

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

const RechtsprechungPage = ({ doc, pdf }) => {
  const { seoDescription } = doc;
  const { entscheidungsdatum, gericht, aktenzeichen } = doc.rechtsprechungInfo;

  const firstAktenzeichen = aktenzeichen.replace(/.*\,/, "");
  return (
    <Layout
      title={`${firstAktenzeichen} - Urteil ${gericht} vom ${entscheidungsdatum}`}
      description={`${seoDescription}`}
      canonical={doc.kanonischeUrl}
      nosearchbar={pdf}
    >
      <div>
        <Container>
          <UrteilHeader doc={doc} />
        </Container>
      </div>

      <div className="content">
        {/* <style jsx>{contentStyles}</style> */}
        <Container>
          <Row>
            <Col md="10">
              <Urteil doc={doc} />
            </Col>
          </Row>
          {renderAltLink(doc)}
        </Container>
      </div>
    </Layout>
  );
};

RechtsprechungPage.getInitialProps = async function(props) {
  // http://localhost:3000/rechtsprechung/xii%20zb%20583-15
  const { kanonischeUrl } = props.query;
  if (kanonischeUrl) {
    try {
      const doc = await backend.retrieveDoc(kanonischeUrl);
      return { ...doc, pageName: "/rechtsprechung" };
    } catch (e) {
      props.res.statusCode = 404;
      props.res.end(
        "Dieses Dokument befindet sich nicht mehr in unserer Datenbank."
      );
      console.error(
        "Error /rechtsprechung: Dokument wurde nicht gefunden ",
        kanonischeUrl,
        `, HTTP StatusCode :${e.response.status}`,
        `, HTTP StatusText: ${e.response.statusText}`
      );
    }
  }
};

export default RechtsprechungPage;
