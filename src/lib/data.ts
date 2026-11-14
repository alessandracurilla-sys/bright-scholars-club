// Sample content shown across the site (demo data until a backend is connected).

export type Subject = "Matemática" | "Comunicación" | "Ciencia" | "Inglés" | "Historia";
export type Level = "Primaria" | "Secundaria";

export const SUBJECTS: Subject[] = ["Matemática", "Comunicación", "Ciencia", "Inglés", "Historia"];

export const SUBJECT_EMOJI: Record<Subject, string> = {
  Matemática: "🔢",
  Comunicación: "📚",
  Ciencia: "🔬",
  Inglés: "🌎",
  Historia: "🏛️",
};

export type Teacher = {
  id: string;
  name: string;
  initials: string;
  subject: Subject;
  rating: number;
  students: number;
  years: number;
  tone: "pink" | "navy" | "sky" | "sunshine" | "mint";
};

export const TEACHERS: Teacher[] = [
  { id: "t1", name: "Prof. Lucía Ramírez", initials: "LR", subject: "Matemática", rating: 4.9, students: 1240, years: 9, tone: "pink" },
  { id: "t2", name: "Prof. Diego Salazar", initials: "DS", subject: "Ciencia", rating: 4.8, students: 980, years: 7, tone: "sky" },
  { id: "t3", name: "Prof. Camila Torres", initials: "CT", subject: "Comunicación", rating: 4.9, students: 1530, years: 11, tone: "sunshine" },
  { id: "t4", name: "Prof. Andrés Quispe", initials: "AQ", subject: "Historia", rating: 4.7, students: 720, years: 6, tone: "mint" },
  { id: "t5", name: "Prof. Sofía Mendoza", initials: "SM", subject: "Inglés", rating: 5.0, students: 1100, years: 8, tone: "navy" },
];

export type LiveClass = {
  id: string;
  title: string;
  teacherId: string;
  subject: Subject;
  level: Level;
  grade: string;
  day: string;
  time: string;
  seats: number;
  taken: number;
  live?: boolean;
};

export const CLASSES: LiveClass[] = [
  { id: "c1", title: "Fracciones sin miedo", teacherId: "t1", subject: "Matemática", level: "Primaria", grade: "4.º - 6.º", day: "Hoy", time: "16:00", seats: 4, taken: 3, live: true },
  { id: "c2", title: "El sistema solar en 3D", teacherId: "t2", subject: "Ciencia", level: "Primaria", grade: "3.º - 5.º", day: "Hoy", time: "17:30", seats: 4, taken: 2 },
  { id: "c3", title: "Comprensión lectora: detectives del texto", teacherId: "t3", subject: "Comunicación", level: "Primaria", grade: "2.º - 4.º", day: "Mañana", time: "15:00", seats: 4, taken: 1 },
  { id: "c4", title: "Ecuaciones de primer grado", teacherId: "t1", subject: "Matemática", level: "Secundaria", grade: "1.º - 2.º", day: "Mañana", time: "18:00", seats: 4, taken: 3 },
  { id: "c5", title: "Speaking club: daily routines", teacherId: "t5", subject: "Inglés", level: "Secundaria", grade: "1.º - 3.º", day: "Jueves", time: "16:30", seats: 4, taken: 2 },
  { id: "c6", title: "Culturas preincas en 45 minutos", teacherId: "t4", subject: "Historia", level: "Secundaria", grade: "2.º - 4.º", day: "Jueves", time: "17:00", seats: 4, taken: 1 },
  { id: "c7", title: "Células: la fábrica de la vida", teacherId: "t2", subject: "Ciencia", level: "Secundaria", grade: "3.º - 5.º", day: "Viernes", time: "16:00", seats: 4, taken: 3 },
  { id: "c8", title: "Colors & animals con canciones", teacherId: "t5", subject: "Inglés", level: "Primaria", grade: "1.º - 3.º", day: "Viernes", time: "15:30", seats: 4, taken: 1 },
];

export type MaterialType = "Guía" | "Video" | "Ejercicios" | "Juego";

export type Material = {
  id: string;
  title: string;
  subject: Subject;
  level: Level;
  type: MaterialType;
  minutes: number;
  pages?: number;
  downloads: number;
};

export const MATERIALS: Material[] = [
  { id: "m1", title: "Tablas de multiplicar con trucos", subject: "Matemática", level: "Primaria", type: "Juego", minutes: 15, downloads: 8420 },
  { id: "m2", title: "Guía de signos de puntuación", subject: "Comunicación", level: "Primaria", type: "Guía", minutes: 20, pages: 12, downloads: 5310 },
  { id: "m3", title: "Ciclo del agua explicado", subject: "Ciencia", level: "Primaria", type: "Video", minutes: 8, downloads: 9100 },
  { id: "m4", title: "100 ejercicios de álgebra", subject: "Matemática", level: "Secundaria", type: "Ejercicios", minutes: 60, pages: 24, downloads: 7230 },
  { id: "m5", title: "Verbos irregulares en inglés", subject: "Inglés", level: "Secundaria", type: "Guía", minutes: 25, pages: 10, downloads: 6110 },
  { id: "m6", title: "Línea de tiempo: Independencia", subject: "Historia", level: "Secundaria", type: "Video", minutes: 12, downloads: 4020 },
  { id: "m7", title: "Sílabas y acentos: práctica", subject: "Comunicación", level: "Primaria", type: "Ejercicios", minutes: 30, pages: 8, downloads: 3890 },
  { id: "m8", title: "Tabla periódica interactiva", subject: "Ciencia", level: "Secundaria", type: "Juego", minutes: 20, downloads: 5670 },
  { id: "m9", title: "Geometría: áreas y perímetros", subject: "Matemática", level: "Primaria", type: "Guía", minutes: 25, pages: 14, downloads: 6780 },
];

