import getConfig from 'next/config'
import axios from 'axios'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const searchUrl = `${publicRuntimeConfig.backendUrl}/search`

const restserviceUrl = `${publicRuntimeConfig.backendUrl}`

const normalize = (param) => (typeof param === 'string' ? [param] : param)

const normalizeJahre = (param) => {
  var filter = typeof param === 'string' ? [param] : param
  return filter
}

const PAGE_SIZE = 20
const search = async (props) => {
  const {
    query,
    filter: { docTypes, gerichte, rechtsgebiete, jahre },
    sortType = 'relevanz',
    anzahlDerErgebnisse = PAGE_SIZE,
    page = 0,
    landingpage = null
  } = props

  const body = {
    query,
    filter: {
      docTypes: normalize(docTypes),
      gerichte: normalize(gerichte),
      rechtsgebiete: normalize(rechtsgebiete),
      jahre: normalizeJahre(jahre)
    },
    sortType,
    anzahlDerErgebnisse,
    page,
    landingpage
  }

  const axiosRes = await axios.post(searchUrl, body)

  const result = await axiosRes.data
  const { docs, docCount, aggregations, highlightedDocs } = result
  return {
    docs,
    docCount,
    aggregations,
    pageSize: anzahlDerErgebnisse,
    highlightedDocs
  }
}

const retrieveDoc = async (kanonischeUrl) => {
  const url = restserviceUrl + kanonischeUrl

  const axiosRes = await axios.get(url)

  const doc = await axiosRes.data

  //FIXME: quickfix, weil path von google gelesen wird
  if (doc.sectionInfo) doc.sectionInfo.path = ''

  return { doc }
}

const retrieveSitemapSections = async () => {
  const url = restserviceUrl + '/sitemap-sections'
  const axiosRes = await axios.get(url)
  const doc = await axiosRes.data

  return { doc }
}

const retrieveNorms = async () => {
  const url = restserviceUrl + '/norms'
  const axiosRes = await axios.get(url)
  const norms = await axiosRes.data

  return { norms }
}

export default { search, retrieveDoc, retrieveNorms }
