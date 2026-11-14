import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, CalendarClock, Check, ClipboardCheck, GraduationCap, ShieldCheck, Star, Users, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { TONE_BG } from "@/components/site/tones";
import { CLASSES, SUBJECTS, SUBJECT_EMOJI, TEACHERS, type Level, type Subject } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clases")({
  head: () => ({
    meta: [
      { title: "Clases en vivo con profesores verificados — Cometa" },
      {
        name: "description",
        content: "Reserva clases virtuales en vivo de matemática, ciencia, comunicación, inglés e historia con profesores verificados.",
      },
      { property: "og:title", content: "Clases en vivo con profesores verificados — Cometa" },
      { property: "og:description", content: "Clases virtuales en vivo para primaria y secundaria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClasesPage,
});

const FILTER_STEPS = [
  { icon: GraduationCap, title: "Título y experiencia", text: "Revisamos su formación docente y años enseñando." },
  { icon: Video, title: "Clase demo", text: "Dictan una clase de prueba evaluada por especialistas." },
  { icon: ShieldCheck, title: "Verificación", text: "Validamos identidad y antecedentes para tu seguridad." },
  { icon: ClipboardCheck, title: "Evaluación continua", text: "Los alumnos califican cada clase. Solo se quedan los mejores." },
];

function ClasesPage() {
  const [subject, setSubject] = useState<Subject | "Todas">("Todas");
  const [level, setLevel] = useState<Level | "Todos">("Todos");
  const [booked, setBooked] = useState<Set<string>>(new Set());

  const list = useMemo(
    () =>
      CLASSES.filter(
        (c) => (subject === "Todas" || c.subject === subject) && (level === "Todos" || c.level === level),
      ),
    [subject, level],
  );
  const liveNow = CLASSES.find((c) => c.live)!;
  const liveTeacher = TEACHERS.find((t) => t.id === liveNow.teacherId)!;

  function toggle(id: string, title: string) {
    setBooked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Reserva cancelada", { description: title });
      } else {
        next.add(id);
        toast.success("¡Lugar reservado! 🎉", { description: `Te avisaremos antes de "${title}".` });
      }
      return next;
    });
  }

  return (
    <>
      <PageHero
        eyebrow="🎥 Clases en vivo"
        emoji="👩‍🏫"
        title={<>Aprende en vivo con <span className="text-pink">profes top</span></>}
        description="Grupos de máximo 4 alumnos del mismo nivel, clases de 1 hora y un docente constante que pasó nuestro filtro de calidad."
      >
        <div className="flex max-w-xl items-center gap-4 rounded-3xl border-[2.5px] border-navy-foreground bg-card p-4 text-foreground shadow-pop-pink">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-pink" />
          </span>
          <div className="flex-1">
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-pink">En vivo ahora</p>
            <p className="font-display text-lg font-bold text-navy">{liveNow.title}</p>
            <p className="text-sm text-muted-foreground">{liveTeacher.name} · {liveNow.taken} estudiantes conectados</p>
          </div>
          <Button variant="pink" onClick={() => toast.success("Entrando a la clase… 🚀", { description: "Prepara tu cuaderno." })}>
            Unirme
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-navy">Próximas clases</h2>
          <div className="flex rounded-full border-[2.5px] border-navy-deep bg-card p-1">
            {(["Todos", "Primaria", "Secundaria"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-display font-semibold text-navy transition-colors",
                  level === l && "bg-navy text-navy-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {(["Todas", ...SUBJECTS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={cn(
                "rounded-full border-[2.5px] border-navy-deep px-4 py-1.5 font-display font-medium transition-all hover:-translate-y-0.5",
                subject === s ? "bg-pink text-pink-foreground shadow-pop-sm" : "bg-card text-navy",
              )}
            >
              {s === "Todas" ? "✨ Todas" : `${SUBJECT_EMOJI[s]} ${s}`}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => {
            const t = TEACHERS.find((x) => x.id === c.teacherId)!;
            const isBooked = booked.has(c.id);
            const left = c.seats - c.taken - (isBooked ? 1 : 0);
            return (
              <article key={c.id} className="card-pop lift flex flex-col p-6 animate-pop">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-pink-soft px-3 py-1 font-display text-sm font-semibold text-secondary-foreground">
                    {SUBJECT_EMOJI[c.subject]} {c.subject}
                  </span>
                  <span className="font-display text-sm font-semibold text-muted-foreground">{c.level} · {c.grade}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-navy">{c.title}</h3>
                <div className="mt-4 flex items-center gap-3">
                  <span className={cn("grid size-11 place-items-center rounded-full border-2 border-navy-deep font-display font-bold", TONE_BG[t.tone])}>
                    {t.initials}
                  </span>
                  <div>
                    <p className="flex items-center gap-1 font-semibold text-foreground">
                      {t.name} <BadgeCheck className="size-4 text-pink" aria-label="Profesor verificado" />
                    </p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="size-3.5 fill-sunshine text-sunshine" /> {t.rating} · {t.years} años enseñando
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-4 text-sm font-semibold text-navy">
                  <span className="flex items-center gap-1"><CalendarClock className="size-4" /> {c.day}, {c.time}</span>
                  <span className="flex items-center gap-1"><Users className="size-4" /> {left} cupos</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-candy transition-all" style={{ width: `${((c.seats - left) / c.seats) * 100}%` }} />
                </div>
                <Button
                  variant={isBooked ? "success" : "navy"}
                  size="lg"
                  className="mt-6"
                  onClick={() => toggle(c.id, c.title)}
                >
                  {isBooked ? <><Check /> ¡Reservado!</> : "Reservar mi lugar"}
                </Button>
              </article>
            );
          })}
          {list.length === 0 && (
            <p className="col-span-full rounded-3xl border-2 border-dashed border-navy/30 p-10 text-center text-lg text-muted-foreground">
              No hay clases con ese filtro todavía. ¡Prueba otra materia! 🔍
            </p>
          )}
        </div>
      </section>

      <section className="bg-pink-soft">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center text-4xl font-bold text-navy">
            Nuestro filtro de profesores <span className="text-pink">🛡️</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Cada docente pasa cuatro controles antes de enseñar en Cometa.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {FILTER_STEPS.map((s, i) => (
              <li key={s.title} className="card-pop relative p-6">
                <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full border-2 border-navy-deep bg-sunshine font-display font-bold text-sunshine-foreground">
                  {i + 1}
                </span>
                <s.icon className="mt-2 size-8 text-pink" />
                <h3 className="mt-3 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-1 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {TEACHERS.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-full border-[2.5px] border-navy-deep bg-card py-2 pl-2 pr-5 shadow-pop-sm">
                <span className={cn("grid size-10 place-items-center rounded-full border-2 border-navy-deep font-display font-bold", TONE_BG[t.tone])}>
                  {t.initials}
                </span>
                <div>
                  <p className="font-display font-semibold leading-tight text-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.subject} · {t.students.toLocaleString("es-PE")} alumnos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
