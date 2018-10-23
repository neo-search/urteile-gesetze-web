import RechtsprechungLink from "./../../common/RechtsprechungLink";
import css from "styled-jsx/css";
import BreadcrumbItem from "reactstrap/lib/BreadcrumbItem";

import { colors } from "../../common/Constants";

import Breadcrumb from "./TrefferBreadcrumb";
const styles = css`
  div.treffer {
    padding-bottom: 6px;
  }

  div.treffer:hover {
    background-color: ${colors.hoverBackgroundColor};
    cursor: pointer;
  }

  div.treffer-outer {
    padding-bottom: 16px;
  }
`;
export default ({ doc }) => {
  return (
    <div className="treffer-outer">
      <style jsx>{styles}</style>
      <div className="treffer">
        <div>
          <div style={{ paddingBottom: 4 }}>
            <RechtsprechungLink url={doc.kanonischeUrl}>
              <a href={`${doc.kanonischeUrl}`} style={{ fontWeight: 600 }}>
                {doc.gericht + " " + doc.spruchkoerper}
              </a>
            </RechtsprechungLink>
            <RechtsprechungLink url={doc.kanonischeUrl}>
              <span style={{ fontWeight: 400, color: colors.primaryAction }}>
                {", " + doc.abkuerzung + ", Entscheidungsdatum: " + doc.date}
              </span>
            </RechtsprechungLink>
          </div>
          <RechtsprechungLink url={doc.kanonischeUrl}>
            <div>
              <span
                dangerouslySetInnerHTML={{ __html: doc.kurzBeschreibung || "" }}
              />
              <br />
            </div>
          </RechtsprechungLink>
        </div>
      </div>
      <Breadcrumb>
        <BreadcrumbItem>Urteile</BreadcrumbItem>
        <BreadcrumbItem>{doc.gerichtsbezeichnung}</BreadcrumbItem>
        <BreadcrumbItem>{doc.abkuerzung}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
