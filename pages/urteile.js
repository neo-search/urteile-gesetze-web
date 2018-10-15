import axios from "axios";
import React from "react";
import SucheComponent from "../components/suche";
import landingPagesJson from "../data/landingpages.json";
import backend from "../services/backend";
import Layout from "../layout/MainLayout";

import { branding } from "../components/common/Constants";
const Urteile = props => {
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

Urteile.getInitialProps = async function(props) {
  const { p } = props.query
  
  // const {
  //   q,
  //   filter = {},
  //   title,
  //   description,
  //   image,
  //   canonical,
  //   page
  // } = landingPagesJson[landingpage]
  
  const searchResult = await backend.search({
    query: null,
    canonical: "/urteile",
    page: p,
    filter: {
      docTypes: ["r"],
      gerichte: [],
      rechtsgebiete: []
    }
  });

  return {
    searchResult,
    searchRequest: {
      query: null,
      page: p,
      filter: { d: "r" }
    },
    pageMetaInfo: {
      title: `Urteile der Bundesgerichte ${branding.seoname}`,
      description: "Verfolgen Sie die aktuellsten Urteile der Bundesgerichte.",
      canonical: '/urteile',
      pageName: '/urteile'
    }
  };
};

export default Urteile;
