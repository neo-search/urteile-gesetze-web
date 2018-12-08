const express = require("express");
const next = require("next");
const axios = require("axios");

const landingpages = require("./../data/landingpages.json");
const querieslandingpage = require("./../data/queries-landingpages.json");
const extapi = require("./extapi");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const redirects = require("./redirects");
const sitemaps = require("./sitemap");

const linkGenerator = require("./linkGenerator");

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());

    console.log("Starting express");
    server.get("/gesetze/:normid/:sectionid", (req, res) => {
      const actualPage = "/section";
      const queryParams = {
        kanonischeUrl: `/gesetze/${req.params.normid}/${req.params.sectionid}`
      };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get("/_assets/:assetname", async (req, res) => {
      const url =
        "https://storage.googleapis.com/urteile-gesetze-assets/gi/" +
        req.params.assetname;
      const asset = await axios.get(url, {
        responseType: "arraybuffer"
      });
      if (url.endsWith("jpg")) {
        const assetData = asset.data;
        res.setHeader("Content-Type", "image/jpeg");
        // res.setHeader('accept-ranges',"bytes")
        res.setHeader("Content-Transfer-Encoding", "binary");
        await res.send(new Buffer(assetData, "binary"));
      }
    });

    server.get("/gesetze/:normid", (req, res) => {
      const actualPage = "/gesetz";
      const queryParams = {
        kanonischeUrl: `/gesetze/${req.params.normid}`
      };

      return app.render(req, res, actualPage, queryParams);
    });

    server.get("/rechtsprechung/:rechtsprechungid", (req, res) => {
      const queryParams = {
        kanonischeUrl: `/rechtsprechung/${req.params.rechtsprechungid}`
      };
      const actualPage = "/rechtsprechung";
      return app.render(req, res, actualPage, queryParams);
    });

    redirects.serveRedirects(server);
    extapi.servExtAPI(server);
    sitemaps.serveSitemaps(server);

    for (const [route, { page }] of Object.entries(landingpages)) {
      server.get(route, (req, res) => {
        return app.render(req, res, page, {
          landingpage: route,
          p: req.query.p
        });
      });
    }

    const urteilelandingpages = querieslandingpage["urteile"];
    for (let i = 0; i < urteilelandingpages.length; i++) {
      const query = urteilelandingpages[i];
      const url = linkGenerator.generateUrteilslandingpageLink(query);
      // console.log("Generateded URL:" , url);

      server.get(url, (req, res) => {
        return app.render(req, res, "/landingpage-urteile", {
          q: query,
          p: req.query.p
        });
      });
    }

    const dokumentelandingpages = querieslandingpage["dokumente"];
    for (let i = 0; i < dokumentelandingpages.length; i++) {
      const query = dokumentelandingpages[i];

      const url = linkGenerator.generateDocumentslandingpageLink(query);
      server.get(url, (req, res) => {
        return app.render(req, res, "/landingpage", {
          q: query,
          p: req.query.p
        });
      });
    }

    server.get("/google1451df9c0876553e.html", (req, res) =>
      res.send("google-site-verification: google1451df9c0876553e.html")
    );

    server.get("/robots.txt", (req, res) => {
      // return res.sendFile(path.join(__dirname,"../static/robots.txt"));
      res.send(
        `User-agent: *
Sitemap: https://urteile-gesetze.de/siteindex.xml

Disallow: /unternehmen$
Disallow: /impressum$
Disallow: /datenschutz$
Disallow: /suche?*`
      );
      // res.header("Content-Type", "text/plain");
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.log("Anwenung hat einen Fatalen Fehler. Stoppen.");
    console.log(ex);
    console.error(ex.stack);
    process.exit(1);
  });
