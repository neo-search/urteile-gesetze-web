import Link from "next/link";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import css from "styled-jsx/css";

const styles = css`
  footer {
    // background-color: #515151;
    background: repeating-linear-gradient(
      45deg,
      #414141,
      #414141 10px,
      #515151 10px,
      #515151 20px
    );
    color: white;
    min-height: 200px;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  a {
    color: white;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  ul li {
    display: inline;
    padding-right: 10px;
  }
`;
export default () => (
  <footer>
    <style jsx>{styles}</style>
    <Container>
      <Row>
        <Col md={{ size: 4 }}>
          <Link href="/impressum">
            <a>Impressum</a>
          </Link>
        </Col>
        <Col md={{ size: 4 }}>
          <Link href="/unternehmen">
            <a>Über uns</a>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={{ size: 4 }}>
          <Link href="/datenschutz">
            <a>Datenschutz</a>
          </Link>
        </Col>
      </Row>
    </Container>
  </footer>
);
