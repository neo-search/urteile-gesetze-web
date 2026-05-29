import Link from "next/link";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import css from "styled-jsx/css";

const styles = css`
  footer {
    background-color: #1e2a3a;
    color: rgba(255, 255, 255, 0.7);
    padding-top: 48px;
    padding-bottom: 32px;
    font-size: 0.9rem;
  }

  .footer-col-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 14px;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  ul li {
    margin-bottom: 10px;
  }

  .footer-divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    margin: 36px 0 20px 0;
  }

  .footer-bottom {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }

  .brand {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: 'Crimson Pro', serif;
    margin-bottom: 8px;
    letter-spacing: 0.01em;
  }

  .brand-red {
    color: #c0392b;
  }

  .brand-blue {
    color: #6a93c8;
  }

  .brand-desc {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.5;
  }
`;

const linkStyle = {
  color: "rgba(255,255,255,0.75)",
  textDecoration: "none",
  transition: "color 0.15s ease",
};

export default () => (
  <footer>
    <style jsx>{styles}</style>
    <Container>
      <Row>
        <Col md={4} className="mb-4">
          <div className="brand">
            <span className="brand-red">Urteile </span>
            <span className="brand-blue">&amp; Gesetze</span>
          </div>
          <p className="brand-desc">
            Das erste juristische Informationssystem unter Open-Source-Lizenz.
            Täglich aktualisiert für die Bundesrepublik Deutschland.
          </p>
        </Col>

        <Col md={2} className="mb-4">
          <div className="footer-col-title" id="footer-legal">Rechtliches</div>
          <nav aria-labelledby="footer-legal">
            <ul>
              <li><Link href="/impressum" style={linkStyle}>Impressum</Link></li>
              <li><Link href="/datenschutz" style={linkStyle}>Datenschutz</Link></li>
            </ul>
          </nav>
        </Col>

        <Col md={2} className="mb-4">
          <div className="footer-col-title" id="footer-about">Über uns</div>
          <nav aria-labelledby="footer-about">
            <ul>
              <li><Link href="/unternehmen" style={linkStyle}>Unternehmen</Link></li>
            </ul>
          </nav>
        </Col>

        <Col md={4} className="mb-4">
          <div className="footer-col-title" id="footer-opensource">Open Source</div>
          <nav aria-labelledby="footer-opensource">
            <ul>
              <li>
                <a href="https://github.com/neo-search/urteile-gesetze-web/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>

      <hr className="footer-divider" />

      <Row>
        <Col>
          <p className="footer-bottom">
            © {new Date().getFullYear()} urteile-gesetze.de · Open Source unter freier Lizenz
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);
