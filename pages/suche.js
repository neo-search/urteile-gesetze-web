import React from 'react'
import Suche from '../components/suche'
import backend from '../services/backend'
import Layout from '../layout/MainLayout'
import { branding } from '../components/common/Constants'
import Head from 'next/head'

const SuchePage = ({ pageMetaInfo, searchRequest, searchResult }) => {
    const { title, description, canonical } = pageMetaInfo
    return (
        <Layout
            title={title}
            description={description}
            query={searchRequest.query}
        >
            <Head>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <Suche
                searchRequest={searchRequest}
                searchResult={searchResult}
                pageMetaInfo={pageMetaInfo}
            />
        </Layout>
    )
}

SuchePage.getInitialProps = async function (props) {
    console.log('SuchePage . getInitialPorop')
    const { q, p, d, g, r, j } = props.query
    const { headers } = props.req || {}

    const searchResult = await backend.search(
        {
            query: q,
            page: p,
            filter: {
                docTypes: d,
                gerichte: g,
                rechtsgebiete: r,
                jahre: j
            },
            page: p
        },
        headers
    )

    const title = q
        ? `Suche nach ${q} ${branding.seoname}`
        : `Alle Urteile und Gesetze der Bundesrepublik  ${branding.seoname}`
    const description = `Finden sie die letzten Urteilen und Gesetzen zu ${q}`
    return {
        searchResult,
        searchRequest: {
            query: q,
            page: p,
            filter: {
                d,
                g,
                r,
                j
            }
        },
        pageMetaInfo: {
            title,
            description,
            pageName: '/suche'
        }
    }
}

export default SuchePage
