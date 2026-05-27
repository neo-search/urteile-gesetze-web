const prod = process.env.NODE_ENV === "production";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CSS-Unterstützung ist seit Next.js 9 eingebaut — kein withCSS-Plugin mehr nötig
  serverRuntimeConfig: {
    // Nur auf dem Server verfügbar
    mySecret: "secret",
  },
  publicRuntimeConfig: {
    // Auf Server und Client verfügbar
    backendUrl: prod
      ? "https://rest.urteile-gesetze.de"
      : "http://localhost:8090",
    logging: prod ? "info" : "debug",
  },
};

module.exports = withBundleAnalyzer(nextConfig);
