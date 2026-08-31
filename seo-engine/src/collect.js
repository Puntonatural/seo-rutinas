/**
 * collect.js — recolecta datos de GSC + Sheet + keywords gratuitas
 * Output: data/report.json (usado por el agente Claude)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAuthClient } from './auth.js'
import { getArticlePerformance, getKeywordOpportunities, getTopQueries } from './gsc.js'
import { expandCluster } from './keywords.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')

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

  // 2. Leer clusters desde snapshot local (sin Sheets API)
  // El snapshot se actualiza manualmente o vía export de la hoja
  const snapshotPath = path.join(DATA_DIR, 'calendar-snapshot.json')
  const calendar = fs.existsSync(snapshotPath)
    ? JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
    : []

  if (calendar.length === 0) {
    console.log('  ⚠ Sin snapshot local — clusters/calendario omitidos')
    console.log('    Exporta la hoja a JSON y guárdala en data/calendar-snapshot.json')
  } else {
    console.log(`  → ${calendar.length} artículos leídos del snapshot local`)
  }

  // 3. Analizar clusters — cuáles tienen pilar, cuáles no
  const clusters = {}
  for (const row of calendar) {
    const cluster = row['Cluster'] || row['cluster']
    if (!cluster) continue
    if (!clusters[cluster]) clusters[cluster] = { pilar: null, articulos: [] }

    const rol = row['Rol'] || row['rol'] || ''
    const estado = row['Estado'] || row['estado'] || ''

    if (rol === 'pilar') {
      clusters[cluster].pilar = {
        titulo: row['Título'] || row['Titulo'] || '',
        estado,
        palabraClave: row['Palabra clave'] || '',
      }
    } else {
      clusters[cluster].articulos.push({
        titulo: row['Título'] || row['Titulo'] || '',
        estado,
        palabraClave: row['Palabra clave'] || '',
      })
    }
  }

  // 4. Clusters sin pilar publicado → oportunidades prioritarias
  const clustersSinPilar = Object.entries(clusters)
    .filter(([, v]) => !v.pilar || v.pilar.estado !== 'publicado')
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
      totalArticulosPublicados: calendar.filter(
        (r) => (r['Estado'] || r['estado']) === 'publicado'
      ).length,
      totalIdeas: calendar.filter((r) => (r['Estado'] || r['estado']) === 'idea').length,
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
  console.log(`   Ideas en hoja: ${report.summary.totalIdeas}`)
  console.log(`   Clusters sin pilar: ${clustersSinPilar.join(', ')}`)
}

main().catch((err) => {
  console.error('Error en collect.js:', err.message)
  process.exit(1)
})
