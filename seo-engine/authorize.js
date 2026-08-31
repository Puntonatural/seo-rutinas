/**
 * authorize.js — corre UNA SOLA VEZ para obtener token con todos los scopes
 * Uso: node authorize.js
 */
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import http from 'http'
import { URL } from 'url'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json')
const TOKEN_PATH = path.join(__dirname, 'token.json')

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/webmasters',
]

const { installed } = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'))
const oauth2Client = new google.auth.OAuth2(
  installed.client_id,
  installed.client_secret,
  'http://localhost:3457'
)

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
})

console.log('\n=== AUTORIZACIÓN GOOGLE — SEO Engine Vitaliah ===')
console.log('Scopes: Search Console + Google Sheets')
console.log('\nAbriendo navegador...')
console.log('Si no abre, copia esta URL:\n')
console.log(authUrl)
console.log('\nEsperando en http://localhost:3457 ...\n')

exec(`start "" "${authUrl}"`)

const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://localhost:3457')
    const code = u.searchParams.get('code')
    if (!code) {
      res.writeHead(400)
      res.end('No se recibió código')
      return
    }
    const { tokens } = await oauth2Client.getToken(code)
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))

    // También actualizar el token del MCP server del GSC
    const gscTokenPath = path.join(
      __dirname, '..', 'Dashboards', 'gsc-mcp-server', 'token.json'
    )
    if (fs.existsSync(gscTokenPath)) {
      fs.writeFileSync(gscTokenPath, JSON.stringify(tokens, null, 2))
      console.log('Token actualizado también en gsc-mcp-server/')
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h2 style="color:#2D7D46">✅ Autorización exitosa</h2>
        <p>Token guardado con acceso a Search Console + Google Sheets.</p>
        <p>Puedes cerrar esta ventana.</p>
      </body></html>
    `)
    console.log('✅ Token guardado en token.json')
    console.log('Ahora puedes correr: node src/collect.js\n')
    server.close()
    process.exit(0)
  } catch (err) {
    res.writeHead(500)
    res.end('Error: ' + err.message)
    console.error('Error:', err.message)
    server.close()
    process.exit(1)
  }
})

server.listen(3457, () => {
  console.log('Servidor escuchando en puerto 3457...')
})

server.on('error', (err) => {
  console.error('Error en servidor:', err.message)
  process.exit(1)
})
