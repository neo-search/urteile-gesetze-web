const axios = require("axios");
const config = require("../next.config");
const moment = require("moment");

const RECHSTSPRECHUNG = "rechtsprechung";
const GESETZE = "gesetze";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://urteile-gesetze.de"
    : "http://localhost:3000";

const backendUrl = config.publicRuntimeConfig.backendUrl + "/search";

const isOnlyRechtsprechung = filter =>
  filter && arraysEqual(filter.categories, [RECHSTSPRECHUNG]);

const isOnlyGesetze = filter =>
  filter && arraysEqual(filter.categories, [GESETZE]);

const docType = filter => {
  if (isOnlyGesetze(filter)) return ["g"];
  if (isOnlyRechtsprechung(filter)) return ["r"];
  return [];
};

const backendSearch = async searchRequest => {
  const { filter } = searchRequest;
  const docTypes = docType(filter);

  const body = {
    query: searchRequest.query,
    filter: {
      docTypes: docTypes
    }
  };

  return await axios.post(backendUrl, body);
};

const computeURL = (query, filter) => {
  if (isOnlyRechtsprechung(filter))
    return `${BASE_URL}/suche?q=${encodeURI(query)}&d=r`;
  if (isOnlyGesetze(filter))
    return `${BASE_URL}/suche?q=${encodeURI(query)}&d=g`;
  return `${BASE_URL}/suche?q=${encodeURI(query)}`;
};

module.exports.servExtAPI = function(server) {
  server.post("/extapi/v1/", (req, res) => {
    if (!req.body)
      return res
        .status(500)
        .json({ err: "query darf nicht null sein" })
        .end();

    const { referer, query, filter } = req.body;

    if (referer !== "j-lawyer")
      return res
        .status(500)
        .json({ err: "ExtAPI hat kein passender referer" })
        .end();

    if (!query) {
      console.log("Query was null. HTTP 500", referer, query, filter);
      return resx
        .status(500)
        .json({ err: "Query war null" })
        .end();
    }

    const result = backendSearch({ filter, query })
      .then(result => result.data)
      .then(data => {
        return data;
      })
      .then(data => {
        const { highlightedDocs } = data;
        let docs = data.docs;
        if (highlightedDocs && highlightedDocs.sections)
          docs = highlightedDocs.sections.concat(docs);
        if (highlightedDocs && highlightedDocs.norms)
          docs = highlightedDocs.norms.concat(docs);
        return {
          docCount: data.docCount,
          docs
        };
      })
      .then(data => ({
        linkZurTrefferliste: computeURL(query, filter),
        anzahlDerTreffer: data.docCount,
        treffer: data.docs.map(d => docDAO(d))
      }))
      .then(data => res.json(data).end())
      .catch(err => {
        console.log("ERROR", err);
        res.status(500).json({
          Fehler: "urteile-gesetze.de. Es gab einen internen Fehler."
        });
      });
  });

  const docDAO = data => {
    if (data.docType == "norm") return gesetzDAO(data);
    if (data.docType === "rechtsprechung") return rechtsprechungDAO(data);
  };

  const rechtsprechungDAO = data => {
    const url = BASE_URL + data.kanonischeUrl;
    const gericht =
      data.gericht + (data.spruchkoerper ? " " + data.spruchkoerper : "");
    const kurzbeschreibung = data.kurzBeschreibung;

    return {
      abkuerzung: data.abkuerzung,
      aktenzeichen: data.abkuerzung,
      titel: data.titel,
      url,
      type: "rechtsprechung",
      gericht,
      kurzbeschreibung,
      beschlussdatum: moment(data.date, "YYYY-MM-DD").format("MM.DD.YYYY")
    };
  };

  const gesetzDAO = data => {
    const abkuerzung =
      (data.abkuerzung ? data.abkuerzung + " " : "") + data.abkuerzungNorm;
    const url = BASE_URL + data.kanonischeUrl;
    const kurzbeschreibung = data.kurzBeschreibung;

    return {
      abkuerzung,
      titel: data.titel,
      url,
      type: "gesetz",
      aktenzeichen: null,
      gericht: null,
      kurzbeschreibung,
      beschlussdatum: moment(data.date, "YYYY-MM-DD").format("MM.DD.YYYY")
    };
  };
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
