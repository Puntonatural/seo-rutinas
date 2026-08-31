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

export function getAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'))
  const { client_id, client_secret, redirect_uris } = credentials.installed

  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('No existe token.json — corre el MCP de GSC primero para autorizar')
  }

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
  auth.setCredentials(token)

  // Refresh token automático
  auth.on('tokens', (tokens) => {
    const current = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
    const updated = { ...current, ...tokens }
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(updated, null, 2))
  })

  return auth
}
