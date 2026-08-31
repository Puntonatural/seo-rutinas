/**
 * run.js — orquestador principal
 * 1. Corre collect.js para generar data/report.json
 * 2. Invoca el agente Claude con el prompt + reporte
 * 3. Parsea la respuesta y escribe nuevos artículos de vuelta a Google Sheets
 */
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAuthClient } from './auth.js'
import { appendArticle } from './sheets.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  console.log('🚀 Motor SEO Vitaliah — iniciando ciclo diario\n')

  // Paso 1: recolectar datos
  console.log('Paso 1/3: Recolectando datos...')
  execSync('node src/collect.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  })

  // Paso 2: el agente Claude analiza (este script es invocado por el agente)
  // El agente lee data/report.json y agent/prompt.md directamente
  console.log('\nPaso 2/3: Datos listos para el agente Claude')
  console.log('  → El agente debe leer: data/report.json')
  console.log('  → El agente debe seguir: agent/prompt.md')

  // Paso 3: si el agente generó nuevos artículos (data/new-articles.json), escribirlos a Sheets
  const newArticlesPath = path.join(__dirname, '..', 'data', 'new-articles.json')
  if (fs.existsSync(newArticlesPath)) {
    console.log('\nPaso 3/3: Escribiendo nuevos artículos a Google Sheets...')
    const auth = getAuthClient()
    const articles = JSON.parse(fs.readFileSync(newArticlesPath, 'utf8'))

    for (const article of articles) {
      await appendArticle(auth, article)
      console.log(`  → Agregado: ${article.titulo}`)
    }

    // Limpiar después de escribir
    fs.unlinkSync(newArticlesPath)
    console.log(`\n✅ ${articles.length} artículos agregados a la hoja`)
  } else {
    console.log('\nPaso 3/3: No hay nuevos artículos para agregar hoy')
  }
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
