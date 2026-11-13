// Diagnóstico inicial: banco de preguntas, puntaje por tema y asignación de nivel.
// Es un diagnóstico de orientación para 1.º a 3.º de secundaria, no una evaluación oficial.

export type SubjectKey = "matematica" | "comunicacion";
export type Level = "Inicial" | "En proceso" | "Logrado";

export const SUBJECT_LABEL: Record<SubjectKey, string> = {
  matematica: "Matemática",
  comunicacion: "Comunicación",
};

export type Question = {
  id: string;
  topic: string;
  text: string;
  context?: string;
  options: string[];
  answer: number;
  tip: string;
};

export const TOPICS: Record<SubjectKey, string[]> = {
  matematica: ["Fracciones", "Ecuaciones", "Proporcionalidad", "Geometría"],
  comunicacion: ["Idea principal", "Inferencia", "Vocabulario", "Ortografía y gramática"],
};

export const QUESTIONS: Record<SubjectKey, Question[]> = {
  matematica: [
    { id: "m1", topic: "Fracciones", text: "¿Cuánto es 2/3 + 1/6?", options: ["3/9", "5/6", "1/2", "3/6"], answer: 1, tip: "2/3 es igual a 4/6, y 4/6 + 1/6 = 5/6." },
    { id: "m2", topic: "Fracciones", text: "¿Cuál de estas fracciones es la mayor?", options: ["3/5", "4/7", "5/9", "2/3"], answer: 3, tip: "Pasadas a decimales: 0.60, 0.57, 0.56 y 0.67." },
    { id: "m3", topic: "Ecuaciones", text: "Resuelve: 3x − 5 = 16", options: ["x = 5", "x = 7", "x = 9", "x = 11"], answer: 1, tip: "3x = 21, entonces x = 7." },
    { id: "m4", topic: "Ecuaciones", text: "Si 2(x + 3) = 14, ¿cuánto vale x?", options: ["x = 2", "x = 4", "x = 5", "x = 8"], answer: 1, tip: "x + 3 = 7, entonces x = 4." },
    { id: "m5", topic: "Proporcionalidad", text: "Si 3 cuadernos cuestan S/ 12, ¿cuánto cuestan 7 cuadernos?", options: ["S/ 21", "S/ 24", "S/ 28", "S/ 36"], answer: 2, tip: "Cada cuaderno cuesta S/ 4. Siete cuestan S/ 28." },
    { id: "m6", topic: "Proporcionalidad", text: "Un descuento de 20% sobre S/ 150 significa pagar…", options: ["S/ 130", "S/ 120", "S/ 100", "S/ 30"], answer: 1, tip: "El 20% de 150 es 30. Pagas 150 − 30 = 120." },
    { id: "m7", topic: "Geometría", text: "Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?", options: ["13 cm", "26 cm", "40 cm", "30 cm"], answer: 1, tip: "Perímetro = 2 × (8 + 5) = 26 cm." },
    { id: "m8", topic: "Geometría", text: "¿Cuál es el área de un triángulo de base 10 cm y altura 6 cm?", options: ["60 cm²", "16 cm²", "30 cm²", "36 cm²"], answer: 2, tip: "Área = base × altura ÷ 2 = 10 × 6 ÷ 2 = 30 cm²." },
  ],
  comunicacion: [
    {
      id: "c1", topic: "Idea principal",
      context: "Las abejas son esenciales para la agricultura porque polinizan gran parte de los cultivos que consumimos. Sin ellas, muchas frutas y verduras serían más escasas y más caras.",
      text: "¿Cuál es la idea principal del texto?",
      options: ["Las abejas producen miel", "Las abejas son necesarias para que existan muchos alimentos", "Las frutas son caras", "La agricultura es difícil"],
      answer: 1, tip: "La idea principal resume lo central: sin abejas habría menos alimentos.",
    },
    {
      id: "c2", topic: "Idea principal",
      context: "En Lima, el uso de bicicletas aumentó en los últimos años. Las nuevas ciclovías y el alto costo del transporte llevaron a más personas a pedalear hacia el trabajo.",
      text: "¿Cuál es la idea principal del texto?",
      options: ["Lima tiene muchas bicicletas viejas", "Más personas usan bicicleta por las ciclovías y el costo del transporte", "El transporte es gratis", "Las ciclovías están cerradas"],
      answer: 1, tip: "Busca la idea que reúne las demás: más ciclistas y sus causas.",
    },
    {
      id: "c3", topic: "Inferencia",
      context: "Marta llegó a clase empapada, con el paraguas roto y las zapatillas llenas de barro.",
      text: "¿Qué se puede inferir?",
      options: ["Hizo deporte", "Hubo mucha lluvia y viento camino a clase", "Se cayó en una piscina", "Llegó muy temprano"],
      answer: 1, tip: "Paraguas roto, ropa mojada y barro apuntan a lluvia fuerte.",
    },
    {
      id: "c4", topic: "Inferencia",
      context: "Luis guardó su cuaderno, apagó la luz del cuarto y bostezó mientras se ponía el pijama.",
      text: "¿Qué es lo más probable que haga Luis ahora?",
      options: ["Salir a jugar", "Hacer la tarea", "Dormir", "Almorzar"],
      answer: 2, tip: "Pijama, luz apagada y bostezo indican que va a dormir.",
    },
    { id: "c5", topic: "Vocabulario", text: "En la frase “El profesor fue muy cordial con todos”, ¿qué significa “cordial”?", options: ["Amable", "Estricto", "Distraído", "Cansado"], answer: 0, tip: "Cordial es una persona amable y afectuosa." },
    { id: "c6", topic: "Vocabulario", text: "¿Cuál es un sinónimo de “escaso”?", options: ["Abundante", "Poco", "Enorme", "Rápido"], answer: 1, tip: "Escaso significa que hay poco de algo." },
    { id: "c7", topic: "Ortografía y gramática", text: "¿Qué oración está escrita correctamente?", options: ["Haber si vienes mañana", "A ver si vienes mañana", "A ber si vienes mañana", "Haber si bienes mañana"], answer: 1, tip: "“A ver” (mirar) se escribe separado; “haber” es el verbo." },
    { id: "c8", topic: "Ortografía y gramática", text: "¿Cuál es la palabra aguda con la tilde bien puesta?", options: ["Canción", "Cancion", "Cáncion", "Cancíon"], answer: 0, tip: "Canción es aguda y termina en n, por eso lleva tilde en la última sílaba." },
  ],
};

