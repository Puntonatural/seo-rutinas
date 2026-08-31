import { google } from 'googleapis'

// ID de la hoja "Vitaliah - Calendario SEO Completo"
const SPREADSHEET_ID = '1FQ1R2DtwgNWod97NpjCyDLKMYyzmg19crUMW_u3d8l4'
const SHEET_NAME = 'Hoja 1'

export async function readCalendar(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:K500`,
  })

  const rows = res.data.values || []
  if (rows.length === 0) return []

  const headers = rows[0]
  return rows.slice(1).map((row) => {
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = row[i] || ''
    })
    return obj
  })
}

export async function appendArticle(auth, article) {
  const sheets = google.sheets({ version: 'v4', auth })

  // article debe tener: Título, Cluster, Rol, Estado, "Palabra clave", "Keywords secun", "Enlaces internos obligatorios", "Handle propuesto", "Handle final", "Article GID"
  const row = [
    article.titulo || '',
    article.cluster || '',
    article.rol || 'cluster',
    article.estado || 'idea',
    article.palabraClave || '',
    article.keywordsSecundarias || '',
    article.enlacesInternos || '',
    article.handlePropuesto || '',
    article.handleFinal || '',
    article.articleGid || '',
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:J`,
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  })
}

export async function updateArticleStatus(auth, rowIndex, status) {
  const sheets = google.sheets({ version: 'v4', auth })

  // rowIndex es 1-based desde la hoja (fila 1 = headers, fila 2 = primera data)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!D${rowIndex + 2}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[status]] },
  })
}

export async function getSheetId(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID })
  return res.data.sheets?.[0]?.properties?.sheetId
}
