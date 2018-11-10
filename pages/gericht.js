import React from "react";
import SucheComponent from "../components/suche";
import landingPagesJson from "../data/landingpages.json";
import backend from "../services/backend";
import Layout from "../layout/MainLayout";
import { branding } from "../components/common/Constants";

const Gericht = props => {
  const { title, description } = props.pageMetaInfo;
  return (
    <Layout title={title} description={description}>
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
    r: rechtsgebiete
  } = searchRequest;

  const body = {
    query,
    page: p,
    sortType: "relevanz",
    anzahlDerErgebnisse: 20,
    filter: {
      docTypes: normalizeParam(docTypes),
      gerichte: normalizeParam(gesetze),
      rechtsgebiete: normalizeParam(rechtsgebiete)
    }
  };

  const { docs, docCount, aggregations } = await backend.search(body);
  return { docs, docCount, aggregations };
}

Gericht.getInitialProps = async function(props) {
  const { landingpage, p } = props.query;
  const {
    q,
    filter = {},
    title,
    description,
    image,
    canonical,
    page,
    h1
  } = landingPagesJson[landingpage];

  const searchResult = await backend.search({
    query: q,
    page: p,
    filter: {
      docTypes: filter.d,
      gerichte: filter.g,
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
