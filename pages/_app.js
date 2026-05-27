// Globale CSS-Imports müssen in _app.js sein (Next.js 9+)
import "../layout/bootstrap.min.css";
import "../layout/style.css";
import "nprogress/nprogress.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
