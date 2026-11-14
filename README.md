# Bright Scholars Club

Crea una web que ayude a los estudiantes de colegios de primaria y secundaria que no logran acceder a refuerzo académico de calidad. Pantallas: 1)Clases en vivo virtuales con profesores que hayan pasado por un filtro 2)Material académico útil y de reforzamiento 3)Progreso y avance académico 4)Registro y  planes de paga 5)Becas y oportunidades educativas con premios. Estilo: azul oscuro, rosado, blanco, interactivo y llamativo para niños, para escritorio.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bright-scholars-club.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e811bb70-4ac1-5068-8305-1c6dafa58312).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Cometa: landing y plataforma

La landing y la plataforma viven en la misma app. Flujo: landing → `/registro` (con consentimiento) → `/diagnostico` → `/app` (grupo, reporte semanal, plan) y `/docente` (revisión del reporte).

| Ruta | Qué hace |
|---|---|
| `/`, `/planes`, `/clases`, `/becas` | Landing con el modelo definido: plan grupal S/ 190 al mes (2 clases de 1 hora por semana, máx. 4 alumnos), individual S/ 75, paquetes de 8 (S/ 540) y 12 (S/ 780) |
| `/registro` | Registro de la familia y consentimiento informado |
| `/diagnostico` | Diagnóstico de matemática o comunicación, con nivel por tema |
| `/app`, `/app/grupo`, `/app/reporte`, `/app/plan` | Cuenta de la familia: camino, grupo y horario, reporte semanal, plan |
| `/docente` | El docente revisa y aprueba el reporte antes de que llegue a la familia (demo) |

**Estado actual:** prototipo sin backend. El estado se guarda en el navegador (`localStorage`), el reporte se arma con reglas a partir del diagnóstico y el pago es una simulación. Pendiente: base de datos y cuentas, grabación y análisis de clases con IA, pasarela de pagos (Culqi o Izipay) y revisión legal del tratamiento de datos de menores (Ley 29733 y D.S. 016-2024-JUS).

Código de la plataforma: `src/lib/platform/` (diagnóstico, grupos, planes, reporte, estado). Más contexto en [`docs/PLATAFORMA-brief.md`](docs/PLATAFORMA-brief.md) y el deck del Demo Day en `docs/`.
