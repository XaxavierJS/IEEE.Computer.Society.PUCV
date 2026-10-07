# Guía de mantenimiento del sitio

Sitio estático en Astro. Todo el contenido editable vive en `src/data/`.

## Rutina
| Frecuencia | Tarea | Dónde |
|---|---|---|
| Semanal | Revisar fechas de cierre; marcar o quitar convocatorias vencidas | `src/data/oportunidades.json` (el estado abierta/cerrada se calcula solo al compilar; actualizar `reviewed`) |
| Tras cada evento (≤72 h) | Agregar la ficha de la actividad con fecha, resultados reales y fotos con texto alternativo | `src/data/actividades.json` + imágenes en `public/assets/` |
| Mensual | `npm run build && node scripts/check-links.mjs --external`; revisar a mano los enlaces que bloquean bots (403/401/999) | `scripts/check-links.mjs` |
| Mensual | Lighthouse (móvil) en Inicio, Oportunidades, Actividades y Beneficios; accesibilidad ≥ 95 | — |
| Cada cambio de directiva | Actualizar directiva y contacto; traspasar accesos | `src/data/team.json`, Footer, Contacto |

## Reglas editoriales
- No publicar cifras, asistentes ni fechas sin respaldo interno.
- Cada oportunidad lleva requisitos, cierre (o nota si no hay), fuente oficial y fecha de revisión.
- Los textos de imagen (`alt`) son obligatorios.
- Texto naranja sobre fondo claro: usar `text-ieee-orange-text`, no `text-ieee-orange`.

## Roles
Editor (verifica datos y marca IEEE), Webmaster (publica y comprueba móvil/teclado/enlaces), Responsable de oportunidades (revisión semanal), Responsable de actividades (entrega datos tras eventos).

## Traspaso anual
Entregar: acceso al repositorio y al dominio, esta guía, estado de formularios y analítica, y un registro de enlaces que requieren verificación manual.

## Comandos
`npm install` · `npm run dev` · `npm run build` · `npm run optimize:images`
