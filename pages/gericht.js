import React from "react";
import Suche from "../components/suche";
import landingPagesJson from "../data/landingpages.json";
import backend from "../services/backend";
import Layout from "../layout/MainLayout";

const Gericht = ({ pageMetaInfo, searchRequest, searchResult }) => {
  const { title, description, canonical } = pageMetaInfo;
  const { query, page } = searchRequest;

  const canonicalWithPaging = page ? `${canonical}&p=${page}` : canonical;
  return (
    <Layout
      title={title}
      description={description}
      canonical={canonicalWithPaging}
      query={query}
    >
      <Suche
        searchRequest={searchRequest}
        searchResult={searchResult}
        pageMetaInfo={pageMetaInfo}
      />
    </Layout>
  );
};

Gericht.getInitialProps = async function(props) {
  let { landingpage, p } = props.query;
  if (!landingpage && props.asPath)
    landingpage = props.asPath.replace(/\?.*/, "");
  debugger;
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

  debugger;
  // const canonicalWithPaging = p ? `${landingpage}&p=${p}` : landingpage;
  const canonicalWithPaging = `${landingpage}`;

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
      canonical: landingpage,
      pageName: "/gericht"
    }
  };
};

export default Gericht;
