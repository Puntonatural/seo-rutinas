# Guía de imágenes con Canva — Blog Vitaliah

Cómo generar las imágenes de un artículo cuando no hay una foto de producto real que encaje (o cuando el tema pide algo más "de marca" que un empaque). Basada en el proceso real usado para las 7 ilustraciones de contexto de los clusters actuales — incluye los errores que salieron y cómo se corrigieron, para no repetirlos.

---

## 1. Qué imágenes necesita un artículo

Cada artículo lleva **4 imágenes en total**: 2 de contexto (Canva) + 2 de producto (Shopify), con esta prioridad de fuente:

| Slot | Cuántas | Qué es | De dónde sale |
|---|---|---|---|
| **Imágenes de contexto** | 2 | Una va de cabecera, justo después de la introducción (y es además el "featured image" del artículo -- ver sección 5). La otra va repartida en el cuerpo, cerca de la sección con la que mejor conecte temáticamente. Representan el TEMA (el ingrediente, el concepto), nunca un producto específico. | Generadas en Canva (este documento). No las dos con el mismo estilo -- ver sección 3.1 sobre variar ilustración vs. realista. |
| **Imágenes de producto** | 2 | Repartidas en el cuerpo, junto a la sección donde se menciona el producto real. | Fotos **reales** de la galería del producto en Shopify -- nunca generadas, nunca de banco de imagenes generico. **SIEMPRE envueltas en un enlace `<a href="/products/<handle>">` al producto real** -- una imagen de producto sin enlace es un error, no un detalle menor (ver seccion 3.5). |

**Regla de oro**: las imágenes de contexto son las ÚNICAS que se generan con IA/Canva. Las imágenes de producto siempre son fotos reales del catálogo, enlazadas al producto -- variar cuál se usa de un artículo a otro del mismo cluster para no repetir siempre la misma.

Una imagen de contexto SÍ puede reutilizarse entre artículos del mismo cluster si ya existe y encaja tematicamente (revisa el body de un articulo hermano antes de generar una nueva), pero no fuerces la reutilizacion si el tema de este articulo especifico pide algo distinto -- por ejemplo "calambres y recuperacion muscular" necesita su propia imagen aunque el cluster "magnesio" ya tenga una sobre el sueño.

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

Pide una **ilustración o una composición fotorrealista**, no un póster ni una plantilla de evento — las plantillas con estructura fija (eventos, tarjetas de cita, infografías con cajas de estadística) son las que más fuerzan texto/datos inventados. El tipo de diseño más limpio en la práctica fue "fondo de pantalla" (`desktop_wallpaper`) pedido explícitamente como composición sin ningún bloque de texto.

**No generes las 2 imágenes de contexto de un artículo con el mismo estilo.** Alterna entre:
- **Ilustración watercolor/editorial** (botánica, iconos, minimalista) -- la plantilla de ejemplo abajo.
- **Fotografía realista de composición** (ingredientes, texturas, escenas de bienestar/ejercicio con siluetas, luz natural) -- mismas prohibiciones (cero texto, cero cifras, cero producto/empaque, cero rostro identificable) y misma paleta de marca, pero pidiendo explícitamente "fotografía realista" o "composición fotográfica editorial" en vez de "ilustración watercolor".

Usar solo ilustración para todo un articulo (o todo un cluster) se ve repetitivo -- variar el estilo entre las dos imágenes de contexto de un mismo artículo, y entre artículos de un mismo cluster.

Plantilla de instrucción que funcionó bien para ilustración (ejemplo real, cluster hongos adaptógenos):

> "Ilustración botánica editorial, formato horizontal, ABSOLUTAMENTE CERO TEXTO — ni títulos, ni frases, ni citas, ni firmas, ni fechas, ni porcentajes, ni ningún carácter tipográfico, en ningún idioma. Solo composición visual: [describe el sujeto: el hongo/fruto/producto/concepto] en estilo watercolor editorial, centrado, con fondo sólido color crema #F4F7F2. [Detalles del sujeto y colores]. Composición limpia, minimalista, mucho espacio negativo alrededor, sin ningún panel de color sólido superpuesto, sin ninguna caja de texto ni de cita."

Plantilla equivalente para estilo realista (mismo cluster, misma prohibición de texto/cifras/producto/rostro):

> "Fotografía realista de composición editorial, formato horizontal, ABSOLUTAMENTE CERO TEXTO — ni títulos, ni frases, ni citas, ni firmas, ni fechas, ni porcentajes, ni ningún carácter tipográfico, en ningún idioma. Solo composición visual: [describe el sujeto] con luz natural suave, fondo desenfocado en tonos crema y verde, estilo editorial de bienestar. Sin producto ni empaque visible, sin persona real ni rostro identificable -- si se necesita una figura humana, solo manos, piernas o una silueta a contraluz. Paleta de marca Vitaliah (ver sección 4)."

Para temas de estilo de vida/bienestar (no un ingrediente físico), pide una silueta genérica en vez de una persona real, y sé igual de explícito prohibiendo texto, en cualquiera de los dos estilos.

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
2. Subir el archivo a Shopify (Contenido → Archivos, o el equivalente vía API/conector, ej. mutación `fileCreate` con `originalSource` apuntando a la URL de exportación de Canva) — esto le da una URL real y estable en el CDN de Shopify. Espera a que el archivo quede `fileStatus: READY` antes de usar su URL.
3. Usar esa URL (nunca la URL temporal de exportación de Canva, que expira) tanto en el `<img>` de cabecera del body como en el campo `image` del artículo -- ver 3.5.

