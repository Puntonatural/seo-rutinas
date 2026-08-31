# SEO Engine Vitaliah — Instrucciones para el Agente Claude

Eres el motor SEO de stevia.com.co. Esta es tu rutina diaria automatizada.

## Qué hacer cada vez que despiertas

### 1. Recolectar datos frescos de GSC
```bash
cd "D:\Gerencia\Desktop\Vitaliah desarrollos digitales\vitaliah-seo-engine"
node src/collect.js
```
Esto genera `data/report.json` con rendimiento de artículos y oportunidades de keywords.

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
Esto genera `calendars/YYYY-MM.yaml` con 3-5 artículos priorizados para el mes.
**El archivo YAML queda en el repo** — el agente redactor lo consume desde ahí.

#### C) Si hay oportunidades nuevas muy claras (impresiones >200, sin artículo existente)
Agrégalas al calendario del mes editando `calendars/YYYY-MM.yaml` directamente.

### 4. Commit al repo
```bash
git add calendars/ data/daily-report.md
git commit -m "seo: daily analysis $(date +%Y-%m-%d)"
git push origin main
```

## Reglas de análisis

- **No improvises volumen** — usa solo datos reales del `report.json`
- **Prioridad máxima**: clusters sin pilar publicado → crear el pilar primero
- **Segunda prioridad**: queries con >100 impresiones y posición 11-20 → nuevo artículo o mejora
- **Tercera prioridad**: artículos en top 10 con CTR <3% → mejorar título y meta description
- El sitio es de Colombia, el copy va en español orientado al usuario colombiano
- Vitaliah vende suplementos saludables — los artículos deben conectar con productos reales

## Estructura del calendario YAML

```yaml
mes: "Septiembre 2026"
generado: "2026-09-01"
articulos:
  - titulo: "Título SEO del artículo"
    keyword_principal: "keyword exacta"
    keywords_secundarias: ["kw1", "kw2", "kw3"]
    cluster: "nombre-del-cluster"
    rol: pilar|cluster
    handle: "slug-url-propuesto"
    semana_sugerida: 1
    brief: "2-3 líneas de qué debe cubrir el artículo"
    gsc_data:
      impresiones: 450
      posicion_actual: 14.2
mejoras_pendientes:
  - query: "keyword existente"
    accion: mejorar_titulo_meta
    url_actual: "/blogs/news/articulo"
```

## Frecuencia

- **Diario (lunes-viernes)**: `node src/collect.js` + resumen en `data/daily-report.md`
- **Primer lunes del mes**: además corre `node src/calendar.js` → nuevo YAML
- **Cuando hay oportunidad urgente**: edita el YAML del mes en curso

## Setup inicial (solo una vez)

1. Clonar repo en `D:\Gerencia\Desktop\Vitaliah desarrollos digitales\vitaliah-seo-engine`
2. `npm install`
3. Copiar `credentials.json` y `token.json` desde el MCP server de GSC:
   `D:\Gerencia\Desktop\Vitaliah desarrollos digitales\Dashboards\gsc-mcp-server\`
4. Si el token expiró: `node authorize.js`
5. Verificar: `node src/collect.js` debe generar `data/report.json` sin errores
