# Reglas de redacción — Blog Vitaliah (stevia.com.co/blogs/noticias)

Este documento consolida **todas** las reglas que debe cumplir un artículo generado para este blog, sin importar quién lo redacte. Es la fuente de verdad única.

Origen de los estándares: auditoría del blog original (95+ artículos, 9 defectos sistemáticos) + benchmark contra artículos reales de Kick Ranking (agencia SEO contratada, ~2200 palabras / 11 H2 por artículo pilar) + hallazgos del checklist técnico de Avada SEO Suite (adoptados selectivamente, ver nota al final).

## 1. Identidad y tono

- Redactor: **Equipo Vitaliah** — organización, nunca una persona. Consistente en el campo autor y en cualquier firma dentro del texto (nunca 3 identidades distintas, como pasaba antes).
- Español, dirigido al cliente final en primera/segunda persona ("Descubre...", "tu rutina...").
- Frases mayormente cortas: evitar que una frase supere ~20-25 palabras. Preferir frases directas; dividir ideas complejas en dos frases en vez de una sola con muchas comas.
- Respetar el rol B2C/B2B del cluster — nunca mezclar tono de venta a consumidor final con tono de negocio (maquila) en el mismo artículo.

## 2. Estructura HTML

- **H1**: nunca dentro del `bodyHtml`. El tema de Shopify ya renderiza `article.title` como el H1 real de la página — un `<h1>` en el cuerpo lo duplicaría. El nivel superior dentro del cuerpo es `<h2>`.
- El **título del artículo** (= H1 real) debe ser **≤60 caracteres**.
- **Mínimo de secciones `<h2>`**: **8 para artículos "pilar", 4 para "cluster"** (basado en el artículo de referencia de Kick Ranking: 11 H2 en 2181 palabras, ~1 cada 200). Cada H2 debe cubrir un sub-tema concreto — dividir el contenido en secciones específicas y escaneables, nunca en pocos bloques largos.
- **Índice con anclas (TOC)**: obligatorio en artículos "pilar" (opcional en "cluster", solo si tiene 5+ H2). Va justo después del párrafo de introducción: una `<ul>` con `<a href="#slug-de-la-seccion">` por cada H2 principal, y cada `<h2>` correspondiente lleva su `id="slug-de-la-seccion"` (slugs cortos, minúsculas, con guiones).
- **Estructura sugerida — artículo pilar**:
  1. H2: Qué es [tema] (definición clara, keyword en el primer párrafo)
  2. H2: Beneficios / evidencia (con H3 por beneficio, citas reales)
  3. H2-H3 adicionales: desglosar evidencia/beneficios en varias secciones específicas, no un solo bloque
  4. H2: Cómo elegir / cómo usar (conecta con el catálogo, enlaces a producto)
  5. H2: Comparativa o tabla (si aplica)
  6. H2: Precauciones/contraindicaciones (si aplica al tema)
  7. H2: Preguntas frecuentes (marcar para JSON-LD FAQPage)
- **Estructura sugerida — artículo cluster**:
  1. H2: Respuesta directa a la pregunta del título, en el primer párrafo
  2. H2-H3: Desarrollo/evidencia, dividido en varias secciones específicas
  3. H2: Aplicación práctica (conecta con producto/colección)
  4. H2: Preguntas frecuentes (si el tema lo amerita)
- **Contenido comparativo** (2+ opciones/productos): elegir **una sola forma**, nunca ambas —
  - Tabla HTML real (`<table><thead><tr><th>...`) si se comparan 4+ criterios simétricos.
  - Pares de H3 "Ventajas de X" / "Desventajas de X" si es más cualitativo.
- **Sección "Mitos"** (opcional, solo si el tema tiene creencias populares falsas que valga la pena desmentir — común en salud): H2 "Mitos sobre [tema]" con 2-4 ítems "Mito: [creencia]" + párrafo que lo desmiente con fuente real si aplica.
- **CTA de negocio**: SOLO en artículos del cluster `maquila-b2b`, nunca en artículos B2C de producto/salud. Cierre con párrafo corto + enlace a `/pages/maquila-de-productos` (única URL de CTA verificada, no inventar otra), texto de ancla tipo "Cotiza tu maquila".

## 3. Longitud mínima

| Rol | Palabras mínimas (solo texto, sin HTML) |
|---|---|
| pilar | 1800 |
| cluster | 900 |

Kick Ranking publica pilares de ~2200 palabras — no resumir de más; desarrollar cada sección con profundidad real (evidencia, matices, ejemplos), nunca con relleno artificial.

**Nota deliberada**: Avada SEO Suite recomienda 600-1000 palabras como "óptimo". Esa regla se ignora a propósito — el propio artículo de referencia de Kick Ranking (2181 palabras) también la incumpliría, lo que confirma que es un estándar genérico desactualizado para este tipo de contenido competitivo. Ver sección 8.

