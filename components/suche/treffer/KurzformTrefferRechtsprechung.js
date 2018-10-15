import RechtsprechungLink from "./../../common/RechtsprechungLink";
import css from "styled-jsx/css";
import { colors } from "../../common/Constants";

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

  div.shortenedText {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export default ({ doc }) => {
  return (
    <div className="treffer-outer">
      <style jsx>{styles}</style>
      <RechtsprechungLink url={doc.kanonischeUrl}>
        <div className="treffer">
          <div>
            <div>
              <a href={`${doc.kanonischeUrl}`} style={{ fontWeight: 600 }}>
                {doc.gericht + " " + doc.spruchkoerper + ", " + doc.abkuerzung + ", Entscheidungsdatum: " + doc.date}
              </a>
            </div>
            <div className="shortenedText" dangerouslySetInnerHTML={{ __html: doc.kurzBeschreibung || "" }}>
            </div>
          </div>
        </div>
      </RechtsprechungLink>
    </div>
  );
};
