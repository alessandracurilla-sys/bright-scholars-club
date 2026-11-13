import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVEL_STYLE, SUBJECT_LABEL } from "@/lib/platform/diagnostic";
import { blockLabel, groupFor } from "@/lib/platform/group";
import { formatSoles, getPlan } from "@/lib/platform/plans";
import { buildReportDraft } from "@/lib/platform/report";
import { usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { family, diagnostic, block, trialBooked, paid, reportApproved } = usePlatform();
  if (!family) return null;
  const first = family.student.split(" ")[0] ?? family.student;
  const plan = getPlan(family.plan);

  const steps = [
    { label: "Registro y consentimiento", done: true, to: "/app" as const },
    { label: "Diagnóstico inicial", done: !!diagnostic, to: "/diagnostico" as const },
    { label: "Grupo y horario", done: !!block, to: "/app/grupo" as const },
    { label: "Clase de prueba gratis", done: !!trialBooked, to: "/app/grupo" as const },
    { label: "Plan activo", done: !!paid, to: "/app/plan" as const },
  ];
  const nextStep = steps.find((s) => !s.done);
  const group = diagnostic ? groupFor(family.subject, diagnostic.overall, block, family.student) : null;
  const report = diagnostic ? buildReportDraft(family.student, diagnostic) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="card-pop p-7">
        <h2 className="text-2xl font-bold text-navy">El camino de {first}</h2>
        <ol className="mt-5 space-y-3">
          {steps.map((s) => (
            <li key={s.label} className="flex items-center gap-3">
              <span className={cn("grid size-8 place-items-center rounded-full border-2 border-navy-deep", s.done ? "bg-mint text-navy-deep" : "bg-card text-muted-foreground")}>
                {s.done ? <Check className="size-4" /> : <Circle className="size-3" />}
              </span>
              <Link to={s.to} className={cn("font-display text-lg", s.done ? "text-navy" : "font-semibold text-pink")}>{s.label}</Link>
            </li>
          ))}
        </ol>
        {nextStep ? (
          <Button asChild variant="pink" size="xl" className="mt-6">
            <Link to={nextStep.to}>Siguiente: {nextStep.label.toLowerCase()} <ArrowRight /></Link>
          </Button>
        ) : (
          <p className="mt-6 rounded-2xl bg-mint-soft p-4 font-display font-semibold text-navy-deep">¡Todo listo! Las clases empiezan según el horario del grupo.</p>
        )}
      </section>

      <section className="space-y-6">
        <div className="card-pop p-6">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Estudiante</p>
          <p className="mt-1 text-2xl font-bold text-navy">{family.student}</p>
          <p className="text-muted-foreground">{family.grade} · {SUBJECT_LABEL[family.subject]}</p>
          {diagnostic && (
            <span className={cn("mt-3 inline-block rounded-full px-3 py-1 font-display text-sm font-semibold", LEVEL_STYLE[diagnostic.overall])}>
              Nivel: {diagnostic.overall} · {diagnostic.score}%
            </span>
          )}
          <p className="mt-4 text-sm text-muted-foreground">Plan: {plan.name} · {formatSoles(plan.price)} {plan.unit}</p>
        </div>

        {group && (
          <div className="card-pop p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Próximas clases</p>
            <p className="mt-1 text-xl font-bold text-navy">{group.name}</p>
            <p className="text-muted-foreground">{blockLabel(block)} · {group.teacher.name}</p>
            <Button asChild variant="navy" size="lg" className="mt-4"><Link to="/app/grupo">Ver mi grupo</Link></Button>
          </div>
        )}

        {report && (
          <div className="card-pop p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Último reporte</p>
            <p className="mt-1 text-xl font-bold text-navy">{report.title}</p>
            <p className="mt-1 text-muted-foreground">{reportApproved ? "Aprobado por el docente" : "En revisión del docente"}</p>
            <Button asChild variant="pop" size="lg" className="mt-4"><Link to="/app/reporte">Abrir reporte</Link></Button>
          </div>
        )}
      </section>
    </div>
  );
}
