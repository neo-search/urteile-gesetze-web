import Link from "next/link";
import Layout from "../layout/MainLayout";
import Container from "reactstrap/lib/Container";

import { branding } from "../components/common/Constants";
import Label from "../components/common/Label";

const LabelLink = ({ href, label }) => (
  <Link as={`/${href}`} href={`/gericht?landingpage=/${href}`}>
    <Label>
      <a href={`/${href}`}>{label}</a>
    </Label>
  </Link>
);

const Gericht = ({ href, gericht, children }) => (
  <div>
    <h5>
      <Link href={`/${href}`}>
        <a>{gericht}</a>
      </Link>
    </h5>
    <p>{children}</p>
    <LabelLink href={href} label={`Urteile ${gericht}`} />
  </div>
);

export default () => (
  <Layout title={`Liste der deutschen Bundesgerichte ${branding.seoname}`}>
    <Container>
      <h1>Liste der deutschen Bundesgerichte</h1>

      <Gericht href="bag" gericht="Bundesarbeitsgericht (BAG)">
        Hugo-Preuß-Platz 1 <br />
        99084 Erfurt <br />
        Tel.: 0361 / 2636 - 0<br />
        Fax: 0361 / 2636 - 2000<br />
        <a href="https://www.bundesarbeitsgericht.de/">
          Homepage des Bundesarbeitsgerichts
        </a>
      </Gericht>

      <Gericht href="bfh" gericht="Bundesfinanzhof (BFH)">
        Ismaninger Straße 109 <br />
        81675 München <br />
        Tel.: 089 / 9231-0 <br />
        Fax: 089 / 9231-201
        <a href="https://www.bundesfinanzhof.de/">
          Homepage des Bundesfinanzhofs
        </a>
      </Gericht>

      <Gericht href="bgh" gericht="Bundesgerichtshof (BGH)">
        Herrenstr. 45a <br />
        76133 Karlsruhe <br />
        Tel.: 0721 / 159-0 <br />
        Fax: 0721 / 159-832
        <a href="http://www.bundesgerichtshof.de">
          Homepage des Bundesgerichtshofs
        </a>
      </Gericht>
      <Gericht href="bsg" gericht="Bundessozialgericht (BSG)">
        Graf-Bernadotte-Platz 5<br />
        34119 Kassel<br />
        Tel.: 0561 / 3107 - 1<br />
        Fax: 0561 / 3107 - 475 <br />
        <a href="http://www.bsg.bund.de">Homepage des Bundessozialgerichts</a>
      </Gericht>
      <Gericht href="bverfg" gericht="Bundesverfassungsgericht (BVerfG)">
        Schloßbezirk 3 <br />
        76131 Karlsruhe <br />
        Tel.: 0721 / 9101 - 0 <br />
        Fax: 0721 / 9101 - 382
      </Gericht>
      <Gericht href="bpatg" gericht="Bundespatentgericht (BPatG)">
        Cincinnatistr. 64 <br />
        81549 München <br />
        Tel.: 089 / 69937 - 0<br />
        Fax: 089 / 69937 - 100
      </Gericht>
      <Gericht href="bverwg" gericht="Bundesverwaltungsgericht (BVerwG)">
        Simsonplatz 1 <br />
        04107 Leipzig <br />
        Tel.: 0341 / 2007 - 0 <br />
        Fax: 0341 / 2007 - 1000
      </Gericht>
      <Gericht
        href="gmsogb"
        gericht="Gemeinsamer Senat der obersten Gerichtshöfe des Bundes (GmS-OGB)"
      />
    </Container>
  </Layout>
);
