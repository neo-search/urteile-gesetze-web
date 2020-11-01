const axios = require('axios')
const config = require('../next.config')
const sitemapService = require('sitemap')
const landingpages = require('../data/landingpages')
const querieslandingpages = require('../data/queries-landingpages')

const host = 'https://urteile-gesetze.de'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://urteile-gesetze.de'
    : 'http://localhost:3000'

const backendUrl = config.publicRuntimeConfig.backendUrl

const sitemapIndex = sitemapService.buildSitemapIndex({
  urls: [
    'https://urteile-gesetze.de/sitemap-landingpages.xml',
    'https://urteile-gesetze.de/sitemap-norms.xml',
    'https://urteile-gesetze.de/sitemap-rechtsprechung-1995-2015.xml',
    'https://urteile-gesetze.de/sitemap-rechtsprechung-2016-2020.xml',
    'https://urteile-gesetze.de/sitemap-sections-0-9.xml',
    'https://urteile-gesetze.de/sitemap-sections-a.xml',
    'https://urteile-gesetze.de/sitemap-sections-b.xml',
    'https://urteile-gesetze.de/sitemap-sections-c.xml',
    'https://urteile-gesetze.de/sitemap-sections-d.xml',
    'https://urteile-gesetze.de/sitemap-sections-e.xml',
    'https://urteile-gesetze.de/sitemap-sections-f.xml',
    'https://urteile-gesetze.de/sitemap-sections-g.xml',
    'https://urteile-gesetze.de/sitemap-sections-h.xml',
    'https://urteile-gesetze.de/sitemap-sections-i.xml',
    'https://urteile-gesetze.de/sitemap-sections-j.xml',
    'https://urteile-gesetze.de/sitemap-sections-k.xml',
    'https://urteile-gesetze.de/sitemap-sections-l.xml',
    'https://urteile-gesetze.de/sitemap-sections-m.xml',
    'https://urteile-gesetze.de/sitemap-sections-n.xml',
    'https://urteile-gesetze.de/sitemap-sections-o.xml',
    'https://urteile-gesetze.de/sitemap-sections-p.xml',
    'https://urteile-gesetze.de/sitemap-sections-q.xml',
    'https://urteile-gesetze.de/sitemap-sections-r.xml',
    'https://urteile-gesetze.de/sitemap-sections-s.xml',
    'https://urteile-gesetze.de/sitemap-sections-t.xml',
    'https://urteile-gesetze.de/sitemap-sections-u.xml',
    'https://urteile-gesetze.de/sitemap-sections-v.xml',
    'https://urteile-gesetze.de/sitemap-sections-w.xml',
    // "https://urteile-gesetze.de/sitemap-sections-x.xml",
    'https://urteile-gesetze.de/sitemap-sections-y.xml',
    'https://urteile-gesetze.de/sitemap-sections-z.xml',
    'https://urteile-gesetze.de/sitemap-images.xml'
  ]
})

const landingpagesLinks = ['/dsgvo', '/gesetze', '/urteile', '/gerichte']
for (const [route, { doNotIncludeInSitemap }] of Object.entries(landingpages)) {
  if (!doNotIncludeInSitemap) landingpagesLinks.push(route)
  //  landingpagesLinks.push({ urls: route, changefreq: 'weekly', priority: 0.9 })
}

const urteilelandingpages = querieslandingpages['urteile']

for (let i = 0; i < urteilelandingpages.length; i++) {
  const query = urteilelandingpages[i]
  const url =
    '/' +
    query
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
  landingpagesLinks.push(url)
}

const sitemapLandingpages = sitemapService.createSitemap({
  hostname: 'https://urteile-gesetze.de',
  cacheTime: 3600 * 1000 * 2, // 2 hours - cache purge period
  urls: landingpagesLinks.map((e) => ({
    url: e,
    changefreq: 'weekly',
    priority: 0.9
  }))
})

const searchSitemapSections = async function searchSections(letters) {
  const url = backendUrl + '/sitemap-sections/' + letters
  const axiosRes = await axios.get(url)
  data = await axiosRes.data
  return data //;
}

