import { google } from 'googleapis'

const SITE_URL = 'https://stevia.com.co/'

export async function getArticlePerformance(auth, daysBack = 90) {
  const webmasters = google.webmasters({ version: 'v3', auth })
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)

  const fmt = (d) => d.toISOString().split('T')[0]

  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['page'],
      rowLimit: 500,
    },
  })

  return (res.data.rows || []).map((r) => ({
    page: r.keys[0].replace(SITE_URL, '/'),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(2),
    position: +r.position.toFixed(1),
  }))
}

export async function getKeywordOpportunities(auth, daysBack = 90) {
  const webmasters = google.webmasters({ version: 'v3', auth })
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)

  const fmt = (d) => d.toISOString().split('T')[0]

  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: 1000,
      dimensionFilterGroups: [{
        filters: [{
          dimension: 'query',
          operator: 'notContains',
          expression: 'vitaliah',
        }],
      }],
    },
  })

  const rows = res.data.rows || []

  // Keywords con impresiones altas pero posición > 10 (oportunidades de mejora)
  const opportunities = rows.filter(
    (r) => r.impressions > 50 && r.position > 10
  )

  // Keywords con impresiones altas y posición <= 10 pero CTR bajo (mejorar título/meta)
  const lowCtr = rows.filter(
    (r) => r.impressions > 100 && r.position <= 10 && r.ctr < 0.03
  )

  return {
    positionOpportunities: opportunities
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 50)
      .map((r) => ({
        query: r.keys[0],
        impressions: r.impressions,
        clicks: r.clicks,
        position: +r.position.toFixed(1),
        type: 'position_gap',
      })),
    ctrOpportunities: lowCtr
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20)
      .map((r) => ({
        query: r.keys[0],
        impressions: r.impressions,
        ctr: +(r.ctr * 100).toFixed(2),
        position: +r.position.toFixed(1),
        type: 'ctr_gap',
      })),
  }
}

export async function getTopQueries(auth, daysBack = 30) {
  const webmasters = google.webmasters({ version: 'v3', auth })
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)

  const fmt = (d) => d.toISOString().split('T')[0]

  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: 100,
    },
  })

  return (res.data.rows || []).map((r) => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    position: +r.position.toFixed(1),
  }))
}
