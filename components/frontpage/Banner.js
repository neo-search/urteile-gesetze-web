import css from "styled-jsx/css";

import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import SearchBar from "../common/SearchBar";

const styles = css`
  div.banner {
    padding: 0 20px 0px 20px;
  }
  h1 {
    font-size: 16px;
    font-weight: 400;
    height: 80px;
    display: table-cell;
    vertical-align: middle;
    padding: 18px;
    padding: 26px;
    text-align: center;
  }
  a {
    color: white;
  }
  p {
    font-size: 0.9rem;
  }
`;
export default () => (
  <div className="banner">
    <style jsx>{styles}</style>
    <Container>
      <Row>
        <h1>
          Aktuelle Gesetze und aktuelle Rechtsprechung. Open Source. Tägliches
          Update der Datenbank mit über <b>133.978</b> juristischen Dokumenten
          für die Bundesrepublik Deutschland.
        </h1>
      </Row>
      <Row style={{ marginTop: 45 }}>
        <Col md={{ size: 6, offset: 3 }}>
          <SearchBar light />
        </Col>
      </Row>
      <Row style={{ marginTop: 90 }} />
    </Container>
  </div>
);
