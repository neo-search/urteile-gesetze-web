import Link from 'next/link'

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

const renderZitierendeUrteile = (abkuerzungSection, docs) => {
  if (docs && docs.length > 0)
    return (
      <div style={{ paddingTop: '3.5rem' }}>
        <h4 style={{ paddingBottom: '1rem' }}>
          Zitierende Urteile zu {abkuerzungSection}
        </h4>
        {docs.map((f) => (
          <KurzformTrefferRechtsprechung doc={f} />
        ))}
      </div>
    )
}

const Section = ({ doc, zitierendeUrteile }) => {
  const {
    titelNorm,
    kurzueberschriftNorm,
    kanonischeUrlNorm,
    ausfertigungsdatumNorm,
    // kanonischeUrlNext,
    // kanonischeUrlPrevious,
    abkuerzungNorm,
    abkuerzung,
    content
  } = doc.sectionInfo

  // const contentWithImages = content
  //   ? content.replace(/bgbl1_/g, "/_assets/bgbl1_")
  //   : null;
  const contentWithImages = content

  const abkuerzungSection = abkuerzung + ' ' + abkuerzungNorm
  // debugger;
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '1rem' }}>
        <Link href={kanonischeUrlNorm}>
          <a>
            <b>
              {(kurzueberschriftNorm ? kurzueberschriftNorm + ' ' : '') +
                '(' +
                abkuerzungNorm +
                ')'}
            </b>
            <br />
            {titelNorm}
          </a>
        </Link>
      </h2>
      <p style={{ fontSize: '0.9rem', fontWeight: 300, textAlign: 'center' }}>
        Ausfertigungsdatum:
        <b style={{ fontWeight: 600 }}>{' ' + ausfertigungsdatumNorm}</b>
      </p>
      <hr />
      <h1
        style={{ fontSize: '1.3rem', paddingBottom: 70, textAlign: 'center' }}
      >
        <b>{abkuerzungSection}</b>
        {doc.titel ? ' ' + doc.titel : ''}
      </h1>

      <div dangerouslySetInnerHTML={{ __html: contentWithImages }} />
      {renderZitierendeUrteile(abkuerzungSection, zitierendeUrteile)}
    </div>
  )
};

export default Section;
