import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, Clock, Download, FileText, Gamepad2, PenLine, PlayCircle, Search, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site/PageHero";
import { MATERIALS, QUIZ, SUBJECT_EMOJI, type Level, type MaterialType } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/material")({
  head: () => ({
    meta: [
      { title: "Material académico y de reforzamiento — Cometa" },
      {
        name: "description",
        content: "Guías, videos, ejercicios y juegos educativos de reforzamiento para primaria y secundaria.",
      },
      { property: "og:title", content: "Material académico y de reforzamiento — Cometa" },
      { property: "og:description", content: "Practica con guías, videos, ejercicios y juegos por grado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaterialPage,
});

const TYPE_META: Record<MaterialType, { icon: typeof FileText; tone: string }> = {
  Guía: { icon: FileText, tone: "bg-sky text-navy-deep" },
  Video: { icon: PlayCircle, tone: "bg-pink text-pink-foreground" },
  Ejercicios: { icon: PenLine, tone: "bg-sunshine text-sunshine-foreground" },
  Juego: { icon: Gamepad2, tone: "bg-mint text-navy-deep" },
};

function MaterialPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<MaterialType | "Todo">("Todo");
  const [level, setLevel] = useState<Level | "Todos">("Todos");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MATERIALS.filter(
      (m) =>
        (type === "Todo" || m.type === type) &&
        (level === "Todos" || m.level === level) &&
        (!q || m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)),
    );
  }, [query, type, level]);

  return (
    <>
      <PageHero
        eyebrow="📚 Material de refuerzo"
        emoji="📒"
        title={<>Practica a tu ritmo, <span className="text-pink">cuando quieras</span></>}
        description="Guías descargables, videos cortitos, fichas de ejercicios y juegos para reforzar lo que ves en el colegio."
      >
        <div className="relative max-w-xl">
          <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca: fracciones, verbos, células…"
            className="h-14 rounded-full border-[2.5px] border-navy-foreground bg-card pl-14 text-lg text-foreground shadow-pop-pink"
          />
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-2">
          {(["Todo", "Guía", "Video", "Ejercicios", "Juego"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "rounded-full border-[2.5px] border-navy-deep px-4 py-1.5 font-display font-medium transition-all hover:-translate-y-0.5",
                type === t ? "bg-navy text-navy-foreground shadow-pop-sm" : "bg-card text-navy",
              )}
            >
              {t}
            </button>
          ))}
          <span className="mx-2 h-6 w-0.5 bg-border" />
          {(["Todos", "Primaria", "Secundaria"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-full border-[2.5px] border-navy-deep px-4 py-1.5 font-display font-medium transition-all hover:-translate-y-0.5",
                level === l ? "bg-pink text-pink-foreground shadow-pop-sm" : "bg-card text-navy",
              )}
            >
              {l}
            </button>
          ))}
          <span className="ml-auto font-display font-semibold text-muted-foreground">{list.length} recursos</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => {
            const meta = TYPE_META[m.type];
            const isSaved = saved.has(m.id);
            return (
              <article key={m.id} className="card-pop lift flex flex-col overflow-hidden animate-pop">
                <div className="relative flex h-32 items-center justify-center bg-dots bg-pink-soft text-6xl">
                  {SUBJECT_EMOJI[m.subject]}
                  <span className={cn("absolute left-4 top-4 flex items-center gap-1 rounded-full border-2 border-navy-deep px-3 py-1 font-display text-sm font-semibold", meta.tone)}>
                    <meta.icon className="size-4" /> {m.type}
                  </span>
                  <button
                    aria-label={isSaved ? "Quitar de guardados" : "Guardar"}
                    onClick={() =>
                      setSaved((prev) => {
                        const n = new Set(prev);
                        if (n.has(m.id)) n.delete(m.id);
                        else {
                          n.add(m.id);
                          toast.success("Guardado en tu mochila 🎒");
                        }
                        return n;
                      })
                    }
                    className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border-2 border-navy-deep bg-card text-navy transition-transform hover:scale-110"
                  >
                    {isSaved ? <BookmarkCheck className="size-5 text-pink" /> : <Bookmark className="size-5" />}
                  </button>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-sm font-semibold text-pink">{m.subject} · {m.level}</p>
                  <h3 className="mt-1 text-xl font-bold leading-snug text-navy">{m.title}</h3>
                  <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="size-4" /> {m.minutes} min</span>
                    {m.pages && <span>{m.pages} págs.</span>}
                    <span>{m.downloads.toLocaleString("es-PE")} usos</span>
                  </div>
                  <div className="mt-auto pt-5">
                  <Button
                    variant="pop"
                    className="w-full"
                    onClick={() => toast.success(m.type === "Video" || m.type === "Juego" ? "¡A jugar y aprender! ▶️" : "Descarga iniciada 📥", { description: m.title })}
                  >
                    {m.type === "Video" || m.type === "Juego" ? <><PlayCircle /> Abrir</> : <><Download /> Descargar</>}
                  </Button>
                  </div>
                </div>
              </article>
            );
          })}
          {list.length === 0 && (
            <p className="col-span-full rounded-3xl border-2 border-dashed border-navy/30 p-10 text-center text-lg text-muted-foreground">
              No encontramos nada con esa búsqueda. ¡Prueba otra palabra! 🔍
            </p>
          )}
        </div>
      </section>

      <QuickQuiz />
    </>
  );
}

