# seo-rutinas — Instrucciones generales

Repositorio unificado de SEO para stevia.com.co (Vitaliah SAS).

## Dos agentes, un repo

### 1. Motor mensual — `seo-engine/`
Corre el primer lunes de cada mes.
- Recolecta datos de Google Search Console
- Analiza oportunidades de keywords (Google Autocomplete)
- Agrega nuevas entradas con estado `idea` a `content-calendar.yaml` (raíz del repo)
- Lee las instrucciones completas en `seo-engine/CLAUDE.md`

### 2. Agente redactor — skill `redactor-blog`
Corre **como maximo una vez por dia calendario** (cadencia fija desde 2026-08-31, ver
"Cadencia de publicacion" abajo -- antes de esa fecha no habia un limite explicito, lo
que llevo a publicar 41 articulos en menos de 36 horas y tener que ocultar 36 de vuelta
por riesgo de que Google lo lea como spam). Invócalo con la skill `redactor-blog`
(`.claude/skills/redactor-blog/SKILL.md`) -- ese archivo ES el playbook completo (reglas
de contenido + proceso paso a paso), no hay una copia separada en la raíz del repo desde
el 2026-09-01 (antes existía como `motorsinscripts.txt`, eliminado para que no pudiera
quedar desalineado del skill que lo invocaba).
- Lee `content-calendar.yaml` (raíz del repo) para saber qué artículo publicar
- Sigue las reglas de `.claude/skills/redactor-blog/SKILL.md` para redactar y publicar en Shopify
- Actualiza el estado del artículo en el YAML (`publicado_oculto`, `canibalizacion_detectada`
  o `qa_fallido`) y hace commit

## Cadencia de publicacion

Regla dura desde 2026-08-31: **maximo 1 articulo publicado (isPublished:true) por dia
calendario**, sin excepcion salvo que Julian la autorice explicitamente para un caso
puntual. El Paso 6 de la skill verifica esto contra `publishedAt` antes de publicar.
Horario objetivo: **7:00 a.m. hora Colombia (UTC-5)** -- sujeto a que Julian lo confirme
o ajuste; nada se ejecuta solo hasta que exista una automatizacion real (Trigger de
Claude Code on the web) o alguien invoque la skill `redactor-blog` ese dia.

## Flujo mensual

```
1er lunes → Motor mensual agrega artículos "idea" a content-calendar.yaml
Todos los dias (max 1/dia) → Agente redactor toma la primera entrada "idea" y la publica (oculta)
```

## Setup de credenciales (local, nunca en Git)

Copiar en `seo-engine/` (NO commitear):
- `credentials.json` — desde `Dashboards/gsc-mcp-server/`
- `token.json` — desde `Dashboards/gsc-mcp-server/` (o correr `node seo-engine/authorize.js`)
