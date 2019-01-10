import React from "react";
import SucheComponent from "../components/suche";
import landingPagesJson from "../data/landingpages.json";
import backend from "../services/backend";
import Layout from "../layout/MainLayout";

const Gericht = props => {
  const { title, description, canonical } = props.pageMetaInfo;
  const { query } = props.searchRequest;
  return (
    <Layout
      title={title}
      description={description}
      canonical={canonical}
      query={query}
    >
      <SucheComponent {...props} />
    </Layout>
  );
};

Gericht.getInitialProps = async function(props) {
  const { landingpage, p } = props.query;
  const {
    q,
    filter = {},
    title,
    description,
    image,
    canonical = landingpage,
    page,
    h1
  } = landingPagesJson[landingpage];

  const searchResult = await backend.search({
    query: q,
    page: p,
    filter: {
      docTypes: filter.d,
      gerichte: filter.g,
      jahre: filter.j,
      rechtsgebiete: filter.r
    }
  });

  return {
    searchResult,
    searchRequest: {
      query: q,
      page: p,
      filter
    },
    pageMetaInfo: {
      title,
      description,
      h1,
      canonical,
      pageName: "/gericht",
      landingpage
    }
  };
};

export default Gericht;