function QuickQuiz() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = QUIZ[index];
  const done = !q;

  function choose(i: number) {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }
  function next() {
    setPicked(null);
    setIndex((i) => i + 1);
  }
  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  return (
    <section className="mx-auto max-w-4xl px-6">
      <div className="card-pop overflow-hidden">
        <div className="flex items-center justify-between bg-navy px-8 py-5 text-navy-foreground">
          <h2 className="text-3xl font-bold">⚡ Reto rápido del día</h2>
          <span className="rounded-full bg-sunshine px-4 py-1 font-display font-bold text-sunshine-foreground">
            {score} / {QUIZ.length} ⭐
          </span>
        </div>
        <div className="p-8">
          {done || !q ? (
            <div className="py-6 text-center animate-pop">
              <Trophy className="mx-auto size-16 text-sunshine" />
              <p className="mt-4 font-display text-3xl font-bold text-navy">
                {score === QUIZ.length ? "¡Perfecto! Eres una estrella 🌟" : "¡Buen trabajo! Sigue practicando 💪"}
              </p>
              <p className="mt-2 text-muted-foreground">Ganaste {score * 25} XP para tu progreso.</p>
              <Button variant="pink" size="lg" className="mt-6" onClick={restart}>Jugar otra vez</Button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                {QUIZ.map((_, i) => (
                  <span key={i} className={cn("h-2.5 flex-1 rounded-full", i < index ? "bg-pink" : i === index ? "bg-navy" : "bg-muted")} />
                ))}
              </div>
              <p className="mt-6 font-display text-sm font-semibold text-pink">Pregunta {index + 1}</p>
              <h3 className="mt-1 text-2xl font-bold text-navy">{q.q}</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {q.options.map((opt, i) => {
                  const isRight = picked !== null && i === q.answer;
                  const isWrong = picked === i && i !== q.answer;
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                      className={cn(
                        "rounded-2xl border-[2.5px] border-navy-deep bg-card px-5 py-4 text-left font-display text-lg font-semibold text-navy transition-all",
                        picked === null && "hover:-translate-y-0.5 hover:bg-pink-soft hover:shadow-pop-sm",
                        isRight && "bg-mint animate-pop",
                        isWrong && "animate-wiggle bg-destructive text-destructive-foreground",
                      )}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-pink-soft p-5 animate-pop">
                  <p className="max-w-xl text-foreground">
                    <strong>{picked === q.answer ? "¡Correcto! 🎉 " : "¡Casi! 🤔 "}</strong>
                    {q.tip}
                  </p>
                  <Button variant="navy" onClick={next}>
                    {index === QUIZ.length - 1 ? "Ver resultado" : "Siguiente"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
