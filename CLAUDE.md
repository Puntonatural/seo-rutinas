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

## Rutina confirmada (2026-08-31)

Julián validó el flujo completo tras el primer artículo (magnesio pilar) y
el segundo (tipos de magnesio, cluster) como la rutina a seguir sin pedir
confirmación adicional en cada corrida:

0. **Cada corrida diaria procesa 3 articulos** (repetir los pasos 1-8 tres
   veces, o hasta agotar los articulos en estado `idea` si quedan menos de
   3).
1. Elegir el primer artículo en estado `idea` de `content-calendar.yaml`
   (en orden).
2. Chequeo de canibalización contra los artículos ya publicados del blog
   "noticias" (via Shopify).
3. Resolver enlaces internos obligatorios contra datos reales de Shopify
   (productos/colecciones activos, articulos ya publicados) -- nunca
   contra un producto en estado DRAFT; si el enlace obligatorio del
   calendario apunta a un producto en DRAFT, sustituirlo por el
   equivalente ACTIVE más cercano y dejarlo anotado en el campo `nota`
   de esa entrada del calendario.
4. Redactar cumpliendo `motorsinscripts.txt` (Parte A, incluida la
   politica de imagenes de la seccion A6: imagen destacada + banner de
   apertura generados con Canva, contexto no producto; 2+ imagenes
   intermedias mas de contexto tambien via Canva; exactamente 1 foto de
   producto por articulo, enlazada a su pagina; toda imagen de Canva se
   sube primero a Shopify via `fileCreate` para obtener URL permanente
   antes de usarla).
5. QA riguroso (conteo real de palabras y H2 via shell, nunca a ojo).
6. Publicar SIEMPRE oculto (`isPublished: false`) en Shopify.
7. Actualizar la entrada del articulo en `content-calendar.yaml` (estado,
   handle_final, article_gid, fecha_publicacion_oculta, notas de
   imagenes/sustituciones) y comprometer los cambios a git.
8. Reportar al usuario que se publicó, con la URL del admin de Shopify.

Este es el proceso estándar: no se requiere pedir permiso paso a paso en
cada corrida futura, salvo que aparezca un bloqueo real (dato faltante,
canibalización detectada, QA fallido) contemplado en las Reglas de Oro
del playbook.

## Referencias científicas: prioridad estratégica, no solo checklist

Julián enfatizó que agregar referencias científicas reales (enlaces a
PubMed, NCBI, NIH ODS, revistas indexadas, etc.) a los artículos es una
prioridad estratégica: le da peso y credibilidad real a la evidencia
citada, no es solo un requisito de QA para cumplir (regla A7 del
playbook). Al redactar, buscar activamente estudios/fuentes verificables
para respaldar cada afirmación de beneficio o mecanismo -- mientras más
sólido y verificable el respaldo científico citado, mejor. Nunca inventar
una cita, pero sí invertir tiempo real en la búsqueda web de fuentes
antes de dar por hecho que algo "no tiene evidencia disponible".
