import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json')
const TOKEN_PATH = path.join(__dirname, '..', 'token.json')

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/webmasters',
]

function loadCredentials() {
  if (fs.existsSync(CREDENTIALS_PATH)) {
    return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'))
  }
  if (process.env.GSC_CREDENTIALS_JSON) {
    return JSON.parse(process.env.GSC_CREDENTIALS_JSON)
  }
  throw new Error(
    'No existe credentials.json ni la variable de entorno GSC_CREDENTIALS_JSON'
  )
}

function loadToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
  }
  if (process.env.GSC_TOKEN_JSON) {
    return JSON.parse(process.env.GSC_TOKEN_JSON)
  }
  throw new Error(
    'No existe token.json ni la variable de entorno GSC_TOKEN_JSON — corre el MCP de GSC primero para autorizar'
  )
}

export function getAuthClient() {
  const credentials = loadCredentials()
  const { client_id, client_secret, redirect_uris } = credentials.installed

  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  const token = loadToken()
  auth.setCredentials(token)

  // Refresh token automático — solo persiste en disco si token.json existe como archivo local.
  // En el entorno remoto (credenciales vía env vars) el refresh_token de GSC_TOKEN_JSON sigue
  // siendo válido para pedir un access_token nuevo en cada corrida.
  if (fs.existsSync(TOKEN_PATH)) {
    auth.on('tokens', (tokens) => {
      const current = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
      const updated = { ...current, ...tokens }
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(updated, null, 2))
    })
  }

  return auth
}
