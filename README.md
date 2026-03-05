# IEEE Computer Society PUCV - Sitio Oficial

Sitio estático del Capítulo Estudiantil IEEE Computer Society PUCV.

## Stack

- Astro 5.x
- Tailwind CSS 4.x
- TypeScript (strict)

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Estructura real del proyecto

```
.
├── public/
│   ├── assets/
│   ├── CNAME
│   ├── robots.txt
│   └── google4965f4bfe2e7f1a2.html
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── beneficios/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   ├── index.astro
│   │   └── beneficios/index.astro
│   └── styles/
├── .github/workflows/deploy.yml
├── astro.config.mjs
└── package.json
```

## Gestión de contenido

- Directiva: `src/data/team.json`
- Beneficios: `src/data/benefits-grouped.json`
- Documentos: `src/data/documents-grouped.json`
- Navegación: `src/data/navLinks.ts`

## SEO y dominio

- Canonical y metadatos: `src/layouts/Layout.astro`
- Dominio del sitio: `astro.config.mjs`
- Robots: `public/robots.txt`
- Sitemap: generado por `@astrojs/sitemap` en build

## Checklist editorial (antes de publicar)

- Evitar años rígidos en títulos visibles salvo que sea indispensable.
- Evitar textos sensibles al tiempo (ej: días específicos) si no se actualizan automáticamente.
- Verificar que enlaces críticos estén en `https`.
- Revisar ortografía y consistencia de términos (ej: Hackathons/Hackatones).

## Checklist técnico (antes de merge)

- Ejecutar `npm run build` sin errores.
- Revisar que `robots.txt` apunte a `https://www.ieeepucv.computer/sitemap-index.xml`.
- Confirmar que canonical y `site` usen el mismo host.

## Deploy

El deploy se realiza por GitHub Actions con `.github/workflows/deploy.yml`.
