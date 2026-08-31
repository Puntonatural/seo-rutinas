# seo-rutinas — Motor SEO Vitaliah

## Calendario de contenidos

El calendario editorial fuente (títulos, cluster, rol, keyword objetivo,
keywords secundarias, enlaces internos obligatorios, handles) se elaboró
originalmente en esta hoja de Google Sheets:

https://docs.google.com/spreadsheets/d/1FQ1R2DtwgNWod97NpjCyDLKMYyzmg19crUMW_u3d8l4/edit?gid=1944168060#gid=1944168060

El 2026-08-31 se migró su contenido completo a `content-calendar.yaml` en
este repo, porque no existe (ni existía) un conector de Google Sheets con
capacidad de escritura a nivel de celda en este entorno — solo un conector
genérico de Google Drive (leer/subir archivos completos, sin editar
celdas). El motor SEO automático (ver `motorsinscripts.txt`) necesita poder
actualizar el estado de cada artículo (`idea` → `publicado_oculto`, etc.)
en cada corrida sin depender de un humano presente, así que `content-calendar.yaml`
es ahora la fuente canónica que el motor lee y escribe directamente vía git.

Si se agregan artículos nuevos al calendario, agrégalos en
`content-calendar.yaml` (no en la hoja de Sheets, que ha quedado como
referencia histórica/de respaldo).