export type TopicResult = { topic: string; correct: number; total: number; level: Level };

export type Diagnostic = {
  subject: SubjectKey;
  takenAt: string;
  answers: number[];
  results: TopicResult[];
  score: number; // 0-100
  overall: Level;
};

export function levelFromRatio(r: number): Level {
  if (r >= 0.75) return "Logrado";
  if (r >= 0.4) return "En proceso";
  return "Inicial";
}

export function scoreDiagnostic(subject: SubjectKey, answers: number[], takenAt = new Date().toISOString()): Diagnostic {
  const qs = QUESTIONS[subject];
  const byTopic = new Map<string, { correct: number; total: number }>();
  let correct = 0;
  qs.forEach((q, i) => {
    const t = byTopic.get(q.topic) ?? { correct: 0, total: 0 };
    t.total += 1;
    if (answers[i] === q.answer) {
      t.correct += 1;
      correct += 1;
    }
    byTopic.set(q.topic, t);
  });
  const results: TopicResult[] = TOPICS[subject].map((topic) => {
    const t = byTopic.get(topic) ?? { correct: 0, total: 0 };
    return { topic, correct: t.correct, total: t.total, level: levelFromRatio(t.total ? t.correct / t.total : 0) };
  });
  const ratio = qs.length ? correct / qs.length : 0;
  return { subject, takenAt, answers, results, score: Math.round(ratio * 100), overall: levelFromRatio(ratio) };
}

export function weakestTopic(d: Diagnostic): TopicResult {
  return [...d.results].sort((a, b) => a.correct / a.total - b.correct / b.total)[0]!;
}

export function strongestTopic(d: Diagnostic): TopicResult {
  return [...d.results].sort((a, b) => b.correct / b.total - a.correct / a.total)[0]!;
}

export const LEVEL_STYLE: Record<Level, string> = {
  Inicial: "bg-pink-soft text-secondary-foreground",
  "En proceso": "bg-sunshine/40 text-sunshine-foreground",
  Logrado: "bg-mint-soft text-navy-deep",
};
