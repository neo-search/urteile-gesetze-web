import Container from 'reactstrap/lib/Container'
import React, { Fragment } from 'react'
import css from 'styled-jsx/css'
import GesetzeLink from '../links/GesetzLink'
import Link from 'next/link'

const styles = css`
  dl {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  dl :global(dt) {
    float: left;
    clear: left;
    width: 140px;
    padding: 0;
    margin: 0;
    margin-right: 1.5rem;
    font-weight: normal;
  }
  dl :global(dd) {
    font-weight: normal;
  }
`

const docstyles = css`
  div :global(dl) {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  div :global(dl dt) {
    float: left;
    clear: left;
    width: 20px;
    padding: 0;
    margin: 0;
    font-weight: normal;
    color: rgb(153, 153, 153);
  }
  div :global(dl dd) {
    font-weight: normal;
    margin-left: 18px;
  }

  details[open] dd {
    animation-name: growAndFadeInFontSize;
    animation-duration: 500ms;
  }

  @keyframes growAndFadeInFontSize {
    0% {
      font-size: 0;
      opacity: 0;
    }
    100% {
      font-size: inherit;
      opacity: 1;
    }
  }
`

const summaryStyles = css`
  summary:hover {
    text-decoration: underline;
  }

  summary:focus {
    outline: none;
  }

  // details {
  //   padding-left: 10;
  // }
`

const renderMetaData = (desc, value, strong) => {
  if (value)
    return (
      <>
        <dt>{desc + ': '}</dt>
        <dd>{value}</dd>
      </>
    )
}

const renderMetaDataStrong = (desc, value) => {
  if (value)
    return (
      <>
        <dt>{desc + ': '}</dt>
        <dd>
          <strong>{value}</strong>
        </dd>
      </>
    )
}

const renderZitierteNormsLinks = (zitierteNorms, zitierteNormUrls) => {
  const links = []
  for (let i = 0; i < zitierteNorms.length; i++) {
    const label = zitierteNorms[i]
    const href = zitierteNormUrls[i]
    if (href)
      links.push(
        <div>
          <Link as={href} href={`/section?kanonischeUrl=${href}`}>
            {label}
          </Link>
        </div>
      )
    else
      links.push(
        // <div style={{ }}>{label}</div>
        <>
          <dt></dt>
          <dd>{label}</dd>
        </>
      )
  }

  return links
}

const renderZitierteNorms = (desc, zitierteNorms, zitierteNormUrls) => {
  if (zitierteNorms && zitierteNorms.length > 0)
    return (
      <>
        {/* <style jsx>{docstyles}</style> */}
        <details>
          {/* <style jsx>{summaryStyles}</style> */}
          <summary>{desc}</summary>
          {/* <dt>{desc + ": "}</dt> */}
          <dd>{renderZitierteNormsLinks(zitierteNorms, zitierteNormUrls)}</dd>
        </details>
      </>
    )
}

const renderLeitsatz = (doc) => {
  if (doc.rechtsprechungInfo.leitsatz)
    return (
      <Fragment>
        <h3 style={{ fontSize: '1.2rem' }}>Leitsätze</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: doc.rechtsprechungInfo.leitsatz
          }}
        />
      </Fragment>
    )
}

const renderTenor = (doc) => {
  if (doc.rechtsprechungInfo.tenor)
    return (
      <Fragment>
        <h3 style={{ fontSize: '1.2rem' }}>Tenor</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: doc.rechtsprechungInfo.tenor
          }}
        />
      </Fragment>
    )
}

const renderTatbestand = (doc) => {
  if (doc.rechtsprechungInfo.tatbestand)
    return (
      <Fragment>
        <h3 style={{ fontSize: '1.2rem' }}>Tatbestand</h3>
        <style jsx>{docstyles}</style>
        <div
          dangerouslySetInnerHTML={{
            __html: doc.rechtsprechungInfo.tatbestand
          }}
        />
      </Fragment>
    )
}

