/**
 * collect.js — recolecta datos de GSC + content-calendar.yaml + keywords gratuitas
 * Output: data/report.json (usado por el agente Claude)
 */
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'
import { getAuthClient } from './auth.js'
import { getArticlePerformance, getKeywordOpportunities, getTopQueries } from './gsc.js'
import { expandCluster } from './keywords.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')
const REPO_ROOT = path.join(__dirname, '..', '..')
const CALENDAR_PATH = path.join(REPO_ROOT, 'content-calendar.yaml')

async function main() {
  console.log('🔍 Iniciando recolección de datos SEO...')

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

  const auth = getAuthClient()

  // 1. Datos de GSC
  console.log('  → Rendimiento de artículos (90 días)...')
  const articlePerformance = await getArticlePerformance(auth, 90)

  console.log('  → Oportunidades de keywords en GSC...')
  const { positionOpportunities, ctrOpportunities } = await getKeywordOpportunities(auth, 90)

  console.log('  → Top queries últimos 30 días...')
  const topQueries = await getTopQueries(auth, 30)

  // 2. Leer el calendario real del repo (única fuente de verdad)
  if (!fs.existsSync(CALENDAR_PATH)) {
    console.error('No existe content-calendar.yaml en la raíz del repo — no se puede analizar clusters.')
    process.exit(1)
  }
  const calendarDoc = yaml.load(fs.readFileSync(CALENDAR_PATH, 'utf8')) || {}
  const calendar = calendarDoc.articulos || []
  console.log(`  → ${calendar.length} artículos leídos de content-calendar.yaml`)

  // 3. Analizar clusters — cuáles tienen pilar, cuáles no
  const clusters = {}
  for (const a of calendar) {
    const cluster = a.cluster
    if (!cluster) continue
    if (!clusters[cluster]) clusters[cluster] = { pilar: null, articulos: [] }

    if (a.rol === 'pilar') {
      clusters[cluster].pilar = {
        titulo: a.titulo || '',
        estado: a.estado || '',
        palabraClave: a.palabra_clave || '',
        handle: a.handle_final || a.handle_propuesto || '',
      }
    } else {
      clusters[cluster].articulos.push({
        titulo: a.titulo || '',
        estado: a.estado || '',
        palabraClave: a.palabra_clave || '',
      })
    }
  }

  // 4. Clusters sin pilar publicado (oculto o visible) → oportunidades prioritarias
  const PILAR_LISTO = ['publicado', 'publicado_oculto']
  const clustersSinPilar = Object.entries(clusters)
    .filter(([, v]) => !v.pilar || !PILAR_LISTO.includes(v.pilar.estado))
    .map(([name]) => name)

  // 5. Expandir keywords para clusters con menos de 3 artículos "idea"
  console.log('  → Expandiendo keywords con Google Autocomplete...')
  const keywordExpansions = {}
  const clustersPocoDesarrollados = Object.entries(clusters)
    .filter(([, v]) => v.articulos.filter((a) => a.estado === 'idea').length < 3)
    .map(([name]) => name)
    .slice(0, 5) // limitar para no spamear autocomplete

  for (const cluster of clustersPocoDesarrollados) {
    const seeds = clusters[cluster].articulos
      .map((a) => a.palabraClave)
      .filter(Boolean)
      .slice(0, 2)
    keywordExpansions[cluster] = await expandCluster(cluster, seeds)
  }

  // 6. Construir reporte final
  const report = {
    generatedAt: new Date().toISOString(),
    site: 'stevia.com.co',
    summary: {
      totalArticulosPublicados: calendar.filter((a) => PILAR_LISTO.includes(a.estado)).length,
      totalIdeas: calendar.filter((a) => a.estado === 'idea').length,
      totalClusters: Object.keys(clusters).length,
      clustersSinPilarPublicado: clustersSinPilar,
    },
    gsc: {
      articlePerformance: articlePerformance.slice(0, 100),
      positionOpportunities,
      ctrOpportunities,
      topQueries: topQueries.slice(0, 30),
    },
    clusters,
    keywordExpansions,
    rawCalendar: calendar,
  }

  fs.writeFileSync(path.join(DATA_DIR, 'report.json'), JSON.stringify(report, null, 2))
  console.log(`\n✅ Reporte guardado en data/report.json`)
  console.log(`   Artículos publicados: ${report.summary.totalArticulosPublicados}`)
  console.log(`   Ideas pendientes: ${report.summary.totalIdeas}`)
  console.log(`   Clusters sin pilar: ${clustersSinPilar.join(', ')}`)
}

main().catch((err) => {
  console.error('Error en collect.js:', err.message)
  process.exit(1)
})
