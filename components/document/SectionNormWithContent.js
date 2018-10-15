import Link from "next/link";

import KurzformTrefferRechtsprechung from '../suche/treffer/KurzformTrefferRechtsprechung'
import css from 'styled-jsx/css'

const contentStyles = css`
  div.content {
    background-color: red;
    padding-top: 20px;
    padding-bottom: 40px;
  }

  article entry {
    display: block;
    background-color: yellow;
  }
`

export default ({ doc }) => {
  const {
    titelNorm,
    kurzueberschriftNorm,
    kanonischeUrlNorm,
    abkuerzungNorm,
    abkuerzung,
    content
  } = doc;

  const contentWithImages = content
    ? content.replace(/bgbl1_/g, "/_assets/bgbl1_")
    : null;
    // const content =  doc.sectionInfo.content;

  return (
    <div>
      <h2
        style={{ fontSize: "1.3rem", paddingBottom: 40, paddingTop: 40 }}
      >
        <b>{abkuerzung}</b>
        {doc.titel ? " " + doc.titel : ""}
      </h2>

      <div dangerouslySetInnerHTML={{ __html: contentWithImages }} style={{ paddingBottom: 20 }}>
      </div>
      <hr />
    </div>
  );
};
