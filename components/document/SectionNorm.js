import SectionLink from "../common/SectionLink";
import css from "styled-jsx/css";
import { colors } from "../common/Constants";

const styles = css`
  div:hover {
    background-color: ${colors.hoverBackgroundColor};
    cursor: pointer;
  }

  div a {
    font-weight: 600;
  }

  div a span {
    color: ${colors.primaryAction};
    font-weight: normal;
  }

  div {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const renderLink = (doc, abkuerzungOrEmpty) => {
  return (
    <SectionLink url={doc.kanonischeUrl}>
      <div>
        <style jsx>{styles}</style>
        <a href={doc.kanonischeUrl}>{abkuerzungOrEmpty + " "}<span>{doc.titel ? " " + doc.titel : ""}</span></a>
        {/* <span>{doc.titel ? " " + doc.titel : ""}</span> */}
      </div>
    </SectionLink>
  );
};

const renderGliederung = (doc, abkuerzungOrEmpty) => {
  return (
    <div>
      <style jsx>{styles}</style>
      <b>{abkuerzungOrEmpty}</b> {" " + doc.titel}
    </div>
  );
};

export default ({ doc }) => {
  const abkuerzungOrEmpty = doc.abkuerzung || "";

  if (doc.gliederung) return renderGliederung(doc, abkuerzungOrEmpty);

  return renderLink(doc, abkuerzungOrEmpty);
};