export type QuizQuestion = { q: string; options: string[]; answer: number; tip: string };

export const QUIZ: QuizQuestion[] = [
  { q: "¿Cuánto es 3/4 + 1/4?", options: ["1", "4/8", "2/4", "3/16"], answer: 0, tip: "Mismo denominador: suma los numeradores. 3 + 1 = 4, y 4/4 = 1." },
  { q: "¿Qué planeta es conocido como el planeta rojo?", options: ["Venus", "Marte", "Júpiter", "Saturno"], answer: 1, tip: "Marte tiene óxido de hierro en su superficie, ¡por eso se ve rojo!" },
  { q: "¿Cuál es el plural de 'child' en inglés?", options: ["Childs", "Childes", "Children", "Childrens"], answer: 2, tip: "'Child' es irregular: one child, two children." },
  { q: "¿Qué palabra lleva tilde?", options: ["Arbol", "Mesa", "Casa", "Libro"], answer: 0, tip: "Árbol es grave y no termina en n, s o vocal, así que lleva tilde." },
];

export const WEEKLY_MINUTES = [
  { day: "Lun", minutos: 35, meta: 30 },
  { day: "Mar", minutos: 50, meta: 30 },
  { day: "Mié", minutos: 20, meta: 30 },
  { day: "Jue", minutos: 45, meta: 30 },
  { day: "Vie", minutos: 60, meta: 30 },
  { day: "Sáb", minutos: 25, meta: 30 },
  { day: "Dom", minutos: 40, meta: 30 },
];

export const SUBJECT_PROGRESS: { subject: Subject; value: number; grade: string }[] = [
  { subject: "Matemática", value: 78, grade: "A" },
  { subject: "Comunicación", value: 85, grade: "A" },
  { subject: "Ciencia", value: 62, grade: "B" },
  { subject: "Inglés", value: 54, grade: "B" },
  { subject: "Historia", value: 40, grade: "C" },
];

export const BADGES = [
  { id: "b1", name: "Primera clase", emoji: "🚀", earned: true },
  { id: "b2", name: "Racha de 7 días", emoji: "🔥", earned: true },
  { id: "b3", name: "Rey de las fracciones", emoji: "👑", earned: true },
  { id: "b4", name: "Lector veloz", emoji: "📖", earned: true },
  { id: "b5", name: "Científico curioso", emoji: "🧪", earned: false },
  { id: "b6", name: "Políglota", emoji: "🗣️", earned: false },
  { id: "b7", name: "100 ejercicios", emoji: "💯", earned: false },
  { id: "b8", name: "Racha de 30 días", emoji: "🌟", earned: false },
];

export type Scholarship = {
  id: string;
  title: string;
  sponsor: string;
  coverage: string;
  level: string;
  deadline: string; // ISO date
  spots: number;
  requirements: string[];
  tone: "pink" | "navy" | "sky" | "sunshine";
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "s1",
    title: "Beca Talento Cometa",
    sponsor: "Fundación Cometa",
    coverage: "100% del plan grupal por 1 año",
    level: "Primaria y Secundaria",
    deadline: "2026-12-15",
    spots: 50,
    requirements: ["Colegio público", "Carta de motivación corta", "Promedio desde 14"],
    tone: "pink",
  },
  {
    id: "s2",
    title: "Beca Mujeres en Ciencia",
    sponsor: "Alianza STEM Perú",
    coverage: "Plan grupal con 50% de descuento + kit de laboratorio",
    level: "Secundaria",
    deadline: "2026-12-30",
    spots: 30,
    requirements: ["Estudiantes de 1.º a 5.º", "Proyecto o idea científica"],
    tone: "navy",
  },
  {
    id: "s3",
    title: "Beca Lectores del Futuro",
    sponsor: "Biblioteca Abierta",
    coverage: "50% del plan grupal + 10 libros",
    level: "Primaria",
    deadline: "2027-01-20",
    spots: 80,
    requirements: ["3.º a 6.º de primaria", "Reseña de tu libro favorito"],
    tone: "sky",
  },
];

export const CONTESTS = [
  { id: "k1", title: "Olimpiada de Matemática", emoji: "🧮", prize: "Tablet + beca 100%", date: "6 dic", participants: 2340 },
  { id: "k2", title: "Concurso de Cuentos Cortos", emoji: "✍️", prize: "Publicación + S/ 500 en libros", date: "13 dic", participants: 1120 },
  { id: "k3", title: "Feria de Ciencia Virtual", emoji: "🔭", prize: "Telescopio + viaje educativo", date: "20 dic", participants: 860 },
  { id: "k4", title: "English Spelling Bee", emoji: "🐝", prize: "Curso de verano gratis", date: "10 ene", participants: 1540 },
];

export const LEADERBOARD = [
  { name: "Mateo G.", school: "I.E. 1052, Lima", xp: 4820 },
  { name: "Ana L.", school: "I.E. San Martín, Cusco", xp: 4610 },
  { name: "Valentina R.", school: "I.E. 7032, Arequipa", xp: 4385 },
  { name: "Joaquín P.", school: "I.E. Los Andes, Puno", xp: 4120 },
  { name: "Camila S.", school: "I.E. 3045, Trujillo", xp: 3990 },
];

export function daysUntil(iso: string, from = new Date()) {
  const ms = new Date(iso + "T23:59:59").getTime() - from.getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
