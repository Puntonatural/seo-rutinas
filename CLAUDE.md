# seo-rutinas — Instrucciones generales

Repositorio unificado de SEO para stevia.com.co (Vitaliah SAS).

## Dos agentes, un repo

### 1. Motor mensual — `seo-engine/`
Corre el primer lunes de cada mes.
- Recolecta datos de Google Search Console
- Analiza oportunidades de keywords (Google Autocomplete)
- Agrega nuevas entradas con estado `idea` a `content-calendar.yaml` (raíz del repo)
- Lee las instrucciones completas en `seo-engine/CLAUDE.md`

### 2. Agente redactor — `motorsinscripts.txt`
Corre cada vez que hay un artículo pendiente en el calendario. Invócalo con la skill
`redactor-blog` (`.claude/skills/redactor-blog/`) para no tener que pegar el playbook
completo cada vez -- la skill solo apunta a los archivos reales de abajo, nunca los copia,
así que siempre corre sobre la versión más reciente.
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
