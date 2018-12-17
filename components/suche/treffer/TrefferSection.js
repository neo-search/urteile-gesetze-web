import { colors } from "../../common/Constants";
import SectionLink from "./../../common/SectionLink";
import Breadcrumb from "./TrefferBreadcrumb";
import BreadcrumbItem from "./TrefferBreadcrumbItem";

import css from "styled-jsx/css";
const styles = css`
  div.treffer {
    padding-bottom: 2px;
  }

  div.treffer > div {
    padding-bottom: 4px;
  }

  div.treffer:hover {
    background-color: ${colors.hoverBackgroundColor};
    cursor: pointer;
  }

  div.treffer-outer {
    // padding-bottom: 16px;
  }
`;
export default ({ doc }) => {
  return (
    <div className="treffer-outer" 
    style={{ borderBottom: "1px solid #eaeaea", marginBottom: 25 }}>
      <style jsx>{styles}</style>
      <div className="treffer">
        <div>
          <SectionLink url={doc.kanonischeUrl}>
            <a href={doc.kanonischeUrl} style={{ fontWeight: 600 }}>
              {(doc.abkuerzung || "") +
                " " +
                doc.abkuerzungNorm +
                (doc.titel ? ", " + doc.titel : "")}
            </a>
          </SectionLink>
        </div>
        <SectionLink url={doc.kanonischeUrl}>
          <div dangerouslySetInnerHTML={{ __html: doc.kurzBeschreibung }} />
        </SectionLink>
      </div>
      <Breadcrumb>
        <BreadcrumbItem>Gesetze</BreadcrumbItem>
        <BreadcrumbItem>{doc.abkuerzungNorm}</BreadcrumbItem>
        <BreadcrumbItem>{doc.abkuerzung}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
