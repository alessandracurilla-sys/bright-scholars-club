// Armado de grupos: por nivel del diagnóstico (no por edad), máximo 4 alumnos, horarios fijos.
import { TEACHERS, type Teacher } from "@/lib/data";
import { SUBJECT_LABEL, type Level, type SubjectKey } from "./diagnostic";

export const GROUP_MAX = 4;
export const GROUP_MIN_TO_OPEN = 3;

export const SCHEDULE_BLOCKS = [
  { id: "lm-17", label: "Lunes y miércoles · 5:00 pm" },
  { id: "mj-18", label: "Martes y jueves · 6:00 pm" },
  { id: "vs-10", label: "Viernes 5:00 pm y sábado 10:00 am" },
] as const;

export type BlockId = (typeof SCHEDULE_BLOCKS)[number]["id"];

export function blockLabel(id: string | undefined): string {
  return SCHEDULE_BLOCKS.find((b) => b.id === id)?.label ?? "Por elegir";
}

export function teacherFor(subject: SubjectKey): Teacher {
  const id = subject === "matematica" ? "t1" : "t3";
  return TEACHERS.find((t) => t.id === id) ?? TEACHERS[0]!;
}

// Compañeros de ejemplo (ficticios) hasta que haya inscripciones reales.
const DEMO_PEERS = [
  { initials: "M.", name: "Mateo" },
  { initials: "C.", name: "Camila" },
  { initials: "J.", name: "Joaquín" },
];

export function groupFor(subject: SubjectKey, level: Level, blockId: string | undefined, student: string) {
  const peers = DEMO_PEERS.slice(0, GROUP_MIN_TO_OPEN - 1);
  return {
    name: `${SUBJECT_LABEL[subject]} · Nivel ${level}`,
    teacher: teacherFor(subject),
    schedule: blockLabel(blockId),
    members: [...peers.map((p) => p.initials), `${(student.trim()[0] ?? "?").toUpperCase()}.`],
    seats: GROUP_MAX,
    opens: peers.length + 1 >= GROUP_MIN_TO_OPEN,
  };
}