const sitemapSections = async function createSitemapSections(sections) {
  const sitemap = sitemapService.createSitemap({
    hostname: 'https://urteile-gesetze.de',
    cacheTime: 3600 * 1000 * 2, // 2 hours - cache purge period
    urls: sections
  })
  sitemap.urls = sitemap.urls //
    .map((e) => ({
      url: e,
      changefreq: 'weekly',
      priority: 0.8
    }))
  return sitemap
}

const sendSitemapSection = async function (letters, res) {
  const sections = await searchSitemapSections(letters)
  const sectionsWithoutInhaltsuebersicht = sections.filter((e) => {
    return !e.endsWith('inhaltsuebersicht')
  })
  const sitemap = await sitemapSections(sectionsWithoutInhaltsuebersicht)
  return sitemap.toXML((err, xml) => {
    if (err) {
      return res.status(500).end()
    }
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  })
}

const sitemapImages = sitemapService.createSitemap({
  hostname: 'https://urteile-gesetze.de',
  cacheTime: 3600 * 1000 * 2, // 2 hours - cache purge period
  urls: [
    {
      url: '/',
      img: [
        {
          url: '/static/assets/arbeitsrecht.svg',
          caption: 'Arbeitsrecht',
          title: 'Arbeitsrecht | Urteile & Gesetze',
          license: 'https://creativecommons.org/licenses/by-nd/4.0/'
        },
        {
          url: '/static/assets/sozialrecht.svg',
          caption: 'Sozialrecht',
          title: 'Sozialrecht | Urteile & Gesetze',
          license: 'https://creativecommons.org/licenses/by-nd/4.0/'
        },
        {
          url: '/static/assets/staatssrecht.svg',
          caption: 'Staats- & Verfassungsrecht',
          title: 'Staats- & Verfassungsrecht | Urteile & Gesetze',
          license: 'https://creativecommons.org/licenses/by-nd/4.0/'
        },
        {
          url: '/static/assets/steuerrecht.svg',
          caption: 'Steuerrecht',
          title: 'Steuerrecht | Urteile & Gesetze',
          license: 'https://creativecommons.org/licenses/by-nd/4.0/'
        },
        {
          url: '/static/assets/strafrecht.svg',
          caption: 'Strafrecht',
          title: 'Strafrecht | Urteile & Gesetze',
          license: 'https://creativecommons.org/licenses/by-nd/4.0/'
        }
      ]
    }
  ]
})

const searchSitemapNorms = async (searchNorms) => {
  const url = backendUrl + '/sitemap-norms'
  const axiosRes = await axios.get(url)
  return await axiosRes.data
}

const sitemapNorms = async function createSitemapNorms(norms) {
  const sitemap = sitemapService.createSitemap({
    hostname: 'https://urteile-gesetze.de',
    cacheTime: 3600 * 1000 * 2, // 2 hours - cache purge period
    urls: norms
  })
  sitemap.urls = sitemap.urls.map((e) => ({
    url: e,
    changefreq: 'weekly',
    priority: 0.8
  }))
  return sitemap
}

const searchSitemapUrteile = async function searchUrteile(yearStart, yearEnd) {
  const url = backendUrl + '/sitemap-urteile/' + yearStart + '/' + yearEnd
  const axiosRes = await axios.get(url)
  return await axiosRes.data
}

const sitemapUrteile = async function createSitemapUrteile(urteile) {
  const sitemap = sitemapService.createSitemap({
    hostname: 'https://urteile-gesetze.de',
    cacheTime: 3600 * 1000 * 2, // 2 hours - cache purge period
    urls: urteile
  })
  sitemap.urls = sitemap.urls.map((e) => ({
    url: e,
    changefreq: 'weekly',
    priority: 0.8
  }))
  return sitemap
}