## 4. Keyword principal

La keyword principal (`keyword_objetivo` del calendario) debe aparecer, de forma literal (por palabras significativas, no como frase exacta forzada — ver nota), en:

1. El H1 (título del artículo)
2. La **primera frase** del primer párrafo (no solo en algún lugar del párrafo)
3. Al menos un H2 o H3
4. La meta description
5. El cuerpo del artículo (cobertura general del tema)

No repetir la frase exacta más allá de eso — prioriza que se lea natural sobre repetir la frase forzadamente (evitar keyword stuffing).

**Nota técnica**: la comparación es por palabras significativas (se ignoran preposiciones/artículos: de, la, el, en, y, con, para, por, que, un, una...), no por substring exacto. Esto es intencional: un redactor real varía el orden o agrega preposiciones ("monk fruit Colombia" → "monk fruit **en** Colombia"), y eso no debe contar como ausencia de la keyword.

## 5. Enlaces internos

- **Mínimo 3 enlaces internos** por artículo, resueltos a URLs reales desde `content-calendar.yaml` (enlaces a artículos hermanos/pilar del mismo calendario) y `data/link-targets.yaml` (productos, colecciones, artículos ya existentes del blog).
- Usar la URL **exactamente** como viene resuelta — nunca modificarla, completarla ni corregirla, ni un carácter.
- Si una URL no se pudo resolver (`null`), **omitir ese enlace específico** — nunca inventar ni adivinar un slug.
- Insertar los enlaces de forma natural dentro del texto, nunca como lista al final.

## 6. Imágenes

- **Mínimo 2 imágenes** en el cuerpo (además de portada), cada una con `alt` descriptivo no vacío.
- Prioridad de fuente (en este orden):
  1. **`imagenesContexto`** del brief — ilustración de marca específica para el tema (no foto de producto genérica). Usar como imagen principal/de cabecera.
  2. **`imagenesProducto`** del enlace interno correspondiente — array de URLs reales de la galería de Shopify. Variar cuál se usa entre artículos del mismo cluster, no repetir siempre la primera.
  3. Si no hay ninguna URL real disponible, usar marcador `[IMAGEN: descripción + alt sugerido]`.
- Nunca inventar ni adivinar una URL de imagen que no venga literal en el brief.

## 7. Citas y evidencia

- Toda mención de un estudio/investigación debe enlazar la fuente real (PubMed, DOI, NCBI, o cualquier dominio externo verificable — no solo literatura médica; también sirven medios/informes de mercado para datos no clínicos).
- Si no se puede verificar una fuente real con la herramienta de búsqueda web, usar lenguaje genérico **sin atribución falsa**. Nunca inventar una cita ni un enlace.

## 8. Metadatos y campos de salida

| Campo | Regla |
|---|---|
| `metaTitle` | ≤60 caracteres |
| `metaDescription` | 140-160 caracteres, debe incluir la keyword principal |
| `excerpt` | 1-2 frases, no vacío |
| `tags` | ≥2, alineadas al cluster |
| `bodyHtml` | HTML válido para el editor de Shopify, sin `<h1>` |
| `faqJsonLd` | Si hay sección "Preguntas frecuentes", JSON-LD `FAQPage` como bloque **separado** (nunca embebido en `bodyHtml` — Shopify elimina los `<script>` al re-guardar el artículo desde el editor) |

Formato de salida esperado:
```json
{
  "metaTitle": "...",
  "metaDescription": "...",
  "excerpt": "...",
  "tags": ["...", "..."],
  "bodyHtml": "...",
  "faqJsonLd": "..." | null
}
```

## 9. Publicación

- **Siempre oculto** (`isPublished: false`) al crear/actualizar el artículo — nunca visible al público automáticamente. La publicación visible es una decisión manual humana, posterior al QA.
- Sin canibalización: el tema/keyword no debe solaparse ≥70% (similitud Jaccard de título) con un artículo ya existente del blog. Si hay solapamiento, ampliar el artículo existente en vez de crear uno nuevo.

## 10. Sobre Avada SEO Suite (contexto)

El checklist de Avada se revisó como segunda opinión. La mayoría de sus reglas de keyword (densidad, keyword en subtítulo, en meta, en introducción) dependen de que Avada tenga su propio campo interno "Palabra clave de enfoque" configurado manualmente por artículo en su UI — dato que vive solo dentro de la app de Avada, sin acceso programático. Las reglas de Avada que sí se adoptaron aquí (keyword en primera frase, keyword en algún H2/H3) están incorporadas en la sección 4. La regla de longitud de Avada (600-1000 palabras) se rechazó deliberadamente por contradecir el benchmark real de Kick Ranking — ver sección 3.
