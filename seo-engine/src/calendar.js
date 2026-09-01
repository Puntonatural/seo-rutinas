/**
 * calendar.js — agrega nuevas ideas de artículos a content-calendar.yaml
 * a partir de data/report.json (generado por collect.js).
 * Output: content-calendar.yaml (raíz del repo) -- misma fuente que lee
 * el agente redactor (motorsinscripts.txt). No genera un archivo por mes.
 * Uso: node src/calendar.js
 */
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')
const REPO_ROOT = path.join(__dirname, '..', '..')
const CALENDAR_PATH = path.join(REPO_ROOT, 'content-calendar.yaml')

const CALENDAR_HEADER =
  '# Calendario SEO Vitaliah -- fuente unica de verdad para el agente redactor (motorsinscripts.txt)\n' +
  "# y el motor mensual (seo-engine/). No editar manualmente el 'estado' salvo para corregir un error --\n" +
  '# los agentes lo actualizan automaticamente (idea -> publicado_oculto / canibalizacion_detectada / qa_fallido).\n\n'

const HUB_REF = 'Productos naturales en Colombia (articulo hub, este calendario)'

function suggestHandle(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function main() {
  const reportPath = path.join(DATA_DIR, 'report.json')
  if (!fs.existsSync(reportPath)) {
    console.error('No existe data/report.json — corre primero: node src/collect.js')
    process.exit(1)
  }
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))

  if (!fs.existsSync(CALENDAR_PATH)) {
    console.error('No existe content-calendar.yaml en la raíz del repo — no se puede anexar.')
    process.exit(1)
  }
  const calendarDoc = yaml.load(fs.readFileSync(CALENDAR_PATH, 'utf8')) || { articulos: [] }
  const existentes = calendarDoc.articulos || []

  const titulosExistentes = new Set(existentes.map((a) => (a.titulo || '').toLowerCase().trim()))

  function pilarRefDe(cluster, nuevosDeEstaCorrida) {
    const enRepo = existentes.find((a) => a.cluster === cluster && a.rol === 'pilar')
    if (enRepo) return `${enRepo.titulo} (pilar, este calendario)`
    const enEstaCorrida = nuevosDeEstaCorrida.find((a) => a.cluster === cluster && a.rol === 'pilar')
    if (enEstaCorrida) return `${enEstaCorrida.titulo} (pilar, este calendario)`
    return null
  }

  const nuevos = []
  const sinPilar = report.summary.clustersSinPilarPublicado || []

  // 1. Pilar para el primer cluster sin pilar publicado, si no hay ya una idea pendiente para ese pilar
  if (sinPilar.length > 0) {
    const clusterTarget = sinPilar[0]
    const yaHayIdeaPilar = existentes.some(
      (a) => a.cluster === clusterTarget && a.rol === 'pilar' && a.estado === 'idea'
    )
    if (!yaHayIdeaPilar) {
      const clusterData = report.clusters[clusterTarget]
      const seedKw = clusterData?.pilar?.palabraClave || clusterTarget
      const titulo = `Guía completa: ${clusterTarget} — beneficios, usos y recomendaciones`

      if (!titulosExistentes.has(titulo.toLowerCase())) {
        nuevos.push({
          titulo,
          cluster: clusterTarget,
          rol: 'pilar',
          estado: 'idea',
          palabra_clave: seedKw,
          keywords_secundarias: (report.keywordExpansions[clusterTarget] || []).slice(0, 4),
          enlaces_internos_obligatorios: [HUB_REF],
          handle_propuesto: suggestHandle(`guia-completa-${clusterTarget}`),
          handle_final: null,
          article_gid: null,
        })
        titulosExistentes.add(titulo.toLowerCase())
      }
    }
  }

  // 2. Artículos cluster basados en oportunidades de posición en GSC
  const topOpportunities = (report.gsc.positionOpportunities || []).slice(0, 15)
  for (const opp of topOpportunities) {
    if (nuevos.length >= 5) break

    const titulo = opp.query.charAt(0).toUpperCase() + opp.query.slice(1)
    if (titulosExistentes.has(titulo.toLowerCase())) continue

    const clusterInferido =
      Object.keys(report.clusters).find((c) =>
        opp.query.toLowerCase().includes(c.toLowerCase().split('-')[0])
      ) || 'general'

    const enlaces = []
    const refPilar = pilarRefDe(clusterInferido, nuevos)
    if (refPilar) enlaces.push(refPilar)
    enlaces.push(HUB_REF)

    nuevos.push({
      titulo,
      cluster: clusterInferido,
      rol: 'cluster',
      estado: 'idea',
      palabra_clave: opp.query,
      keywords_secundarias: [],
      enlaces_internos_obligatorios: enlaces,
      handle_propuesto: suggestHandle(opp.query),
      handle_final: null,
      article_gid: null,
      gsc_data: {
        impresiones: opp.impressions,
        clicks: opp.clicks,
        posicion_actual: opp.position,
      },
    })
    titulosExistentes.add(titulo.toLowerCase())
  }

  if (nuevos.length === 0) {
    console.log('No se encontraron oportunidades nuevas — content-calendar.yaml sin cambios.')
    return
  }

  calendarDoc.articulos = [...existentes, ...nuevos]
  const yamlBody = yaml.dump(calendarDoc, { allowUnicode: true, lineWidth: 100, sortKeys: false })
  fs.writeFileSync(CALENDAR_PATH, CALENDAR_HEADER + yamlBody)

  console.log(`✅ ${nuevos.length} artículo(s) nuevo(s) agregados a content-calendar.yaml`)
  nuevos.forEach((a, i) => {
    console.log(`   ${i + 1}. [${a.rol}] ${a.titulo} (cluster: ${a.cluster})`)
  })
  console.log(
    '\n⚠ Revisa enlaces_internos_obligatorios de cada entrada nueva antes de que el agente' +
      ' redactor la tome: este script solo puede enlazar el pilar del cluster y el hub general' +
      ' -- agrega a mano los productos reales de Shopify que apliquen si los conoces, o deja que' +
      ' el redactor los resuelva por su cuenta en el Paso 3 (puede quedar con menos de 3 enlaces' +
      ' y fallar el QA si ninguno aplica).'
  )
}

main()
