# Cometa · Design System

Sistema de diseño para la web (Bright Scholars Club / "Cometa"), la plataforma educativa y el pitch deck.
Fuente de verdad de los tokens: `src/styles.css`. Este documento describe cómo usarlos.

## 1. Principios

1. **Juguetón pero legible.** Los estudiantes tienen dificultades de aprendizaje: la jerarquía, el contraste y el espacio mandan sobre la decoración.
2. **Bloques con sombra dura.** Tarjetas con borde navy de 2.5px y sombra desplazada (estilo "pop"). Dan sensación de juego sin usar degradados complejos.
3. **Pocos colores, usados con intención.** Navy para estructura, rosa para acción, el resto como acento temático.
4. **Movimiento con propósito.** Animaciones cortas que confirman una acción; respetar `prefers-reduced-motion`.

## 2. Color

| Token | Valor (oklch) | Uso |
|---|---|---|
| `navy` | `0.30 0.13 268` | Texto de marca, botón primario, bordes |
| `navy-deep` | `0.22 0.10 270` | Sombras pop, fondo de secciones oscuras |
| `pink` | `0.66 0.24 356` | Acción principal (CTA), foco (`ring`) |
| `pink-soft` | `0.95 0.035 350` | Fondos suaves, estados seleccionados |
| `sunshine` | `0.87 0.17 92` | Logros, becas, premios |
| `sky` | `0.68 0.15 248` | Clases y materias de ciencia |
| `sky-soft` | `0.95 0.03 248` | Fondos de información |
| `mint` | `0.74 0.14 165` | Progreso positivo, "completado" |
| `mint-soft` | `0.95 0.04 165` | Fondos de éxito |
| `background` | `0.99 0.006 320` | Fondo de página |
| `foreground` | `0.24 0.10 270` | Texto principal |
| `muted-foreground` | `0.50 0.06 270` | Texto secundario |
| `destructive` | `0.60 0.22 27` | Errores |

**Reglas**
- Texto sobre `pink` o `navy` siempre en `pink-foreground` / `navy-foreground` (blanco).
- Texto sobre `sunshine` o `sky` usar `navy-deep` (contraste AA).
- No usar rosa para texto pequeño sobre blanco: el contraste no alcanza para lectura cómoda.

## 3. Tipografía

| Rol | Fuente | Token |
|---|---|---|
| Títulos y botones | **Fredoka** (redondeada) | `font-display` |
| Cuerpo y UI | **Nunito** | `font-sans` |

- Cuerpo mínimo **16px**, interlineado **1.6**. Para contenido de lectura de estudiantes, 18px.
- Evitar bloques de texto en mayúsculas y cursiva larga: dificultan la lectura.
- Títulos de sección: `font-display`, `font-bold`, `tracking-tight`.

## 4. Espaciado y radios

- Escala de 4px (`p-1` = 4px). Separación entre secciones: `py-16` en escritorio.
- Radios: `radius-lg` = 1.25rem por defecto; tarjetas `radius-2xl`; botones pill (`rounded-full`).

## 5. Elevación y bordes

| Estilo | Clase | Uso |
|---|---|---|
| Pop | `card-pop` | Tarjetas principales |
| Pop pequeño | `shadow-pop-sm` | Chips, badges |
| Pop rosa | `shadow-pop-pink` | Resaltar CTA |
| Suave | `shadow-soft` | Modales, elementos flotantes |

Borde de tarjetas y botones: `2.5px solid navy-deep`.

## 6. Fondos

- `bg-night`: fondo de hero con manchas rosa y celeste sobre navy profundo.
- `bg-candy`: degradado rosa para banners de promoción.
- `bg-dots`: patrón de puntos sutil para secciones claras.

## 7. Componentes base

Los componentes de `src/components/ui/` (shadcn/ui) ya usan los tokens. Componentes propios:

- **`SiteHeader` / `SiteFooter`**: navegación de las 5 pantallas.
- **`PageHero`**: encabezado de cada pantalla con fondo `bg-night`.
- **Tones (`tones.ts`)**: `TONE_BG` y `TONE_SOFT` asignan color por categoría (pink, navy, sky, sunshine, mint). Usar para materias, profesores y tarjetas de becas.

### Botones
- Primario: `bg-pink text-pink-foreground`, pill, `shadow-pop-sm`, `lift` al pasar el mouse.
- Secundario: `bg-navy text-navy-foreground`.
- Outline: borde navy 2.5px, fondo blanco.
- Tamaño mínimo de toque **44px**.

### Estados
- Foco: anillo `ring` (rosa), 3px. Nunca quitar el foco visual.
- Deshabilitado: `opacity-50`, sin sombra.
- Éxito: `mint`. Error: `destructive` con texto explicativo, no solo color.

## 8. Accesibilidad

- Contraste mínimo WCAG AA (4.5:1 para texto normal).
- No transmitir información solo por color (usar icono o texto).
- Animaciones: desactivar con `prefers-reduced-motion`.
- Etiquetas en todos los campos de formulario.

## 9. Movimiento

| Animación | Clase | Uso |
|---|---|---|
| Flotar | `animate-float` | Ilustraciones decorativas |
| Balanceo | `animate-wiggle` | Llamar atención (notificación, racha) |
| Aparecer | `animate-pop` | Confirmaciones, insignias ganadas |
| Brillo | `animate-twinkle` | Estrellas decorativas |

## 10. Uso en el pitch deck

- Fondo de portada: `bg-night`. Títulos en `font-display` navy o blanco.
- Un solo color de acento por diapositiva (rosa o sunshine), nunca más de dos.
- Cifras clave en tarjetas `card-pop`, con número grande y etiqueta corta.
- Logo y nombre "Cometa" en navy sobre fondos claros, blanco sobre `navy-deep`.

## 11. Cómo extender

1. Agregar el token nuevo en `:root` de `src/styles.css` y en el bloque `@theme inline`.
2. Documentarlo en este archivo, con su uso y contraste.
3. No usar valores de color fijos (`#hex`) en componentes: usar siempre el token.
