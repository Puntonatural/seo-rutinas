# seo-rutinas — Instrucciones generales

Repositorio unificado de SEO para stevia.com.co (Vitaliah SAS).

## Dos agentes, un repo

### 1. Motor mensual — `seo-engine/`
Corre el primer lunes de cada mes.
- Recolecta datos de Google Search Console
- Analiza oportunidades de keywords (Google Autocomplete)
- Agrega nuevas entradas con estado `idea` a `content-calendar.yaml` (raíz del repo)
- Lee las instrucciones completas en `seo-engine/CLAUDE.md`

**Pendiente de ajustar (ver seo-engine/CLAUDE.md):** `seo-engine/src/calendar.js`
todavía escribe `calendars/YYYY-MM.yaml` con un esquema distinto (keyword_principal,
sin estado, sin enlaces_internos_obligatorios) — falta adaptarlo para que
anexe directamente a `content-calendar.yaml` con el esquema del agente redactor.

### 2. Agente redactor — `motorsinscripts.txt`
Corre cada vez que hay un artículo pendiente en el calendario.
- Lee `content-calendar.yaml` (raíz del repo) para saber qué artículo publicar
- Sigue el playbook de `motorsinscripts.txt` para redactar y publicar en Shopify
- Actualiza el estado del artículo en el YAML (`publicado_oculto`, `canibalizacion_detectada`
  o `qa_fallido`) y hace commit

## Flujo mensual

```
1er lunes → Motor mensual agrega artículos "idea" a content-calendar.yaml
Semana 1-4 → Agente redactor toma la primera entrada "idea" y la publica (oculta)
```

## Setup de credenciales (local, nunca en Git)

Copiar en `seo-engine/` (NO commitear):
- `credentials.json` — desde `Dashboards/gsc-mcp-server/`
- `token.json` — desde `Dashboards/gsc-mcp-server/` (o correr `node seo-engine/authorize.js`)
