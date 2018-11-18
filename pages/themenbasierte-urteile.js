import Link from "next/link";
import Layout from "../layout/MainLayout";
import Container from "reactstrap/lib/Container";
import landingPagesJson from "../data/queries-landingpages.json";
import css from "styled-jsx/css";
import { branding } from "../components/common/Constants";

const contentStyles = css`
  div.content {
    background-color: white;
    padding-top: 20px;
    padding-bottom: 40px;
  }

  div.content div {
    paddingtop: 20px;
    paddingbottom: 20px;
  }

  li {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const asLink = urteil =>
  "/" +
  urteil
    .toLowerCase()
    .split(" ")
    .join("-")
    .split("ö")
    .join("oe")
    .split("ä")
    .join("ae")
    .split("ü")
    .join("ue")
    .split("ß")
    .join("ss") +
  "-urteile";

const renderLinks = () => {
  const urteile = landingPagesJson["urteile"];
  return urteile.map(e => (
    <li>
      <style jsx>{contentStyles}</style>
      <Link href={asLink(e)}>{e}</Link>
    </li>
  ));
};

export default () => {
  return (
    <Layout title={`Urteile nach Themen ${branding.seoname}`}>
      <div className="content">
        <style jsx>{contentStyles}</style>
        <Container>
          <h1>Urteile nach Themen</h1>
          <ul>{renderLinks()}</ul>
        </Container>
      </div>
    </Layout>
  );
};
