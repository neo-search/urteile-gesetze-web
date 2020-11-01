import Trefferliste from './Trefferliste'
import Container from 'reactstrap/lib/Container'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'

import InfoBar from '../common/InfoBar'
import Facetten from './facetten'
import css from 'styled-jsx/css'
import React from 'react'

const trefferlisteStyles = css`
  div.trefferliste {
    background-color: white;
    padding-top: 20px;
  }
`

const facettenData = (aggregations, filters, query) => {
  const facetten = []
  if (aggregations.aggregationDocType) {
    facetten.push(
      facettenDataAggregation(
        aggregations.aggregationDocType,
        'DOKUMENTART',
        'd'
      )
    )
  }

  if (aggregations['aggregationRechtsgebiete']) {
    facetten.push(
      facettenDataAggregation(
        aggregations['aggregationRechtsgebiete'],
        'RECHTSGEBIET',
        'r'
      )
    )
  }

  if (aggregations['rechtsprechungInfo.aggregationGericht']) {
    facetten.push(
      facettenDataAggregation(
        aggregations['rechtsprechungInfo.aggregationGericht'],
        'GERICHT',
        'g'
      )
    )
  }

  if (aggregations['aggregationJahr']) {
    facetten.push(
      facettenDataAggregation(aggregations['aggregationJahr'], 'JAHR', 'j')
    )
  }

  return {
    facetten,
    urlparams: { ...filters, q: query }
  }
}

const facettenDataAggregation = (aggregation, name, id) => {
  const values = aggregation.map((a) => {
    const { abkuerzung, beschreibung, docCount, key } = a
    return {
      valueName: abkuerzung,
      valueId: key,
      checked: false,
      hits: docCount
    }
  })
  const facetteDocType = {
    name: name,
    id: id,
    values: values
  }
  return facetteDocType
}

const renderInfoBarText = (query, docCount, page, h1) => {
  if (page == '/landingpage')
    return (
      <React.Fragment>
        <b>{docCount.toLocaleString('DE')}</b> Treffer für{' '}
        <h1
          style={{
            backgroundColor: '#b7fffb',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'inline'
          }}
        >
          {query}
        </h1>
      </React.Fragment>
    )
  if (page == '/landingpage-urteile')
    return (
      <React.Fragment>
        <b
          style={{
            fontSize: '1.2rem'
          }}
        >
          {docCount.toLocaleString('DE')}
        </b>{' '}
        <h1
          style={{
            // backgroundColor: "#b7fffb",
            fontSize: '1.2rem',
            fontWeight: 'normal',
            display: 'inline'
          }}
        >
          Urteile für <b>{query}</b>
        </h1>
      </React.Fragment>
    )
  if (h1)
    return (
      <>
        <h1
          style={{
            // backgroundColor: "#b7fffb",
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'inline'
          }}
        >
          {h1}
        </h1>
        . Gefundene Dokumente: <b>{docCount.toLocaleString('DE')}</b>
      </>
    )
  if (query)
    return (
      <>
        Suche nach <b>{query}</b>. Gefundene Dokumente:{' '}
        <b>{docCount.toLocaleString('DE')}</b>
      </>
    )
  return (
    <React.Fragment>
      Gefundene Dokumente: <b>{docCount.toLocaleString('DE')}</b>
    </React.Fragment>
  )
}

const renderInfoBar = (query, docCount, pageName, h1) => {
  return <InfoBar>{renderInfoBarText(query, docCount, pageName, h1)}</InfoBar>
}

const Suche = ({ searchRequest, searchResult, pageMetaInfo }) => {
  const { docs, docCount, aggregations, highlightedDocs } = searchResult
  const { query, filter } = searchRequest
  const { pageName, h1 } = pageMetaInfo
  const data = facettenData(aggregations, filter, query)

  return (
    <>
      <Container>{renderInfoBar(query, docCount, pageName, h1)}</Container>
      <div className="trefferliste">
        <style jsx>{trefferlisteStyles}</style>
        <Container>
          <Row>
            <Col sm="auto">
              <Facetten facettenData={data} />
            </Col>
            <Col sm="6" md="8" lg="8" xl="9">
              <Trefferliste
                docs={docs}
                highlightedDocs={highlightedDocs}
                docCount={docCount}
                searchRequest={searchRequest}
                pageMetaInfo={pageMetaInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Suche
