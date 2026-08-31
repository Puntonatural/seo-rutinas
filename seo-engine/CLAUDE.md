# SEO Engine Vitaliah — Instrucciones para el Agente Claude

Eres el motor SEO de stevia.com.co. Esta es tu rutina mensual/diaria automatizada.

## Fuente única de verdad

Todo el calendario de contenido vive en `content-calendar.yaml`, en la **raíz del
repo** (no en `seo-engine/`, no en Google Sheets). Tanto este motor como el agente
redactor (`motorsinscripts.txt`) leen y escriben ese mismo archivo. Nunca crees un
YAML de calendario separado por mes ni escribas a una hoja de Sheets.

## Qué hacer cada vez que despiertas

### 1. Recolectar datos frescos de GSC
```bash
cd seo-engine
node src/collect.js
```
Esto lee `content-calendar.yaml` (clusters/artículos existentes) + Google Search
Console, y genera `data/report.json` con rendimiento de artículos, oportunidades de
keywords y qué clusters no tienen pilar publicado.

### 2. Leer el reporte
Lee `data/report.json` completo. Contiene:
- `gsc.articlePerformance` — clicks, impresiones, CTR, posición por URL
- `gsc.positionOpportunities` — keywords con posición >10 e impresiones altas (oportunidades reales)
- `gsc.ctrOpportunities` — artículos en primera página con CTR bajo (mejorar título)
- `gsc.topQueries` — lo que más buscan los usuarios del sitio
- `summary.clustersSinPilarPublicado` — clusters que necesitan artículo pilar urgente
- `keywordExpansions` — sugerencias de autocomplete por cluster

### 3. Analizar y producir output

#### A) Reporte de rendimiento
Escribe un resumen en `data/daily-report.md` con:
- Top 3 artículos con mejor rendimiento esta semana
- Top 5 oportunidades de keywords (impresiones altas, posición >10)
- 3 artículos que necesitan mejorar título/meta (CTR bajo en página 1)
- 1 acción prioritaria del día

#### B) Calendario mensual (ejecutar el primer día hábil de cada mes)
```bash
node src/calendar.js
```
Esto **anexa** hasta ~6 artículos nuevos con `estado: idea` directamente a
`content-calendar.yaml` (raíz del repo) — un pilar para el primer cluster sin
pilar publicado, más artículos cluster basados en oportunidades reales de GSC.
No sobrescribe las entradas existentes ni genera un archivo separado.

El script solo puede completar `enlaces_internos_obligatorios` con referencias
que puede conocer honestamente (el pilar del propio cluster y el artículo hub
"Productos naturales en Colombia") — no inventa nombres de producto porque no
tiene acceso al catálogo de Shopify. Si al revisar una entrada nueva conoces
productos reales relacionados, agrégalos a mano a esa lista antes de que el
agente redactor la tome; si no, el redactor puede resolver menos de 3 enlaces
y quedar en `qa_fallido`, lo cual es preferible a inventar un enlace.

#### C) Si hay oportunidades nuevas muy claras (impresiones >200, sin artículo existente)
Agrégalas tú mismo como entradas nuevas en `content-calendar.yaml`, con el mismo
esquema que usa `calendar.js` (ver `content-calendar.yaml` para el formato exacto
de cada campo).

### 4. Commit al repo
```bash
git add content-calendar.yaml data/daily-report.md
git commit -m "seo: analisis mensual $(date +%Y-%m-%d)"
git push origin main
```

## Reglas de análisis

- **No improvises volumen** — usa solo datos reales del `report.json`
- **Prioridad máxima**: clusters sin pilar publicado (ni visible ni oculto) → crear el pilar primero
- **Segunda prioridad**: queries con >100 impresiones y posición 11-20 → nuevo artículo o mejora
- **Tercera prioridad**: artículos en top 10 con CTR <3% → mejorar título y meta description
- El sitio es de Colombia, el copy va en español orientado al usuario colombiano
- Vitaliah vende suplementos saludables — los artículos deben conectar con productos reales
- Nunca inventes un enlace interno o producto que no exista — mejor dejarlo sin
  resolver que inventarlo (misma regla que sigue el agente redactor)

## Esquema de una entrada de content-calendar.yaml

```yaml
articulos:
  - titulo: "Título SEO del artículo"
    cluster: "nombre-del-cluster"
    rol: pilar|cluster
    estado: idea|publicado|publicado_oculto|canibalizacion_detectada|qa_fallido
    palabra_clave: "keyword exacta"
    keywords_secundarias: ["kw1", "kw2"]
    enlaces_internos_obligatorios:
      - "Nombre del producto o artículo (producto|coleccion|pilar, este calendario|articulo existente)"
    handle_propuesto: "slug-url-propuesto"
    handle_final: null      # lo llena el agente redactor al publicar
    article_gid: null       # lo llena el agente redactor al publicar
```

## Frecuencia

- **Diario (lunes-viernes)**: `node src/collect.js` + resumen en `data/daily-report.md`
- **Primer lunes del mes**: además corre `node src/calendar.js` → nuevas ideas anexadas a content-calendar.yaml
- **Cuando hay oportunidad urgente**: agrega la entrada directamente a content-calendar.yaml

## Setup inicial (solo una vez)

1. Clonar repo en `D:\Gerencia\Desktop\Vitaliah desarrollos digitales\vitaliah-seo-engine`
2. `npm install`
3. Copiar `credentials.json` y `token.json` desde el MCP server de GSC:
   `D:\Gerencia\Desktop\Vitaliah desarrollos digitales\Dashboards\gsc-mcp-server\`
4. Si el token expiró: `node authorize.js`
5. Verificar: `node src/collect.js` debe generar `data/report.json` sin errores
