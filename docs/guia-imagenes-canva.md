# Guía de imágenes con Canva — Blog Vitaliah

Cómo generar las imágenes de un artículo cuando no hay una foto de producto real que encaje (o cuando el tema pide algo más "de marca" que un empaque). Basada en el proceso real usado para las 7 ilustraciones de contexto de los clusters actuales — incluye los errores que salieron y cómo se corrigieron, para no repetirlos.

---

## 1. Qué imágenes necesita un artículo

Cada artículo lleva **mínimo 2 imágenes** en el cuerpo (regla `docs/reglas-articulos.md` sección 6), con esta prioridad de fuente:

| Slot | Qué es | De dónde sale |
|---|---|---|
| **Imagen principal / de contexto** | La imagen de cabecera, justo después de la introducción. Representa el TEMA (el ingrediente, el concepto), no un producto específico. | Ilustración de marca generada en Canva (este documento) — **una por cluster**, reutilizable en todos los artículos de ese cluster. |
| **Imágenes intermedias** | 1 o más, repartidas en el cuerpo, normalmente junto a la sección donde se menciona un producto concreto. | Fotos **reales** de la galería del producto en Shopify — nunca generadas, nunca de banco de imágenes genérico. |

**Regla de oro**: la imagen principal es la ÚNICA que se genera con IA/Canva. Las imágenes intermedias siempre son fotos reales del catálogo — variar cuál se usa de un artículo a otro del mismo cluster para no repetir siempre la misma.

No se genera una imagen nueva por artículo — se genera **una por cluster** y se reutiliza en todos sus artículos (pilar + subtemas). Generar una nueva para cada uno de los 54 artículos sería un desperdicio de esfuerzo y, como se ve abajo, cada generación necesita revisión manual.

---

## 2. Qué NO debe tener la imagen principal

Esto no es opcional — son los errores reales que salieron al generar las 7 imágenes actuales:

- **Cero texto de cualquier tipo.** Ni títulos, ni citas, ni firmas, ni fechas, ni marcas de agua. Aunque se lo pidas explícitamente ("cero texto"), la herramienta de generación con frecuencia mete una caja de cita ("Embrace the natural world...") o un placeholder roto (literalmente el texto "N/A" visible). **Siempre hay que revisar el resultado a ojo antes de darlo por bueno.**
- **Cero cifras o estadísticas inventadas.** Un intento generó "90% de efectividad en la memoria" y "75% de reducción del estrés" sin que nadie lo pidiera — cifras completamente inventadas para un suplemento de salud. Esto es especialmente delicado por el marco regulatorio INVIMA. Si el resultado incluye cualquier número de "efectividad" o dato clínico, **descártalo**, no lo edites — no hay forma de saber si el resto del contenido visual también está "alucinando".
- **Cero foto de producto/empaque.** El objetivo es justamente lo contrario de la foto de producto repetida — es una ilustración de marca (botánica, iconos, estilo editorial), no un mockup de envase.
- **Cero personas reales o rostros identificables.** Si el tema necesita una figura humana (ej. "vida activa"), debe ser una silueta genérica sin rasgos, nunca el retrato de alguien.
- **Paleta de marca Vitaliah**, siempre — ver colores exactos en la sección 4.

---

## 3. Proceso paso a paso

### 3.1 — Generar

Pide una **ilustración**, no un póster ni una plantilla de evento — las plantillas con estructura fija (eventos, tarjetas de cita, infografías con cajas de estadística) son las que más fuerzan texto/datos inventados. El tipo de diseño más limpio en la práctica fue "fondo de pantalla" (`desktop_wallpaper`) pedido explícitamente como composición sin ningún bloque de texto.

Plantilla de instrucción que funcionó bien (ejemplo real, cluster hongos adaptógenos):

> "Ilustración botánica editorial, formato horizontal, ABSOLUTAMENTE CERO TEXTO — ni títulos, ni frases, ni citas, ni firmas, ni fechas, ni porcentajes, ni ningún carácter tipográfico, en ningún idioma. Solo composición visual: [describe el sujeto: el hongo/fruto/producto/concepto] en estilo watercolor editorial, centrado, con fondo sólido color crema #F4F7F2. [Detalles del sujeto y colores]. Composición limpia, minimalista, mucho espacio negativo alrededor, sin ningún panel de color sólido superpuesto, sin ninguna caja de texto ni de cita."

Para temas de estilo de vida/bienestar (no un ingrediente físico), pide una silueta genérica en vez de una persona real, y sé igual de explícito prohibiendo texto.

### 3.2 — Revisar el resultado

Antes de aceptar nada:
1. ¿Tiene texto de cualquier tipo (incluida una caja de cita, una fecha, un placeholder roto)? → seguir a 3.3.
2. ¿Tiene una cifra o estadística? → **descartar y regenerar desde cero**, no editar.
3. ¿Es una foto/mockup de producto en vez de una ilustración? → regenerar con una instrucción más explícita ("NO fotos de producto ni empaques").
4. ¿Usa la paleta de marca correctamente? → si usa otro color dominante (ej. morado), regenerar especificando la paleta de nuevo.
5. Si todo lo anterior está limpio → usar directamente.

### 3.3 — Si tiene texto no deseado pero la ilustración en sí está bien

No hace falta descartar y volver a generar — es más rápido editar el mismo diseño:
1. Convertir el resultado generado en un diseño editable.
2. Abrir el diseño y localizar los elementos de texto (suelen venir agrupados con una caja de color sólido detrás).
3. Borrar esos elementos (la caja Y el texto) — dejar solo la imagen/ilustración de fondo.
4. Confirmar el cambio antes de guardar (comparar el resultado visualmente).
5. Guardar los cambios de forma permanente.

### 3.4 — Exportar y publicar

1. Exportar el diseño final como PNG, calidad alta.
2. Subir el archivo a Shopify (Contenido → Archivos, o el equivalente vía API/conector) — esto le da una URL real y estable en el CDN de Shopify.
3. Usar esa URL como la imagen principal del artículo (nunca la URL temporal de exportación, que expira).

---

## 4. Paleta y estilo de marca (obligatorio en todo prompt)

Tomado de las guías de identidad visual de Vitaliah:

```
Verde bosque:  #1E3D2F  (headers, CTAs)
Verde medio:   #2D7D46  (acentos)
Verde salvia:  #7BA68A  (bordes)
Salvia pálido: #C8DDD0  (fondos de cards)
Fondo crema:   #F4F7F2  (fondo principal)
Dorado:        #B8943F  (detalles/acento premium)
Texto oscuro:  #1A2E1F
```

Estilo general: editorial de bienestar, minimalista, ilustración tipo watercolor o iconografía plana — nunca fotorrealista de producto, nunca corporativo genérico de stock.

---

## 5. Resumen del checklist antes de dar una imagen por lista

- [ ] Cero texto (revisado visualmente, no solo pedido en el prompt)
- [ ] Cero cifras/estadísticas inventadas
- [ ] Cero foto de producto/empaque
- [ ] Cero persona real o rostro identificable
- [ ] Paleta de marca Vitaliah correcta
- [ ] Exportada como PNG y subida a Shopify con URL estable
- [ ] Una sola imagen por cluster, reutilizada en todos sus artículos (no una por artículo)
