---
name: redactor-blog
description: Ejecuta el flujo completo del "agente redactor" de blog SEO de stevia.com.co (Vitaliah SAS) -- toma el siguiente articulo en estado "idea" de content-calendar.yaml, lo redacta siguiendo las reglas de motorsinscripts.txt (tono, estructura HTML, tabla/guia rapida/infografia, tarjeta de producto), genera sus imagenes con Canva segun docs/guia-imagenes-canva.md, lo publica oculto en Shopify via GraphQL, corre el checklist de QA de 20 puntos, verifica el articulo ya publicado, actualiza el calendario y cierra con el inventario de articulos pendientes. USA ESTA SKILL SIEMPRE que el usuario pida seguir con el siguiente blog/articulo, "corramos la rutina", "el agente redactor", "publica el proximo", o cualquier variante de continuar el flujo de contenido de Vitaliah dentro de este repo -- incluso si no dice "skill" ni nombra el archivo explicitamente. NO uses esta skill para el motor mensual que agrega ideas nuevas al calendario (ese vive en seo-engine/, es un agente distinto) ni para editar un articulo ya publicado fuera de este flujo (ahi trabaja directo con el usuario sobre que cambiar).
---

# Agente redactor de blog -- Vitaliah / stevia.com.co

Esta skill orquesta el flujo de escritura y publicacion de un articulo de blog. **Las reglas y el
procedimiento reales viven en el repo, no aqui** -- esta skill es un punto de entrada corto que te
recuerda leerlos completos y en orden, porque `motorsinscripts.txt` se sigue corrigiendo cada vez
que se detecta un incidente real (tildes faltantes, elementos omitidos, velocidad de publicacion,
etc.). Copiar su contenido aqui lo dejaria desactualizado la primera vez que alguien corrija algo
en el archivo real y se te olvide tocar esta skill tambien.

## Por que existe esta skill

Sin ella, cada vez que alguien quiere publicar el siguiente articulo del calendario hay que pegar
manualmente el contenido de `motorsinscripts.txt` en el chat. Con la skill, basta con pedir
"seguimos con el siguiente blog" y el flujo completo arranca solo, siempre desde la version mas
reciente de las reglas.

## Que hacer al activarse

1. **Lee `motorsinscripts.txt` completo**, desde la raiz del repo (`/home/user/seo-rutinas/motorsinscripts.txt`
   si trabajas fuera del repo, o la ruta relativa si ya estas dentro). No resumas de memoria ni
   asumas que ya lo conoces de una corrida anterior -- el archivo cambia con el tiempo y trabajar
   sobre una version vieja en tu cabeza es exactamente el tipo de error que este documento existe
   para prevenir.
2. **Lee `content-calendar.yaml`** para identificar el siguiente articulo en estado `idea` (primera
   entrada en ese estado, respetando el orden del archivo -- normalmente se agota un cluster antes
   de pasar al siguiente).
3. **Sigue el Paso 1 al Paso 8 de `motorsinscripts.txt` en orden, sin saltar ninguno.** El propio
   archivo tiene ejemplos reales de que pasa cuando se salta un paso o se hace "de memoria" -- forman
   parte de por que las reglas dicen lo que dicen, no son burocracia decorativa.
4. **Cuando llegues al Paso 3.5 (imagenes de contexto) o a la infografia de A2.3**, lee tambien
   `docs/guia-imagenes-canva.md` completo -- tiene el proceso de generacion, los errores ya conocidos
   de Canva (texto no deseado, cifras inventadas, el `design_type: infographic` que siempre sale
   vertical) y como corregirlos sin regenerar desde cero.
5. **No te saltes el Paso 5 (QA de 20 puntos) ni el Paso 6.5 (verificacion post-publicacion).**
   Ambos existen porque en corridas reales se publico contenido incompleto (sin tildes, sin
   infografia, con la imagen destacada en null) y nadie lo noto hasta que el usuario abrio el
   articulo publicado. La disciplina de recorrer la lista completa, un item a la vez, escribiendo
   la respuesta de cada uno, es la unica razon por la que eso dejo de pasar.
6. **Cierra siempre con el Paso 8**: que se publico, si paso el QA, cuales de los tres elementos de
   A2.3 quedaron y por que si falta alguno, y el inventario de articulos en estado "idea" por
   cluster (actualizando tambien el bloque de comentario al inicio de `content-calendar.yaml`).

## Limite duro: maximo 1 articulo publicado por dia calendario

`motorsinscripts.txt` (Paso 6) exige consultar cuantos articulos tienen `publishedAt` en las
ultimas 24 horas antes de publicar. Si ya hay uno o mas: NO publiques otro, deja el borrador listo
(ya paso el QA) y dile al usuario en el Paso 8 que se publica el proximo dia disponible. Este limite
es fijo desde 2026-08-31 (ver "Cadencia de publicacion" en `CLAUDE.md`, horario objetivo 7:00 a.m.
hora Colombia) -- el 2026-08-31 se detectaron 41 articulos publicados en menos de 36 horas, un
patron de velocidad que puede leerse como spam/manipulacion por Google, y hubo que ocultar 36 de
vuelta. No es una sugerencia de "avisar si el ritmo parece alto": es un tope verificable, 1 por dia,
sin excepcion salvo que Julian la autorice explicitamente para un caso puntual.

## Errores ya cometidos que esta skill existe para no repetir

Estos son incidentes reales de este mismo proyecto, documentados con mas detalle dentro de
`motorsinscripts.txt` en el punto exacto donde aplican. Se resumen aqui porque son los que mas
facil se repiten si el flujo se sigue "por encima":

- **Tildes**: un articulo completo se redacto casi sin acentos (menos del 1% de las palabras
  llevaba tilde) porque nada pedia explicitamente una revision ortografica. Ahora el Paso 5 tiene
  un punto dedicado (proofreading de tildes, con una señal de alarma cuantificable) y no es opcional.
- **Elementos de sintesis (A2.3) omitidos en silencio**: se publico un articulo con datos
  comparables pero sin tabla, guia rapida ni infografia, y otra vez con solo 2 de los 3 sin
  avisarlo. El default ahora es incluir los tres cuando el tema tiene datos comparables; omitir
  alguno exige una razon explicita en el reporte, nunca una decision callada.
- **`isPublished`**: "oculto" significa `isPublished:true` (accesible por URL directa, sin
  promocionar) -- nunca `false` (eso lo dejaria inaccesible incluso para verificarlo).
- **Compartir el link antes de verificar la imagen destacada**: si `image.url` esta en null cuando
  WhatsApp/Facebook rastrean el link por primera vez, la miniatura queda pegada en blanco aunque se
  corrija despues. Verifica el Paso 6.5 completo antes de compartir el articulo en cualquier lado.
- **Imagenes de producto sueltas**: el patron viejo (`<img>` envuelto en un simple `<a>`) se
  reemplazo por la tarjeta de A2.4 (marco + beneficio parafraseado del propio articulo + boton) --
  usala desde el primer borrador en articulos nuevos.

Si detectas un incidente nuevo mientras corres esta skill, el patron a seguir es el mismo: corrige
el articulo real, y documenta la causa y la correccion en `motorsinscripts.txt` (o
`docs/guia-imagenes-canva.md` si es sobre imagenes) para que la proxima corrida no lo repita --
nunca lo dejes solo en el chat de esta sesion.
