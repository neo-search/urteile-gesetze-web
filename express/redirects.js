module.exports.serveRedirects = function(server) {
  server.get("/query-alle", (req, res) => {
    redirectToSearch(req, res);
  });

  server.get("/query-norm", (req, res) => {
    redirectToSearch(req, res);
  });

  server.get("/rechtsprechung", (req, res) => {
    return res.redirect("/urteile");
  });
  
  server.get("/bpatg", (req, res) => {
    return res.redirect("/bpatg-entscheidungen");
  });

  server.get("/query-rechtsprechung", (req, res) => {
    redirectToSearch(req, res);
  });

  [
    "/urteile/BAG/2010",
    "/urteile/BAG/2011",
    "/urteile/BAG/2012",
    "/urteile/BAG/2013",
    "/urteile/BAG/2014",
    "/urteile/BAG/2015",
    "/urteile/BAG/2016",
    "/urteile/BAG/2017",
    "/urteile/BAG/2018",

    "/urteile/BFH/2010",
    "/urteile/BFH/2011",
    "/urteile/BFH/2012",
    "/urteile/BFH/2013",
    "/urteile/BFH/2014",
    "/urteile/BFH/2015",
    "/urteile/BFH/2016",
    "/urteile/BFH/2017",
    "/urteile/BFH/2018",

    "/urteile/BGH/2010",
    "/urteile/BGH/2011",
    "/urteile/BGH/2012",
    "/urteile/BGH/2013",
    "/urteile/BGH/2014",
    "/urteile/BGH/2015",
    "/urteile/BGH/2016",
    "/urteile/BGH/2017",
    "/urteile/BGH/2018",

    "/urteile/BPatG/2010",
    "/urteile/BPatG/2011",
    "/urteile/BPatG/2012",
    "/urteile/BPatG/2013",
    "/urteile/BPatG/2014",
    "/urteile/BPatG/2015",
    "/urteile/BPatG/2016",
    "/urteile/BPatG/2017",
    "/urteile/BPatG/2018",

    "/urteile/BSG/2010",
    "/urteile/BSG/2011",
    "/urteile/BSG/2012",
    "/urteile/BSG/2013",
    "/urteile/BSG/2014",
    "/urteile/BSG/2015",
    "/urteile/BSG/2016",
    "/urteile/BSG/2017",
    "/urteile/BSG/2018",

    "/urteile/BVerfG/2010",
    "/urteile/BVerfG/2011",
    "/urteile/BVerfG/2012",
    "/urteile/BVerfG/2013",
    "/urteile/BVerfG/2014",
    "/urteile/BVerfG/2015",
    "/urteile/BVerfG/2016",
    "/urteile/BVerfG/2017",
    "/urteile/BVerfG/2018",

    "/urteile/BVerwG/2010",
    "/urteile/BVerwG/2011",
    "/urteile/BVerwG/2012",
    "/urteile/BVerwG/2013",
    "/urteile/BVerwG/2014",
    "/urteile/BVerwG/2015",
    "/urteile/BVerwG/2016",
    "/urteile/BVerwG/2017",
    "/urteile/BVerwG/2018",

    "/urteile/GmSOGB/2010",
    "/urteile/GmSOGB/2012"
  ].map(url => redirectToLowercase(server, url));
};

const redirectToLowercase = (server, url) => {
  return server.get(url, (req, res) =>
    res.redirect(url.toLowerCase().substring(8, url.length - 4))
  );
};

const redirectToSearch = (req, res) => {
  const passedQuery = req.query.query;
  return res.redirect("/suche?q=" + passedQuery);
};
