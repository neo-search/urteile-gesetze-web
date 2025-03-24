import { colors } from "../../common/Constants";
import GesetzLink from "./../../common/GesetzLink";
import Breadcrumb from "./TrefferBreadcrumb";
import BreadcrumbItem from "./TrefferBreadcrumbItem";

// import css from "styled-jsx/css";
// const styles = css`
//   div.treffer {
//     padding-bottom: 2px;
//   }

//   div.treffer > div {
//     padding-bottom: 4px;
//   }

//   div.treffer:hover {
//     background-color: ${colors.hoverBackgroundColor};
//     cursor: pointer;
//   }

//   div.treffer-outer {
//     padding-bottom: 16px;
//   }
// `;
export default ({ doc }) => {
  return (
    <div className="treffer-outer">
      {/* <style jsx>{styles}</style> */}
      <div className="treffer">
        <div>
          <GesetzLink url={doc.kanonischeUrlNorm}>
            <a href={doc.kanonischeUrlNorm} style={{ fontWeight: 600 }}>
              {(doc.abkuerzung || "") +
                " " +
                doc.abkuerzungNorm +
                (doc.titel ? ", " + doc.titel : "")}
            </a>
          </GesetzLink>
        </div>
        <GesetzLink url={doc.kanonischeUrlNorm}>
          <div dangerouslySetInnerHTML={{ __html: doc.kurzBeschreibung }} />
        </GesetzLink>
      </div>
      <Breadcrumb>
        <BreadcrumbItem>Gesetze</BreadcrumbItem>
        <BreadcrumbItem>{doc.abkuerzungNorm}</BreadcrumbItem>
        <BreadcrumbItem>{doc.abkuerzung}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
