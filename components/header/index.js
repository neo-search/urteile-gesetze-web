import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
// import css from "styled-jsx/css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

// const styles = css`
//   header {
//     background-color: white;
//     position: fixed;
//     width: 100%;
//     z-index: 100;
//     color: white;
//     box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1),
//       0 3px 1px 0 rgba(20, 23, 28, 0.1);
//   }
//   nav.urteile-gesetze-header {
//     padding: 8px 16px;
//   }
// `;

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const renderSearchBar = (noSearchBar, query) => {
  if (noSearchBar) return;
  return (
    <Col sm="5" md="6" lg="7" style={{marginBottom:8}}>
      <SearchBar query={query} />
    </Col>
  );
};

const renderLogo = (noSearchBar) => {
  if (noSearchBar) {
    return (
      <Col sm="10" md="10" lg="10" style={{ marginBottom: 8 }}>
        <Link href="/">
            <Logo />
          </Link>
      </Col>
    )
  }
  else {
    return (
      <Col sm="5" md="4" lg="3" style={{ marginBottom: 8 }}>
        <Link href="/">
            <Logo />
          </Link>
      </Col>
    );
  }
};

export default ({ query, noSearchBar }) => (
  <header>
    <style jsx>{styles}</style>
    <nav className="urteile-gesetze-header">
      <Row>
        {renderLogo(noSearchBar)}
        {renderSearchBar(noSearchBar, query)}
        <Col sm="2" md="2" lg="2" className="d-sm-block d-md-block hidden-xs-down d-none">
          <a href="https://blog.urteile-gesetze.de" className="btn btn-secondary">Neues</a>
        </Col>
      </Row>
    </nav>
  </header>
);
