import fetch from 'node-fetch'

// Google Autocomplete — sin API key, gratis
export async function getAutocomplete(query, lang = 'es', country = 'co') {
  const url = `https://suggestqueries.google.com/complete/search?q=${encodeURIComponent(query)}&client=firefox&hl=${lang}&gl=${country}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    const data = await res.json()
    return data[1] || []
  } catch {
    return []
  }
}

// Expande keywords para un cluster dado
export async function expandCluster(clusterName, seedKeywords = []) {
  const suggestions = new Set()

  const seeds = seedKeywords.length > 0 ? seedKeywords : [clusterName]

  for (const seed of seeds.slice(0, 3)) {
    const results = await getAutocomplete(seed)
    results.forEach((s) => suggestions.add(s))

    // También buscar con prefijos comunes
    const prefixes = ['como ', 'que es ', 'para que sirve ', 'beneficios de ']
    for (const prefix of prefixes.slice(0, 2)) {
      const withPrefix = await getAutocomplete(prefix + seed)
      withPrefix.forEach((s) => suggestions.add(s))
      await sleep(200)
    }

    await sleep(300)
  }

  return [...suggestions]
}

// Google Trends vía API pública (sin auth)
export async function getTrendData(keywords) {
  // Usa la API de Google Trends de forma básica
  // Retorna si la keyword está trending o no en CO
  const results = {}
  for (const kw of keywords.slice(0, 5)) {
    const url = `https://trends.google.com/trends/api/autocomplete/${encodeURIComponent(kw)}?hl=es&tz=-300`
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      const text = await res.text()
      // La API de trends devuelve ")]}'," antes del JSON
      const json = JSON.parse(text.replace(/^\)\]\}',\n/, ''))
      results[kw] = json?.default?.topics?.slice(0, 3) || []
    } catch {
      results[kw] = []
    }
    await sleep(500)
  }
  return results
}

// Related searches desde la SERP de Google (vía public API no oficial)
export async function getRelatedSearches(query) {
  const suggestions = await getAutocomplete(query + ' ')
  const long = await getAutocomplete(query + ' colombia')
  return [...new Set([...suggestions, ...long])].slice(0, 10)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
