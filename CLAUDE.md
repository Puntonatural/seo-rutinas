# seo-rutinas — Instrucciones generales

Repositorio unificado de SEO para stevia.com.co (Vitaliah SAS).

## Dos agentes, un repo

### 1. Motor mensual — `seo-engine/`
Corre el primer lunes de cada mes.
- Recolecta datos de Google Search Console
- Analiza oportunidades de keywords (Google Autocomplete)
- Agrega los artículos nuevos priorizados (estado: idea) al calendario
  maestro: `seo-engine/calendars/content-calendar.yaml`
- Lee las instrucciones completas en `seo-engine/CLAUDE.md`

### 2. Agente redactor — `motorsinscripts.txt`
Corre cada vez que hay un artículo pendiente en el calendario.
- Lee `seo-engine/calendars/content-calendar.yaml` para saber qué artículo
  publicar (la primera entrada en orden con estado: idea)
- Sigue el playbook de `motorsinscripts.txt` para redactar y publicar en Shopify
- Actualiza el estado del artículo en el YAML a `publicado` y hace commit

## Calendario maestro

`seo-engine/calendars/content-calendar.yaml` es la única fuente de datos de
ambos agentes — reemplazó a un intento previo de usar Google Sheets (que
dejaba al agente redactor sin forma de escribir el resultado de vuelta) y a
la idea original de un archivo separado por mes (`YYYY-MM.yaml`): al no
haber una dimensión de "mes" real en los datos (clusters con artículos
publicados en agosto, otros aún en idea), un solo archivo evolutivo es más
simple que mantener varios. El propio YAML trae un encabezado con el detalle
de su esquema.

Flujo típico:

```
1er lunes → Motor mensual agrega entradas nuevas (estado: idea) al YAML
Cada vez que hay un pendiente → Agente redactor toma la primera "idea",
                                  la publica oculta en Shopify, y comitea
                                  el YAML actualizado (estado: publicado)
```

## Setup de credenciales (local, nunca en Git)

Copiar en `seo-engine/` (NO commitear):
- `credentials.json` — desde `Dashboards/gsc-mcp-server/`
- `token.json` — desde `Dashboards/gsc-mcp-server/` (o correr `node seo-engine/authorize.js`)
