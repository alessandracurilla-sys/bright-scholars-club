// Precios y planes de Cometa (hipótesis a validar con la landing y entrevistas). Montos en soles, IGV incluido.

export type PlanId = "grupal" | "ind-1" | "ind-8" | "ind-12";

export type PlanOption = {
  id: PlanId;
  kind: "grupal" | "individual";
  name: string;
  price: number;
  unit: string;
  sessions: number | null;
  detail: string;
};

export const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "grupal",
    kind: "grupal",
    name: "Plan Grupal",
    price: 190,
    unit: "al mes",
    sessions: 8,
    detail: "2 clases de 1 hora por semana · hasta 4 alumnos del mismo nivel · mismo docente",
  },
  { id: "ind-1", kind: "individual", name: "Clase suelta", price: 75, unit: "por clase", sessions: 1, detail: "1 clase individual de 1 hora" },
  { id: "ind-8", kind: "individual", name: "Paquete de 8 clases", price: 540, unit: "en total", sessions: 8, detail: "S/ 67.5 por clase · vence a los 60 días" },
  { id: "ind-12", kind: "individual", name: "Paquete de 12 clases", price: 780, unit: "en total", sessions: 12, detail: "S/ 65 por clase · vence a los 60 días" },
];

export const GROUP_INCLUDES = [
  "Diagnóstico inicial en matemática o comunicación",
  "Grupo de máximo 4 alumnos del mismo nivel",
  "2 clases de 1 hora por semana con el mismo docente",
  "Reporte semanal de avance para la familia",
  "Primera clase de prueba gratis",
];

export const INDIVIDUAL_INCLUDES = [
  "Diagnóstico inicial incluido",
  "Clase 1 a 1 con un docente de tu elección",
  "Reporte de avance después de cada bloque de clases",
  "Primera clase de prueba gratis",
];

export function getPlan(id: PlanId): PlanOption {
  return PLAN_OPTIONS.find((p) => p.id === id) ?? PLAN_OPTIONS[0]!;
}

export const formatSoles = (n: number) => `S/ ${Number.isInteger(n) ? n : n.toFixed(1)}`;
