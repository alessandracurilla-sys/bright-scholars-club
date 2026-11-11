import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarCheck, Check, Flame, Lock, Star, Target } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { BADGES, SUBJECT_EMOJI, SUBJECT_PROGRESS, WEEKLY_MINUTES } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progreso")({
  head: () => ({
    meta: [
      { title: "Mi progreso y avance académico — Cometa" },
      {
        name: "description",
        content: "Revisa tus minutos de estudio, avance por materia, rachas, metas e insignias ganadas.",
      },
      { property: "og:title", content: "Mi progreso y avance académico — Cometa" },
      { property: "og:description", content: "Rachas, metas, insignias y avance por materia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgresoPage,
});

const INITIAL_GOALS = [
  { id: "g1", text: "Asistir a 3 clases en vivo", done: true },
  { id: "g2", text: "Terminar la guía de fracciones", done: true },
  { id: "g3", text: "Hacer el reto rápido 5 días", done: false },
  { id: "g4", text: "Leer 20 minutos de un cuento", done: false },
];

const BAR_TONES = ["bg-pink", "bg-navy", "bg-sky", "bg-sunshine", "bg-mint"];

function ProgresoPage() {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const doneCount = goals.filter((g) => g.done).length;
  const xp = 2350 + doneCount * 50;
  const level = Math.floor(xp / 500) + 1;
  const levelPct = ((xp % 500) / 500) * 100;

  const stats = [
    { icon: Flame, label: "Racha", value: "7 días", tone: "bg-pink text-pink-foreground" },
    { icon: Star, label: "Experiencia", value: `${xp.toLocaleString("es-PE")} XP`, tone: "bg-sunshine text-sunshine-foreground" },
    { icon: CalendarCheck, label: "Clases asistidas", value: "18", tone: "bg-sky text-navy-deep" },
    { icon: Target, label: "Metas semana", value: `${doneCount}/${goals.length}`, tone: "bg-mint text-navy-deep" },
  ];

  return (
    <>
      <PageHero
        eyebrow="📈 Mi progreso"
        emoji="🏅"
        title={<>¡Hola, Valentina! <span className="text-pink">Vas volando</span></>}
        description="6.º de primaria · Así va tu avance esta semana. Cada clase, guía y reto suma experiencia."
      >
        <div className="max-w-xl rounded-3xl border-[2.5px] border-navy-foreground bg-card p-5 text-foreground shadow-pop-pink">
          <div className="flex items-center justify-between font-display">
            <span className="text-lg font-bold text-navy">Nivel {level} · Exploradora</span>
            <span className="text-sm font-semibold text-muted-foreground">{xp % 500} / 500 XP</span>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-navy-deep bg-muted">
            <div className="h-full rounded-full bg-candy transition-all duration-700" style={{ width: `${levelPct}%` }} />
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-pop lift flex items-center gap-4 p-5">
              <span className={cn("grid size-14 place-items-center rounded-2xl border-[2.5px] border-navy-deep", s.tone)}>
                <s.icon className="size-7" />
              </span>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold text-navy">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card-pop p-6">
            <h2 className="text-2xl font-bold text-navy">Minutos de estudio esta semana</h2>
            <p className="text-sm text-muted-foreground">Tu meta diaria es de 30 minutos.</p>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_MINUTES}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--navy)", fontFamily: "Fredoka", fontSize: 14 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: "var(--pink-soft)" }}
                    contentStyle={{ borderRadius: 16, border: "2.5px solid var(--navy-deep)", fontFamily: "Nunito" }}
                    formatter={(v) => [`${v} min`, "Estudio"]}
                  />
                  <ReferenceLine y={30} stroke="var(--navy)" strokeDasharray="6 6" />
                  <Bar dataKey="minutos" fill="var(--pink)" radius={[12, 12, 4, 4]} stroke="var(--navy-deep)" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-pop p-6">
            <h2 className="text-2xl font-bold text-navy">Avance por materia</h2>
            <ul className="mt-6 space-y-5">
              {SUBJECT_PROGRESS.map((s, i) => (
                <li key={s.subject}>
                  <div className="flex items-center justify-between font-display">
                    <span className="font-semibold text-navy">{SUBJECT_EMOJI[s.subject]} {s.subject}</span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      {s.value}%
                      <span className="grid size-7 place-items-center rounded-full border-2 border-navy-deep bg-card text-navy">{s.grade}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-3.5 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full transition-all duration-700", BAR_TONES[i % BAR_TONES.length])} style={{ width: `${s.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-pink-soft p-4 text-sm text-foreground">
              💡 <strong>Consejo:</strong> Historia necesita un empujón. Hay una clase el jueves a las 17:00.
              <Link to="/clases" className="ml-1 font-semibold text-pink underline underline-offset-2">Reservar</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="card-pop p-6">
            <h2 className="text-2xl font-bold text-navy">Mis metas de la semana</h2>
            <ul className="mt-5 space-y-3">
              {goals.map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => {
                      setGoals((prev) => prev.map((x) => (x.id === g.id ? { ...x, done: !x.done } : x)));
                      if (!g.done) toast.success("¡Meta cumplida! +50 XP ⭐");
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border-[2.5px] border-navy-deep px-4 py-3 text-left font-semibold transition-all hover:-translate-y-0.5",
                      g.done ? "bg-mint-soft text-muted-foreground line-through" : "bg-card text-foreground",
                    )}
                  >
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg border-2 border-navy-deep", g.done ? "bg-mint" : "bg-card")}>
                      {g.done && <Check className="size-4 text-navy-deep" />}
                    </span>
                    {g.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-pop p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-navy">Mis insignias</h2>
              <span className="font-display text-sm font-semibold text-muted-foreground">
                {BADGES.filter((b) => b.earned).length} de {BADGES.length}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {BADGES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => toast(b.earned ? `${b.emoji} ${b.name}` : "🔒 Aún bloqueada", { description: b.earned ? "¡Ya es tuya!" : "Sigue practicando para desbloquearla." })}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-2xl border-[2.5px] p-4 text-center transition-all hover:-translate-y-1",
                    b.earned ? "border-navy-deep bg-sunshine/25 shadow-pop-sm" : "border-dashed border-navy/30 bg-muted",
                  )}
                >
                  <span className={cn("relative text-4xl", b.earned ? "group-hover:animate-wiggle" : "opacity-30 grayscale")}>
                    {b.emoji}
                    {!b.earned && <Lock className="absolute -bottom-1 -right-2 size-4 text-navy" />}
                  </span>
                  <span className="font-display text-sm font-semibold leading-tight text-navy">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="pink" size="xl">
            <Link to="/material">Seguir practicando 🚀</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
