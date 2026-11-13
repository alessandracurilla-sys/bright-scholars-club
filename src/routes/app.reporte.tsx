import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVEL_STYLE, SUBJECT_LABEL } from "@/lib/platform/diagnostic";
import { teacherFor } from "@/lib/platform/group";
import { buildReportDraft } from "@/lib/platform/report";
import { usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/reporte")({
  component: ReportePage,
});

function ReportePage() {
  const { family, diagnostic, reportApproved, reportAdjustment } = usePlatform();
  if (!family) return null;

  if (!diagnostic) {
    return (
      <div className="card-pop p-10 text-center">
        <p className="text-2xl font-bold text-navy">Aún no hay reporte</p>
        <p className="mt-2 text-muted-foreground">El primer reporte se arma con el diagnóstico.</p>
        <Button asChild variant="pink" size="xl" className="mt-6"><Link to="/diagnostico">Hacer el diagnóstico</Link></Button>
      </div>
    );
  }

  const draft = buildReportDraft(family.student, diagnostic);
  const teacher = teacherFor(family.subject);
  const adjustment = reportAdjustment ?? draft.adjustment;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-start gap-3 rounded-2xl border-2 border-navy/20 bg-sky-soft p-4 text-sm text-navy">
        <Info className="mt-0.5 size-5 shrink-0" />
        <p>
          Reporte de demostración. Hoy se arma con reglas a partir del diagnóstico. Cuando se conecte el análisis con IA,
          se generará con la transcripción de cada clase y el docente lo revisará antes de enviarlo.
        </p>
      </div>

      <article className="card-pop mt-6 overflow-hidden">
        <header className="bg-navy p-7 text-navy-foreground">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-bold">{draft.title}</h2>
            <span className={cn("rounded-full px-3 py-1 font-display text-sm font-semibold", reportApproved ? "bg-mint text-navy-deep" : "bg-sunshine text-sunshine-foreground")}>
              {reportApproved ? `Aprobado por ${teacher.name}` : "En revisión del docente"}
            </span>
          </div>
          <p className="mt-1 text-navy-foreground/80">{family.student} · {family.grade} · {SUBJECT_LABEL[family.subject]}</p>
        </header>
        <div className="space-y-6 p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-pink-soft p-5">
              <p className="font-display text-sm text-muted-foreground">Diagnóstico inicial</p>
              <p className="font-display text-4xl font-bold text-pink">{diagnostic.score}%</p>
            </div>
            <div className="rounded-2xl bg-pink-soft p-5">
              <p className="font-display text-sm text-muted-foreground">Asistencia</p>
              <p className="font-display text-xl font-bold text-navy">Empieza con la clase de prueba</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-navy">Nivel por tema</h3>
            <div className="mt-3 space-y-2">
              {diagnostic.results.map((r) => (
                <div key={r.topic} className="flex items-center justify-between rounded-xl border-2 border-border px-4 py-2">
                  <span className="font-semibold text-navy">{r.topic}</span>
                  <span className={cn("rounded-full px-3 py-0.5 text-sm font-semibold", LEVEL_STYLE[r.level])}>{r.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-pink-soft p-5">
            <p className="font-display font-bold text-navy">Resumen</p>
            <p className="mt-1 text-foreground">{draft.summary}</p>
          </div>
          <div className="rounded-2xl bg-sunshine/25 p-5">
            <p className="font-display font-bold text-navy">Lo que costó</p>
            <p className="mt-1 text-foreground">{draft.struggle}</p>
          </div>
          <div className="rounded-2xl bg-mint-soft p-5">
            <p className="font-display font-bold text-navy">Ajuste para la próxima semana</p>
            <p className="mt-1 text-foreground">{adjustment}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
