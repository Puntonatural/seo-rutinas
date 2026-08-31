# Agente SEO Vitaliah — Configuración

## Rutina diaria (ejecutar cada mañana)

### Paso 1: Recolectar datos
```bash
cd "D:\Gerencia\Desktop\Vitaliah desarrollos digitales\vitaliah-seo-engine"
node src/collect.js
```

### Paso 2: Leer y analizar
Lee estos dos archivos:
1. `agent/prompt.md` — instrucciones completas de análisis
2. `data/report.json` — datos frescos de GSC + Google Sheets

### Paso 3: Producir output
Siguiendo el prompt, genera:
- Resumen de rendimiento
- Oportunidades de keywords
- Acciones de mejora en artículos existentes
- Calendario mensual (si es lunes 1 de cada mes)
- JSON de nuevos artículos → guardar en `data/new-articles.json`

### Paso 4: Escribir a Sheets
```bash
node src/run.js
```
(Este paso solo si hay `data/new-articles.json` generado)

## Frecuencia sugerida
- Análisis de rendimiento: diario (lunes a viernes)
- Generación de calendario: primer lunes del mes
- Escritura de ideas a Sheets: cuando el análisis encuentre 3+ oportunidades nuevas

## Configuración del Scheduled Task en Claude
Usar `/schedule` con este comando:
- Hora: 8:00 AM hora Colombia (UTC-5)
- Días: lunes a viernes
- Directorio: `D:\Gerencia\Desktop\Vitaliah desarrollos digitales\vitaliah-seo-engine`
- Tarea: "Ejecuta el análisis SEO diario para stevia.com.co siguiendo agent/prompt.md con los datos de data/report.json generados por node src/collect.js"
