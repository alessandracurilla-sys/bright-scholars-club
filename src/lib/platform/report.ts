// Borrador del reporte semanal. Hoy se arma con reglas a partir del diagnóstico (sin backend).
// En producción lo generará la IA con la transcripción de cada clase y lo revisará el docente antes de enviarlo.
import { SUBJECT_LABEL, strongestTopic, weakestTopic, type Diagnostic } from "./diagnostic";

export type ReportDraft = {
  week: number;
  title: string;
  summary: string;
  struggle: string;
  adjustment: string;
};

export function buildReportDraft(student: string, d: Diagnostic): ReportDraft {
  const first = student.split(" ")[0] ?? student;
  const weak = weakestTopic(d);
  const strong = strongestTopic(d);
  const subject = SUBJECT_LABEL[d.subject];
  return {
    week: 1,
    title: `Semana 1 · punto de partida en ${subject}`,
    summary: `${first} resolvió bien ${d.score}% del diagnóstico. Su tema más firme es ${strong.topic} (${strong.correct} de ${strong.total} correctas).`,
    struggle: `${weak.topic}: ${weak.correct} de ${weak.total} respuestas correctas.`,
    adjustment: `En las primeras clases el docente reforzará ${weak.topic.toLowerCase()} con ejemplos guiados y propondrá 10 minutos de práctica diaria en casa.`,
  };
}
