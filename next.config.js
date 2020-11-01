const prod = process.env.NODE_ENV === "production";
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: prod
      ? "https://rest.urteile-gesetze.de"
      : "http://localhost:8090",
    logging: prod ? "info" : "debug",
  },
});
