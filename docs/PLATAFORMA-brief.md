# COMETA · Brief de la plataforma (lo que aparece después de la landing)

> Úsalo como prompt/brief en Lovable u otra herramienta. Estilo y tokens: `DESIGN_SYSTEM.md` del repo `alessandracurilla-sys/bright-scholars-club` (navy, rosa, blanco; Fredoka + Nunito).

## 1. Qué es
Plataforma web de tutoría virtual para estudiantes de **1.° a 3.° de secundaria en Lima** (matemática y comunicación). Cada alumno hace un **diagnóstico**, entra a un **grupo por nivel (máx. 4)** con un **docente constante**, recibe **2 clases de 1 hora por semana** y su familia recibe un **reporte semanal generado con IA** a partir de las clases grabadas.

## 2. Usuarios (roles)
| Rol | Qué necesita |
|---|---|
| **Familia (quien paga)** | Registrar al hijo, pagar, ver el avance y el reporte semanal, hablar con el docente |
| **Estudiante** | Entrar a su clase, hacer el diagnóstico, ver su ruta y sus logros |
| **Docente** | Ver sus grupos, el diagnóstico de cada alumno, dar la clase, revisar y aprobar el reporte antes de enviarlo |
| **Admin COMETA** | Formar grupos, asignar docentes, ver asistencia y pagos, gestionar becas y colegios aliados |

## 3. Flujo principal (de la landing a la clase)
1. **Landing** → botón "Empieza con una clase de prueba gratis".
2. **Registro de la familia**: datos del padre/madre, datos del hijo (nombre, grado, colegio), elegir matemática o comunicación. Aceptar **consentimiento informado** (grabación y análisis con IA de las clases; ver sección 7).
3. **Diagnóstico inicial** (30-45 min, lo hace el alumno en la plataforma): preguntas por tema; resultado = nivel por tema.
4. **Asignación a grupo**: el sistema propone un grupo del mismo nivel y grado, en 2-3 bloques de horario fijos (ej. lun-mié 5 pm). El grupo abre con 3 alumnos.
5. **Clase de prueba gratis** → elegir plan y **pagar**.
6. **Clases**: 2 por semana de 1 hora, mismo docente, sala de video con la ruta del grupo.
7. **Reporte semanal** a la familia (email/WhatsApp + panel).
8. **Reajuste**: cada semana el docente actualiza la ruta según el reporte; cada 4 semanas, mini-diagnóstico de avance.

## 4. Pantallas (MVP)
**Familia**
- Inicio: estado del hijo, próxima clase, último reporte
- Reporte semanal (asistencia, avance por tema antes→después, "lo que costó", "ajuste de la próxima semana")
- Progreso histórico (gráfico por tema, metas, insignias)
- Planes y pagos (grupal, individual; historial)
- Mensajes con el docente

**Estudiante**
- Diagnóstico (preguntas una por una, barra de progreso, sin presión)
- Mi ruta y mis metas
- Mis clases (próximas, enlace a la sala)
- Logros e insignias (ya existe en el prototipo de la landing)

**Docente**
- Mis grupos y horario
- Ficha del alumno (diagnóstico, avance, reportes previos)
- Preparar clase (ruta sugerida por el diagnóstico)
- Revisar y aprobar el reporte generado por IA antes de enviarlo

**Admin**
- Formación de grupos (alumnos por nivel/horario, mínimo 3, máximo 4)
- Asistencia y alertas (alumno con 2 faltas seguidas)
- Pagos, planes y becas
- Colegios aliados (códigos de convenio, lista de alumnos)

## 5. Planes y precios (hipótesis a validar)
- **Grupal**: S/190 al mes (2 clases de 1 h por semana, máx. 4 alumnos, diagnóstico y reporte semanal incluidos). No hay clase grupal suelta; la prueba es la primera clase gratis.
- **Individual**: clase suelta S/75 · paquete de 8 S/540 · paquete de 12 S/780 (con vencimiento de 60 días).
- Precios con IGV incluido. Pago con tarjeta y billeteras (Culqi o Izipay).

## 6. IA: qué hace y qué no
| Función | Entrada | Salida |
|---|---|---|
| Diagnóstico | Respuestas del alumno | Nivel por tema y ruta sugerida |
| Análisis de clase | Transcripción de la sesión (audio con separación de voces) | Participación, temas trabajados, errores frecuentes |
| Reporte semanal | Análisis + asistencia + resultados | Borrador del reporte para la familia |

**Reglas**
- El **docente revisa y aprueba** cada reporte antes de enviarlo (la IA no envía nada sola).
- La IA **orienta, no diagnostica**: los reportes dicen "avance estimado", nunca un diagnóstico clínico.
- Guardar la **transcripción** y **borrar el audio/video** a los pocos días (definir el plazo con asesoría legal).
- Medir y mostrar siempre el **antes → después** con el mini-diagnóstico.

## 7. Privacidad y menores (obligatorio, no dejar para después)
- Ley 29733 de Protección de Datos Personales y su reglamento (D.S. 016-2024-JUS): los datos de menores requieren **consentimiento de los padres**; voz e imagen son datos personales.
- Enviar audio o transcripciones a proveedores de IA fuera del Perú exige cumplir las reglas de transferencia internacional de datos.
- Consentimiento visible, en lenguaje simple, con opción de retirar el permiso.
- Esto no es asesoría legal: consultar a un abogado antes del piloto.

## 8. Modelo de datos (borrador)
`familia` · `estudiante` (grado, colegio, familia_id) · `docente` · `diagnostico` (estudiante, fecha, nivel_por_tema) · `grupo` (docente, nivel, horario, cupo_max=4) · `inscripcion` (estudiante, grupo, plan) · `sesion` (grupo, fecha, duración, estado) · `asistencia` (sesion, estudiante) · `analisis_sesion` (sesion, resumen, temas, errores) · `reporte_semanal` (estudiante, semana, contenido, estado: borrador/aprobado/enviado) · `pago` (familia, plan, monto, estado) · `consentimiento` (familia, versión, fecha) · `colegio_aliado` (convenio, alumnos).

## 9. Prioridad del MVP
1. Registro con consentimiento + diagnóstico + asignación de grupo
2. Reserva de clase de prueba y pagos
3. Sala de clase (puede ser Google Meet con enlace) y asistencia
4. **Reporte semanal con revisión del docente** (el diferenciador)
5. Panel de progreso de la familia
6. Panel admin, becas y colegios aliados (después)

## 10. Métricas que deben medirse desde el día 1
Registros · diagnósticos completados · % que pasa a clase de prueba · % que paga · **asistencia a clases (meta ≥ 80%)** · retención a 3 meses · avance en el diagnóstico antes → después · % de reportes aprobados por el docente.

## 11. Fuera del MVP (por ahora)
App móvil nativa · primaria · otros cursos · pagos recurrentes automáticos complejos · chat entre estudiantes.

## 12. Tono y diseño
Juguetón pero legible: tarjetas con borde navy y sombra "pop", botones grandes (mín. 44 px), contraste AA, fuente mínima 16 px, sin información solo por color, animaciones cortas y respetando `prefers-reduced-motion`.
