import css from "styled-jsx/css";
import Container from "reactstrap/lib/Container";
import SearchBar from "../common/SearchBar";

const styles = css`
  .banner {
    background-color: white;
    padding: 56px 20px 48px;
    text-align: center;
    border-bottom: 1px solid #eef0f3;
  }

  .site-title {
    font-size: 3.4rem;
    font-weight: 600;
    font-family: 'Crimson Pro', serif;
    line-height: 1.05;
    margin: 0 0 16px;
    letter-spacing: 0;
  }

  .site-title-red  { color: #c0392b; }
  .site-title-blue { color: #1a3f7a; }

  .subtitle {
    font-size: 1rem;
    color: #666;
    margin: 0 auto 36px;
    max-width: 480px;
    line-height: 1.6;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
  }

  .search-wrap {
    max-width: 580px;
    margin: 0 auto;
  }

  @media (max-width: 576px) {
    .site-title { font-size: 2.4rem; }
    .banner { padding: 36px 16px 32px; }
  }
`;

export default () => (
  <div className="banner">
    <style jsx>{styles}</style>
    <Container>
      <h1 className="site-title">
        <span className="site-title-red">Urteile </span>
        <span className="site-title-blue">&amp; Gesetze</span>
      </h1>
      <p className="subtitle">
        Gesetze und Rechtsprechung der Bundesrepublik Deutschland –
        kostenlos, Open Source, täglich aktualisiert.
      </p>
      <div className="search-wrap">
        <SearchBar light />
      </div>
    </Container>
  </div>
);
