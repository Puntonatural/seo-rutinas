# seo-rutinas — Instrucciones generales

Repositorio unificado de SEO para stevia.com.co (Vitaliah SAS).

## Dos agentes, un repo

### 1. Motor mensual — `seo-engine/`
Corre el primer lunes de cada mes.
- Recolecta datos de Google Search Console
- Analiza oportunidades de keywords (Google Autocomplete)
- Genera el calendario del mes: `seo-engine/calendars/YYYY-MM.yaml`
- Lee las instrucciones completas en `seo-engine/CLAUDE.md`

### 2. Agente redactor — `motorsinscripts.txt`
Corre cada vez que hay un artículo pendiente en el calendario.
- Lee `seo-engine/calendars/YYYY-MM.yaml` para saber qué artículo publicar
- Sigue el playbook de `motorsinscripts.txt` para redactar y publicar en Shopify
- Actualiza el estado del artículo en el YAML a `publicado` y hace commit

## Flujo mensual

```
1er lunes → Motor mensual genera calendars/YYYY-MM.yaml
Semana 1  → Agente redactor publica artículo 1 (semana_sugerida: 1)
Semana 2  → Agente redactor publica artículo 2
Semana 3  → Agente redactor publica artículo 3
Semana 4  → Agente redactor publica artículo 4 (si hay)
```

## Setup de credenciales (local, nunca en Git)

Copiar en `seo-engine/` (NO commitear):
- `credentials.json` — desde `Dashboards/gsc-mcp-server/`
- `token.json` — desde `Dashboards/gsc-mcp-server/` (o correr `node seo-engine/authorize.js`)
