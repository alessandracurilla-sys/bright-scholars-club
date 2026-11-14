import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVEL_STYLE, QUESTIONS, SUBJECT_LABEL, weakestTopic, type Level } from "@/lib/platform/diagnostic";
import { blockLabel, groupFor } from "@/lib/platform/group";
import { usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/estudiante")({
  component: EstudiantePage,
});

const NEXT_GOAL: Record<Level, string> = {
  Inicial: "Meta: pasar a En proceso",
  "En proceso": "Meta: llegar a Logrado",
  Logrado: "¡Tema logrado! Sigue practicando",
};

function EstudiantePage() {
  const { family, diagnostic, block, trialBooked, paid } = usePlatform();
  if (!family) return null;
  const first = family.student.split(" ")[0] ?? family.student;

  if (!diagnostic) {
    return (
      <div className="card-pop p-10 text-center">
        <p className="text-2xl font-bold text-navy">Hola, {first}: primero tu diagnóstico</p>
        <p className="mt-2 text-muted-foreground">Son 8 preguntas. Con tu resultado armamos tu ruta.</p>
        <Button asChild variant="pink" size="xl" className="mt-6"><Link to="/diagnostico">Hacer el diagnóstico</Link></Button>
      </div>
    );
  }

  const group = groupFor(family.subject, diagnostic.overall, block, family.student);
  const weak = weakestTopic(diagnostic);
  const hint = QUESTIONS[family.subject].find((q) => q.topic === weak.topic)?.tip;
  const route = [...diagnostic.results].sort((a, b) => a.correct / a.total - b.correct / b.total);

  const badges = [
    { emoji: "🧭", name: "Explorador", text: "Completaste el diagnóstico", earned: true },
    { emoji: "👥", name: "Equipo", text: "Elegiste el horario de tu grupo", earned: !!block },
    { emoji: "🚀", name: "Primera clase", text: "Reservaste tu clase de prueba", earned: !!trialBooked },
    { emoji: "⭐", name: "Constante", text: "Activaste tu plan", earned: !!paid },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="space-y-6">
        <div className="card-pop bg-night p-7 text-navy-foreground">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Vista del estudiante</p>
          <h2 className="mt-1 text-4xl font-bold">¡Hola, {first}! 🚀</h2>
          <p className="mt-2 text-navy-foreground/80">{SUBJECT_LABEL[family.subject]} · {family.grade}</p>
          <span className={cn("mt-3 inline-block rounded-full px-3 py-1 font-display text-sm font-semibold", LEVEL_STYLE[diagnostic.overall])}>
            Tu nivel: {diagnostic.overall} · {diagnostic.score}%
          </span>
        </div>

        <div className="card-pop p-7">
          <h3 className="text-2xl font-bold text-navy">Tu ruta: empezamos por lo que más cuesta</h3>
          <ol className="mt-5 space-y-4">
            {route.map((r, i) => (
              <li key={r.topic}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-lg font-semibold text-navy">
                    <span className="mr-2 text-pink">{i + 1}.</span>{r.topic}
                  </p>
                  <span className={cn("rounded-full px-3 py-0.5 text-sm font-semibold", LEVEL_STYLE[r.level])}>{r.level}</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-candy" style={{ width: `${(r.correct / r.total) * 100}%` }} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{NEXT_GOAL[r.level]}</p>
              </li>
            ))}
          </ol>
        </div>

        {hint && (
          <div className="card-pop bg-sky-soft p-7">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Pista para {weak.topic.toLowerCase()}</p>
            <p className="mt-2 text-lg text-navy">{hint}</p>
          </div>
        )}
      </section>

      <aside className="space-y-6">
        <div className="card-pop p-6">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Tu próxima clase</p>
          <p className="mt-1 text-xl font-bold text-navy">{group.name}</p>
          <p className="text-muted-foreground">{blockLabel(block)}</p>
          <p className="text-muted-foreground">Con {group.teacher.name}</p>
          <Button variant="navy" size="lg" className="mt-4 w-full" disabled>
            <Video /> Entrar a la sala
          </Button>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="size-3" /> Se habilita 10 minutos antes de la clase.
          </p>
        </div>

        <div className="card-pop p-6">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Tus insignias</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <li
                key={b.name}
                className={cn(
                  "rounded-2xl border-2 p-3 text-center",
                  b.earned ? "border-navy-deep bg-sunshine/30" : "border-dashed border-border bg-muted/50 opacity-70",
                )}
              >
                <p className="text-3xl">{b.earned ? b.emoji : "🔒"}</p>
                <p className="font-display font-semibold text-navy">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
