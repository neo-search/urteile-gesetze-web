import Link from "next/link";
import backend from "../services/backend";

import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import Layout from "../layout/MainLayout";
// import css from "styled-jsx/css";
import { branding } from "../components/common/Constants";

// const contentStyles = css`
//   div.content {
//     background-color: white;
//     padding-top: 20px;
//     padding-bottom: 40px;
//   }

//   div.content div {
//     paddingtop: 20px;
//     paddingbottom: 20px;
//   }
// `;

const Gesetze = props => {
  const { gesetze } = props;
  const divList = gesetze.map(
    ({ abkuerzung = "", titel = "", kanonischeUrl }) => (
      <Link href={kanonischeUrl}>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <a href={kanonischeUrl}>{abkuerzung}</a>
          <br />
          {" " + titel}
        </div>
      </Link>
    )
  );

  return (
    <Layout
      title={`Gesetze und Verordnungen der Bundesrepublik Deutschland ${
        branding.seoname
      }`}
    >
      <div className="content">
        {/* <style jsx>{contentStyles}</style> */}
        <Container>
          <h1 style={{ paddingBottom: 70 }}>
            Gesetze und Verordnungen der Bundesrepublik Deutschland
          </h1>
          <Row>
            <Col md="10">{divList}</Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

Gesetze.getInitialProps = async function(props) {
  const { norms } = await backend.retrieveNorms();
  const gesetze = norms
    .sort(
      (a, b) =>
        isNaN(b.abkuerzung.slice(0, 1)) && !isNaN(a.abkuerzung.slice(0, 1))
          ? 1
          : a.abkuerzung.localeCompare(b.abkuerzung)
    )
    .map(n => ({
      abkuerzung: n.abkuerzung,
      titel: n.titel,
      kanonischeUrl: n.kanonischeUrl
    }));
  return { gesetze };
};

export default Gesetze;