### 3.5 — Dos errores que no se deben repetir

**a) Imagen de producto sin enlace.** Cada imagen de producto en el body va envuelta en un enlace a su producto real, nunca suelta:

```html
<a href="/products/<handle-real-del-producto>"><img src="..." alt="..." width="600"></a>
```

Un `<img>` de producto sin el `<a>` alrededor es un error de QA, aunque la imagen en sí sea correcta y el texto ya tenga un enlace de texto al mismo producto en otro lugar del párrafo.

**b) Olvidar el "featured image" del artículo.** El `<img>` de cabecera dentro del `body` es SOLO el contenido del artículo -- el tema de Shopify además necesita el campo `image` del artículo (`ArticleCreateInput.image` / `ArticleUpdateInput.image`, con `url` y `altText`) para renderizar el banner destacado que aparece ENCIMA del título, en la parte superior de la página. Si se omite, el banner queda con un placeholder roto ("Next, add a featured image to your blog post") aunque el body tenga todas sus imágenes bien puestas. Usa ahí la MISMA URL y alt que la primera imagen de contexto del body -- nunca generes una imagen distinta solo para ese campo. Después de publicar (o actualizar), verifica con una query que `image.url` no sea `null`.

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

Estilo general: editorial de bienestar, minimalista -- ilustración tipo watercolor/iconografía plana, o fotografía realista de composición (ingredientes, texturas, escenas de bienestar) alternando entre las dos imágenes de contexto de cada artículo (ver 3.1). Lo que nunca debe ser: una foto de producto/empaque (esas van en las imágenes de producto, no en las de contexto) ni un estilo corporativo genérico de stock.

---

## 5. Resumen del checklist antes de dar un artículo por listo

Por cada imagen de contexto generada (deben ser 2 por artículo):
- [ ] Cero texto (revisado visualmente, no solo pedido en el prompt)
- [ ] Cero cifras/estadísticas inventadas
- [ ] Cero foto de producto/empaque
- [ ] Cero persona real o rostro identificable
- [ ] Paleta de marca Vitaliah correcta
- [ ] Exportada como PNG y subida a Shopify con URL estable
- [ ] Las 2 imágenes de contexto del artículo no usan el mismo estilo (una ilustración, una realista, o revisa que al menos varíen visualmente)

---

## 6. Infografías de síntesis (distinto de las imágenes de contexto)

Esto es un tipo de imagen DIFERENTE al de las secciones 1-5 de esta guía.
Las imágenes de contexto de la sección 2 **prohíben todo texto** -- una
infografía de síntesis es justo lo contrario: existe para mostrar texto y
datos reales de forma visual, como complemento opcional de un artículo
"pilar" (ver `motorsinscripts.txt`, regla A2.3). Por eso el proceso de
generación y de revisión es distinto, y bastante más estricto en la parte
de verificación.

**Regla de oro de esta sección**: en las imágenes de contexto el riesgo es
que Canva invente texto donde no debería haber ninguno; en una infografía
el riesgo es que Canva invente, cambie o redondee un dato donde SÍ debería
haber texto, pero exacto. Un vistazo al thumbnail no detecta un "150 mg"
que Canva convirtió en "160 mg", o una cifra que desapareció. Verificar
visualmente no es suficiente aquí.

Proceso:

1. **Redacta tú mismo, antes de generar nada, el texto exacto** que debe
   aparecer en la infografía: título, cada sección, cada cifra o dato. Todo
   ese texto debe ser un resumen fiel de algo que ya está escrito y citado
   en el cuerpo del artículo -- nunca redactes para la infografía un dato
   que no esté ya en el texto del artículo.
2. Genera la infografía (`generate-design` con `design_type: "infographic"`)
   pasando ese texto literal en el prompt, con una instrucción explícita de
   no agregar ninguna cifra o afirmación que no esté en ese texto. Incluye
   la paleta de marca (sección 4).
3. Convierte la mejor candidata en diseño editable (`create-design-from-
   candidate`).
4. **Verificación obligatoria de texto** (esto reemplaza al checklist visual
   de la sección 3.2, que aquí no basta): usa `read-design` con
   `filter.fields` incluyendo `design_content` para leer el texto real que
   quedó en el diseño. Compara cada cifra, rango o afirmación contra tu
   lista aprobada del paso 1, uno por uno. Si algo no coincide exactamente
   (un número distinto, un dato de más, una afirmación reformulada que
   cambia el sentido), no la uses -- ajusta el prompt y regenera. Recién
   ahí revisa también el thumbnail para el aspecto visual (paleta, orden,
   legibilidad).
5. Exporta como PNG (igual que sección 3.4) y súbela a Shopify con
   `fileCreate` para obtener una URL estable del CDN.
6. Insértala en el body en el punto del artículo donde mejor sintetice lo
   ya explicado (típicamente al cierre de la sección de dosis/uso práctico,
   antes de precauciones o antes de las preguntas frecuentes) -- no cerca
   del inicio, donde va la imagen de contexto de cabecera de la sección 2.

Esta infografía NO cuenta como una de las 2 imágenes de contexto
obligatorias de la sección 1 -- es un elemento adicional y opcional, no un
reemplazo.

Del artículo completo:
- [ ] 2 imágenes de contexto (Canva) + 2 imágenes de producto (Shopify) = 4 imágenes en total
- [ ] Cada imagen de producto está envuelta en `<a href="/products/<handle>">` al producto real
- [ ] El campo `image` del artículo (featured/banner) está seteado con la misma URL que la primera imagen de contexto -- verificado con una query que devuelva `image.url` no nulo
