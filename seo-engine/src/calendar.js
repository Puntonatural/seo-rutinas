/**
 * calendar.js — genera el YAML del mes a partir de data/report.json
 * Output: calendars/YYYY-MM.yaml
 * Uso: node src/calendar.js
 */
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')
const CALENDARS_DIR = path.join(__dirname, '..', 'calendars')

function getCurrentMonth() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return { key: `${y}-${m}`, label: now.toLocaleString('es-CO', { month: 'long', year: 'numeric' }) }
}

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
  const { key: monthKey, label: monthLabel } = getCurrentMonth()

  // 1. Prioridad: oportunidades de posición con impresiones altas
  const topOpportunities = report.gsc.positionOpportunities
    .slice(0, 15)

  // 2. Clusters sin pilar publicado (máxima prioridad)
  const sinPilar = report.summary.clustersSinPilarPublicado || []

  // 3. Construir artículos del calendario
  const articulos = []

  // Primero: un pilar para el primer cluster sin pilar
  if (sinPilar.length > 0) {
    const clusterTarget = sinPilar[0]
    const clusterData = report.clusters[clusterTarget]
    const seedKw = clusterData?.pilar?.palabraClave || clusterTarget

    articulos.push({
      titulo: `Guía completa: ${clusterTarget} — beneficios, usos y recomendaciones`,
      keyword_principal: seedKw || clusterTarget,
      keywords_secundarias: (report.keywordExpansions[clusterTarget] || []).slice(0, 4),
      cluster: clusterTarget,
      rol: 'pilar',
      handle: suggestHandle(`guia-completa-${clusterTarget}`),
      semana_sugerida: 1,
      brief: `Artículo pilar del cluster "${clusterTarget}". Debe cubrir qué es, beneficios, cómo usar, contraindicaciones y productos disponibles. Mínimo 2000 palabras. Enlazar todos los artículos cluster del grupo.`,
    })
  }

  // Luego: artículos cluster basados en oportunidades GSC
  for (const opp of topOpportunities.slice(0, 5)) {
    if (articulos.length >= 5) break

    // Inferir cluster desde la query
    const clusterInferido = Object.keys(report.clusters).find((c) =>
      opp.query.toLowerCase().includes(c.toLowerCase().split('-')[0])
    ) || 'general'

    articulos.push({
      titulo: opp.query.charAt(0).toUpperCase() + opp.query.slice(1),
      keyword_principal: opp.query,
      keywords_secundarias: [],
      cluster: clusterInferido,
      rol: 'cluster',
      handle: suggestHandle(opp.query),
      semana_sugerida: articulos.length <= 1 ? 2 : articulos.length <= 2 ? 3 : 4,
      brief: `Artículo específico sobre "${opp.query}". GSC muestra ${opp.impressions} impresiones/mes con posición ${opp.position} — hay demanda real. Orientar a intención informacional + CTA hacia producto.`,
      gsc_data: {
        impresiones: opp.impressions,
        clicks: opp.clicks,
        posicion_actual: opp.position,
      },
    })
  }

  // Asegurar mínimo 3 artículos
  while (articulos.length < 3 && topOpportunities.length > articulos.length) {
    const opp = topOpportunities[articulos.length]
    articulos.push({
      titulo: opp.query.charAt(0).toUpperCase() + opp.query.slice(1),
      keyword_principal: opp.query,
      keywords_secundarias: [],
      cluster: 'general',
      rol: 'cluster',
      handle: suggestHandle(opp.query),
      semana_sugerida: 4,
      brief: `Oportunidad detectada en GSC con ${opp.impressions} impresiones y posición ${opp.position}.`,
    })
  }

  const calendarDoc = {
    mes: monthLabel,
    generado: new Date().toISOString().split('T')[0],
    fuente_datos: 'Google Search Console (90 días)',
    meta: {
      objetivo: `Publicar mínimo ${articulos.length} artículos en ${monthLabel}`,
      clusters_prioritarios: sinPilar.slice(0, 3),
    },
    articulos,
    mejoras_pendientes: report.gsc.ctrOpportunities.slice(0, 5).map((o) => ({
      query: o.query,
      accion: 'mejorar_titulo_meta',
      impresiones: o.impresiones,
      ctr_actual: `${o.ctr}%`,
      posicion: o.posicion,
    })),
  }

  if (!fs.existsSync(CALENDARS_DIR)) fs.mkdirSync(CALENDARS_DIR, { recursive: true })

  const outPath = path.join(CALENDARS_DIR, `${monthKey}.yaml`)
  fs.writeFileSync(outPath, yaml.dump(calendarDoc, { allowUnicode: true, lineWidth: 120 }))

  console.log(`✅ Calendario generado: calendars/${monthKey}.yaml`)
  console.log(`   ${articulos.length} artículos planificados para ${monthLabel}`)
  articulos.forEach((a, i) => {
    console.log(`   ${i + 1}. [${a.rol}] ${a.titulo} (semana ${a.semana_sugerida})`)
  })
}

main()