module.exports.serveSitemaps = async function (server) {
  server.get('/siteindex.xml', (req, res) => {
    res.header('Content-Type', 'application/xml')
    res.send(sitemapIndex)
  })

  server.get('/sitemap-landingpages.xml', (req, res) => {
    return sitemapLandingpages.toXML((err, xml) => {
      if (err) {
        return res.status(500).end()
      }
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })

  server.get('/sitemap-norms.xml', async (req, res) => {
    const norms = await searchSitemapNorms()
    const sitemap = await sitemapNorms(norms)
    return sitemap.toXML((err, xml) => {
      if (err) {
        return res.status(500).end()
      }
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })

  const sendSitemapUrteile = async function (yearStart, yearEnd, res) {
    const urteile = await searchSitemapUrteile(yearStart, yearEnd)
    const sitemap = await sitemapUrteile(urteile)
    return sitemap.toXML((err, xml) => {
      if (err) {
        return res.status(500).end()
      }
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  }

  server.get('/sitemap-images.xml', async (req, res) => {
    return sitemapImages.toXML((err, xml) => {
      if (err) {
        return res.status(500).end()
      }
      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })

  server.get('/sitemap-rechtsprechung-1995-2015.xml', async (req, res) => {
    sendSitemapUrteile(1995, 2015, res)
  })

  server.get('/sitemap-rechtsprechung-2016-2020.xml', async (req, res) => {
    sendSitemapUrteile(2016, 2020, res)
  })

  server.get('/sitemap-sections-a.xml', async (req, res) => {
    sendSitemapSection('a', res)
  })

  server.get('/sitemap-sections-b.xml', async (req, res) => {
    sendSitemapSection('b', res)
  })

  server.get('/sitemap-sections-c.xml', async (req, res) => {
    sendSitemapSection('c', res)
  })

  server.get('/sitemap-sections-d.xml', async (req, res) => {
    sendSitemapSection('d', res)
  })

  server.get('/sitemap-sections-e.xml', async (req, res) => {
    sendSitemapSection('e', res)
  })

  server.get('/sitemap-sections-f.xml', async (req, res) => {
    sendSitemapSection('f', res)
  })

  server.get('/sitemap-sections-g.xml', async (req, res) => {
    sendSitemapSection('g', res)
  })

  server.get('/sitemap-sections-h.xml', async (req, res) => {
    sendSitemapSection('h', res)
  })

  server.get('/sitemap-sections-i.xml', async (req, res) => {
    sendSitemapSection('i', res)
  })

  server.get('/sitemap-sections-j.xml', async (req, res) => {
    sendSitemapSection('j', res)
  })

  server.get('/sitemap-sections-k.xml', async (req, res) => {
    sendSitemapSection('k', res)
  })

  server.get('/sitemap-sections-l.xml', async (req, res) => {
    sendSitemapSection('l', res)
  })

  server.get('/sitemap-sections-m.xml', async (req, res) => {
    sendSitemapSection('m', res)
  })

  server.get('/sitemap-sections-n.xml', async (req, res) => {
    sendSitemapSection('n', res)
  })

  server.get('/sitemap-sections-o.xml', async (req, res) => {
    sendSitemapSection('o', res)
  })

  server.get('/sitemap-sections-p.xml', async (req, res) => {
    sendSitemapSection('p', res)
  })

  server.get('/sitemap-sections-q.xml', async (req, res) => {
    sendSitemapSection('q', res)
  })

  server.get('/sitemap-sections-r.xml', async (req, res) => {
    sendSitemapSection('r', res)
  })

  server.get('/sitemap-sections-s.xml', async (req, res) => {
    sendSitemapSection('s', res)
  })

  server.get('/sitemap-sections-t.xml', async (req, res) => {
    sendSitemapSection('t', res)
  })

  server.get('/sitemap-sections-u.xml', async (req, res) => {
    sendSitemapSection('u', res)
  })

  server.get('/sitemap-sections-v.xml', async (req, res) => {
    sendSitemapSection('v', res)
  })

  server.get('/sitemap-sections-w.xml', async (req, res) => {
    sendSitemapSection('w', res)
  })

  // server.get("/sitemap-sections-x.xml", async (req, res) => {
  //   sendSitemapSection("x", res);
  // });

  server.get('/sitemap-sections-y.xml', async (req, res) => {
    sendSitemapSection('y', res)
  })

  server.get('/sitemap-sections-z.xml', async (req, res) => {
    sendSitemapSection('z', res)
  })

  server.get('/sitemap-sections-0-9.xml', async (req, res) => {
    sendSitemapSection('0-9', res)
  })
}
