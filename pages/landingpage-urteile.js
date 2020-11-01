import React from 'react'
import SucheComponent from '../components/suche'
import backend from '../services/backend'
import Layout from '../layout/MainLayout'
import { branding } from '../components/common/Constants'
import Head from 'next/head'

const renderNoIndex = (docCount) => {
  if (docCount == 0)
    return (
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
    )
}

const Suche = (props) => {
  const { title, description } = props.pageMetaInfo
  const { query } = props.searchRequest

  const { docCount } = props.searchResult
  return (
    <Layout title={title} description={description} query={query}>
      {renderNoIndex(docCount)}
      <SucheComponent {...props} />
    </Layout>
  )
}

function normalizeParam(param) {
  return typeof param === 'string' ? [param] : param
}

Suche.getInitialProps = async function (props) {
  let { q, p } = props.query

  const description = 'Lesen Sie die letzten Urteile und Beschlüsse zu ' + q
  const title = `${q} Urteile`

  const canonical =
    '/' +
    q
      .toLowerCase()
      .split(' ')
      .join('-')
      .split('ö')
      .join('oe')
      .split('ä')
      .join('ae')
      .split('ü')
      .join('ue')
      .split('ß')
      .join('ss') +
    '-urteile'
  const filter = { d: ['r'] }
  const landingpage = canonical

  const searchResult = await backend.search({
    query: q,
    page: p,
    filter: {
      docTypes: filter.d,
      gerichte: filter.g,
      rechtsgebiete: filter.r
    }
  })

  return {
    searchResult,
    searchRequest: {
      query: q,
      page: p,
      filter
    },
    pageMetaInfo: {
      title: `${title}`,
      description,
      canonical,
      pageName: '/landingpage-urteile',
      landingpage,
      suche: q
    }
  }
}

export default Suche
