import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVEL_STYLE, QUESTIONS, SUBJECT_LABEL, sampleDiagnostic, scoreDiagnostic } from "@/lib/platform/diagnostic";
import { updatePlatform, useHydrated, usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico inicial — Cometa" },
      { name: "description", content: "Un diagnóstico corto para saber en qué nivel está el estudiante y qué debe enseñar el docente." },
      { property: "og:title", content: "Diagnóstico inicial — Cometa" },
      { property: "og:description", content: "Antes de la primera clase, medimos el nivel por tema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiagnosticoPage,
});

function DiagnosticoPage() {
  const { family, diagnostic } = usePlatform();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const hydrated = useHydrated();
  const navigate = useNavigate();

  if (!hydrated) return <Shell><div aria-busy="true" className="min-h-[40vh]" /></Shell>;

  if (!family) {
    return (
      <Shell>
        <div className="card-pop p-10 text-center">
          <p className="text-2xl font-bold text-navy">Primero registra a tu hijo o hija</p>
          <p className="mt-2 text-muted-foreground">El diagnóstico se guarda en su cuenta.</p>
          <Button asChild variant="pink" size="xl" className="mt-6"><Link to="/registro">Ir al registro</Link></Button>
        </div>
      </Shell>
    );
  }

  const questions = QUESTIONS[family.subject];
  const first = family.student.split(" ")[0] ?? family.student;

  if (diagnostic && answers.length === 0) {
    return <Results />;
  }

  if (answers.length === questions.length) {
    return <Results />;
  }

  const q = questions[idx]!;
  const answered = picked !== null;

  function skip() {
    updatePlatform({ diagnostic: sampleDiagnostic(family!.subject) });
    void navigate({ to: "/app" });
  }

  function next() {
    if (picked === null) return;
    const newAnswers = [...answers, picked];
    setPicked(null);
    if (idx + 1 >= questions.length) {
      setAnswers(newAnswers);
      updatePlatform({ diagnostic: scoreDiagnostic(family!.subject, newAnswers) });
    } else {
      setAnswers(newAnswers);
      setIdx(idx + 1);
    }
  }

  return (
    <Shell>
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">
        Diagnóstico de {SUBJECT_LABEL[family.subject]} · {first}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={idx}>
          <div className="h-full rounded-full bg-candy transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
        </div>
        <span className="font-display font-semibold text-navy">{idx + 1} de {questions.length}</span>
      </div>

      <div className="card-pop mt-6 p-8 animate-pop" key={q.id}>
        <p className="font-display text-sm font-semibold text-muted-foreground">{q.topic}</p>
        {q.context && (
          <p className="mt-3 rounded-2xl border-2 border-navy/20 bg-pink-soft p-4 text-lg text-foreground">{q.context}</p>
        )}
        <h2 className="mt-4 text-2xl font-bold text-navy">{q.text}</h2>
        <div className="mt-5 grid gap-3">
          {q.options.map((o, i) => {
            const isRight = answered && i === q.answer;
            const isWrong = answered && picked === i && i !== q.answer;
            return (
              <button
                key={o}
                disabled={answered}
                onClick={() => setPicked(i)}
                className={cn(
                  "flex items-center justify-between rounded-2xl border-[2.5px] border-navy-deep bg-card px-5 py-3 text-left text-lg font-semibold text-navy transition-all",
                  !answered && "hover:-translate-y-0.5 hover:bg-pink-soft",
                  isRight && "bg-mint",
                  isWrong && "bg-pink-soft",
                )}
              >
                {o}
                {isRight && <Check className="size-5" aria-label="Correcta" />}
                {isWrong && <X className="size-5 text-destructive" aria-label="Incorrecta" />}
              </button>
            );
          })}
        </div>
        {answered && (
          <p className="mt-4 rounded-2xl bg-sky-soft p-4 text-navy"><span className="font-bold">Pista: </span>{q.tip}</p>
        )}
        <Button variant="pink" size="xl" className="mt-6 w-full sm:w-auto" disabled={!answered} onClick={next}>
          {idx + 1 >= questions.length ? "Ver mi resultado" : "Siguiente"} <ArrowRight />
        </Button>
        <Button variant="ghost" size="lg" className="ml-2 mt-6" onClick={skip}>Omitir test (usar resultado de ejemplo)</Button>
      </div>
    </Shell>
  );
}

function Results() {
  const { family, diagnostic } = usePlatform();
  if (!family || !diagnostic) return null;
  const first = family.student.split(" ")[0] ?? family.student;
  return (
    <Shell>
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Resultado del diagnóstico</p>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">¡Gracias, {first}! Este es tu punto de partida</h1>
      <div className="card-pop mt-8 p-8">
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-display text-6xl font-bold text-pink">{diagnostic.score}%</p>
          <div>
            <p className="font-display text-lg text-navy">de respuestas correctas en {SUBJECT_LABEL[diagnostic.subject]}</p>
            <span className={cn("mt-1 inline-block rounded-full px-3 py-1 font-display text-sm font-semibold", LEVEL_STYLE[diagnostic.overall])}>
              Nivel: {diagnostic.overall}
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {diagnostic.results.map((r) => (
            <div key={r.topic}>
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-navy">{r.topic}</p>
                <span className={cn("rounded-full px-3 py-0.5 text-sm font-semibold", LEVEL_STYLE[r.level])}>{r.level}</span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-candy" style={{ width: `${(r.correct / r.total) * 100}%` }} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.correct} de {r.total} correctas</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl bg-pink-soft p-4 text-sm text-foreground">
          Este diagnóstico orienta al docente sobre qué enseñar primero. No es una evaluación oficial ni un diagnóstico clínico.
        </p>
      </div>
      <Button asChild variant="pink" size="xl" className="mt-8">
        <Link to="/app">Entrar a mi panel <ArrowRight /></Link>
      </Button>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl px-6 py-12">{children}</div>;
}