const renderGruende = (doc) => {
  if (doc.rechtsprechungInfo.gruende)
    return (
      <Fragment>
        <h3 style={{ fontSize: '1.2rem' }}>Gründe</h3>
        <style jsx>{docstyles}</style>
        <div
          dangerouslySetInnerHTML={{
            __html: doc.rechtsprechungInfo.gruende
          }}
        />
      </Fragment>
    )
}

const renderEntscheidungsgruende = (doc) => {
  if (doc.rechtsprechungInfo.entscheidungsgruende)
    return (
      <Fragment>
        <h3 style={{ fontSize: '1.2rem' }}>Entscheidungsgründe</h3>
        <style jsx>{docstyles}</style>
        <div
          dangerouslySetInnerHTML={{
            __html: doc.rechtsprechungInfo.entscheidungsgruende
          }}
        />
      </Fragment>
    )
}

const renderAbweichendeMeinung = (doc) => {
  if (doc.rechtsprechungInfo.abweichendeMeinung)
    return (
      <Fragment>
        <h3 style={{ fontSize: '1.2rem' }}>AbweichendeMeinung</h3>
        <style jsx>{docstyles}</style>
        <div
          dangerouslySetInnerHTML={{
            __html: doc.rechtsprechungInfo.abweichendeMeinung
          }}
        />
      </Fragment>
    )
}

const renderSubtitle = (titel) => {
  if (titel)
    return (
      <>
        <h2
          style={{
            fontSize: '1rem',
            paddingBottom: 10,
            paddingTop: 0
          }}
        >
          {titel}
        </h2>
        <hr style={{ marginBottom: 50 }} />
      </>
    )
}

const Urteil = ({ doc }) => {
  const {
    gerichtsbezeichnung,
    spruchkoerper,
    gericht,
    entscheidungsdatum,
    aktenzeichen,
    ecli,
    dokumenttyp,
    vorinstanz,
    zitierteNorms,
    zitierteNormUrls
  } = doc.rechtsprechungInfo

  const { titel } = doc

  return (
    // <Layout title={doc.gericht + ' ' + doc.spruchkoerper}>
    <Container>
      <style jsx>{styles}</style>

      <h3 style={{ textAlign: 'center', fontSize: '1rem' }}>
        {gerichtsbezeichnung}
      </h3>
      <p
        style={{
          fontSize: '0.9rem',
          fontWeight: 300,
          textAlign: 'center',
          // paddingBottom: 20,
          paddingTop: 0
        }}
      >
        Entscheidungsdatum:{' '}
        <b style={{ fontWeight: 600 }}>{entscheidungsdatum}</b>
      </p>

      <hr />

      <h1
        style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          paddingBottom: 50,
          textAlign: 'center'
        }}
      >
        {gericht + ' ' + entscheidungsdatum + ' - ' + aktenzeichen}
      </h1>

      {renderSubtitle(titel)}

      <dl>
        {renderMetaDataStrong('Gericht', gerichtsbezeichnung)}
        {renderMetaDataStrong('Spruchkörper', spruchkoerper)}
        {renderMetaDataStrong('Entscheidungsdatum', entscheidungsdatum)}
        {renderMetaDataStrong('Aktenzeichen', aktenzeichen)}
        {renderMetaDataStrong('ECLI', ecli)}
        {renderMetaDataStrong('Dokumenttyp', dokumenttyp)}
        {renderMetaData('Vorinstanz', vorinstanz)}
        {renderZitierteNorms(
          'Zitierte Gesetze',
          zitierteNorms,
          zitierteNormUrls
        )}
      </dl>

      <hr style={{ marginBottom: 60, marginBottom: 40 }} />
      {renderLeitsatz(doc)}
      {renderTenor(doc)}
      {renderTatbestand(doc)}
      {renderGruende(doc)}
      {renderEntscheidungsgruende(doc)}
      {renderAbweichendeMeinung(doc)}
    </Container>
    // </Layout>
  )
}

export default Urteil
