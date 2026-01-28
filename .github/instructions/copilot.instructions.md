---
applyTo: '**'
---
# IEEE Computer Society PUCV - Landing Page

## Resumen del Proyecto
Landing page para el Capítulo Estudiantil de IEEE Computer Society de la Pontificia Universidad Católica de Valparaíso (PUCV). Sitio estático que presenta qué es el capítulo, actividades, directiva y cómo unirse.

## Stack Técnico
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Astro | 5.x | Framework SSG (Static Site Generation) |
| Tailwind CSS | 4.x | Utilidades CSS |
| shadcn/ui | latest | Componentes UI (React) |
| TypeScript | strict | Tipado estático |

## Comandos de Desarrollo
```bash
cd LandingPage
npm install          # Instalar dependencias
npm run dev          # Servidor en localhost:4321
npm run build        # Build a ./dist/
npm run preview      # Preview del build
npx astro add <pkg>  # Agregar integraciones
```

## Estructura del Proyecto
```
LandingPage/
├── src/
│   ├── assets/           # Imágenes y SVGs importables
│   ├── components/       # Componentes Astro (.astro)
│   │   └── ui/           # Componentes shadcn/ui
│   ├── layouts/          # Layout.astro (plantilla base)
│   ├── pages/            # Rutas (index.astro = /)
│   └── content/          # Content Collections (futuro)
├── public/               # Assets estáticos (favicon, og-image)
├── astro.config.mjs      # Configuración Astro
└── tailwind.config.mjs   # Configuración Tailwind
```

## Identidad Visual IEEE Computer Society

### Paleta de Colores
```css
/* Colores Primarios IEEE CS */
--ieee-cs-orange: #E87722;   /* Naranja institucional CS */
--ieee-cs-black: #000000;    /* Negro para texto */

/* Colores Secundarios */
--ieee-blue: #00629B;        /* Azul IEEE (solo logo master) */
--neutral-50: #FAFAFA;       /* Fondos claros */
--neutral-900: #171717;      /* Texto oscuro */
```

### Tipografía
- **Fuente principal:** Inter (sans-serif)
- **Fallbacks:** system-ui, -apple-system, sans-serif
- **Cargar desde CDN:**
```html
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
```
- **Pesos recomendados:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Estilo Visual
- Minimalista con espacios amplios (padding generoso)
- Bordes sutiles (`border-neutral-200`)
- Esquinas redondeadas (`rounded-lg`, `rounded-xl`)
- Sombras suaves para cards (`shadow-sm`, `shadow-md`)

## Convenciones de Código

### Componentes Astro
```astro
---
// 1. Imports
import { Button } from '@/components/ui/button';

// 2. Props interface
interface Props {
  title: string;
  description?: string;
}

// 3. Destructuring con defaults
const { title, description = '' } = Astro.props;
---

<!-- 4. Template con Tailwind -->
<section class="py-16 px-4">
  <h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
</section>
```

### Reglas Críticas
1. **NO usar `client:load`** en componentes estáticos - Astro renderiza en build time
2. **Usar `client:visible`** solo para interactividad real (formularios, modales)
3. **Importar assets** con path relativo: `import logo from '../assets/logo.svg'`
4. **Accesibilidad:** incluir `aria-label` en botones icon-only, `alt` en imágenes

## Secciones de la Landing Page

### 1. Hero
- Título impactante: "Innovación • Comunidad • Tecnología"
- Subtítulo: Breve descripción del capítulo
- CTA principal: "Únete al Capítulo" (botón naranja `bg-[#E87722]`)
- CTA secundario: "Conoce más" (outline)

### 2. ¿Qué es IEEE CS?
- Explicar IEEE Computer Society globalmente
- Destacar el capítulo PUCV local
- Incluir estadísticas (375,000+ miembros, 1,000+ capítulos, 157+ países)

### 3. ¿Qué Hacemos?
- Cards con actividades: Workshops, Charlas técnicas, Hackathones, Networking
- Usar iconos de Lucide React

### 4. Directiva
- Grid de miembros con foto, nombre, cargo
- Links a LinkedIn/GitHub opcionales

### 5. Únete
- Beneficios de ser miembro
- Pasos para unirse
- Formulario o link a registro IEEE

## Validación Pre-commit
Antes de hacer commit, verificar:
1. `npm run build` - Sin errores de compilación
2. Revisar en localhost:4321 que renderice correctamente
3. Lighthouse score > 90 en Performance y Accessibility
