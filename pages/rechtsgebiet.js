import React from "react";
import SucheComponent from "../components/suche";
import landingPagesJson from "../data/landingpages.json";
import backend from "../services/backend";
import Layout from "../layout/MainLayout";
import { branding } from "../components/common/Constants";

const Suche = props => {
  const { title, description } = props.pageMetaInfo;
  const { query } = props.searchRequest;
  return (
    <Layout title={title} description={description} query={query}>
      <SucheComponent {...props} /> 
    </Layout>
  );
};

function normalizeParam(param) {
  return typeof param === "string" ? [param] : param;
}

async function retrieveSearchResults(searchRequest) {
  const {
    q: query,
    d: docTypes,
    g: gesetze,
    p: page,
    r: rechtsgebiete,
    j: jahre
  } = searchRequest;

  const body = {
    query,
    page: p,
    sortType: "relevanz",
    anzahlDerErgebnisse: 20,
    filter: {
      docTypes: normalizeParam(docTypes),
      gerichte: normalizeParam(gesetze),
      rechtsgebiete: normalizeParam(rechtsgebiete),
      jahre: normalizeParam(jahre)
    }
  };

  const { docs, docCount, aggregations } = await backend.search(body);
  return { docs, docCount, aggregations };
}

Suche.getInitialProps = async function(props) {
  const { landingpage, p } = props.query;

  const {
    q,
    filter = {},
    title,
    description,
    image,
    h1,
    canonical,
    page
  } = landingPagesJson[landingpage];

  const searchResult = await backend.search({
    query: q,
    page: p,
    filter: {
      docTypes: filter.d,
      gerichte: filter.g,
      rechtsgebiete: filter.r,
      jahre: filter.j
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
      title: `${title} ${branding.seoname}`,
      h1,
      description,
      canonical,
      pageName: "/rechtsgebiet",
      landingpage
    }
  };
};

export default Suche;
