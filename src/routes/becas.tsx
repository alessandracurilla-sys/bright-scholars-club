import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Award, CalendarDays, Crown, Gift, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "@/components/site/PageHero";
import { TONE_BG } from "@/components/site/tones";
import { CONTESTS, LEADERBOARD, SCHOLARSHIPS, daysUntil, type Scholarship } from "@/lib/data";
import { cn } from "@/lib/utils";
import trophy from "@/assets/trophy.jpg";

export const Route = createFileRoute("/becas")({
  head: () => ({
    meta: [
      { title: "Becas, concursos y premios educativos — Cometa" },
      {
        name: "description",
        content: "Postula a becas de hasta 100% y participa en olimpiadas y concursos con premios para estudiantes.",
      },
      { property: "og:title", content: "Becas, concursos y premios educativos — Cometa" },
      { property: "og:description", content: "Becas de hasta 100%, olimpiadas y concursos con premios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BecasPage,
});

const MEDALS = ["🥇", "🥈", "🥉"];

function BecasPage() {
  const [applying, setApplying] = useState<Scholarship | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [joined, setJoined] = useState<Set<string>>(new Set());

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const school = String(fd.get("school") ?? "").trim();
    const why = String(fd.get("why") ?? "").trim();
    if (name.length < 2 || school.length < 2 || why.length < 20) {
      toast.error("Completa todos los campos (motivación de al menos 20 letras)");
      return;
    }
    if (applying) setApplied((p) => new Set(p).add(applying.id));
    toast.success("¡Postulación enviada! 💌", { description: "Te responderemos por correo en 7 días." });
    setApplying(null);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-night text-navy-foreground">
        <Sparkles />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-pink bg-pink/15 px-4 py-1 font-display text-sm font-semibold text-pink">
              🏆 Becas y oportunidades
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-6xl">
              Tu esfuerzo tiene <span className="text-pink">premio</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-navy-foreground/80">
              Becas de hasta 100%, olimpiadas y concursos con tablets, libros, telescopios y viajes educativos.
            </p>
            <div className="mt-8 flex gap-8 font-display">
              <div><p className="text-4xl font-bold text-sunshine">160</p><p className="text-navy-foreground/70">becas abiertas</p></div>
              <div><p className="text-4xl font-bold text-pink">4</p><p className="text-navy-foreground/70">concursos activos</p></div>
              <div><p className="text-4xl font-bold text-sky">S/ 0</p><p className="text-navy-foreground/70">para postular</p></div>
            </div>
          </div>
          <img
            src={trophy}
            alt="Trofeo sonriente con birrete y medallas"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-sm animate-float rounded-[2.5rem] border-[3px] border-navy-foreground shadow-pop-pink"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-4xl font-bold text-navy">Becas abiertas 🎓</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SCHOLARSHIPS.map((s) => {
            const days = daysUntil(s.deadline);
            const isApplied = applied.has(s.id);
            return (
              <article key={s.id} className="card-pop lift flex flex-col overflow-hidden">
                <div className={cn("flex items-center justify-between px-6 py-4", TONE_BG[s.tone])}>
                  <Award className="size-8" />
                  <span className="rounded-full border-2 border-navy-deep bg-card px-3 py-1 font-display text-sm font-bold text-navy">
                    ⏳ {days} días
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-sm font-semibold text-pink">{s.sponsor}</p>
                  <h3 className="mt-1 text-2xl font-bold text-navy">{s.title}</h3>
                  <p className="mt-3 rounded-xl bg-pink-soft px-3 py-2 font-semibold text-foreground">🎁 {s.coverage}</p>
                  <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="size-4" /> {s.spots} cupos</span>
                    <span>{s.level}</span>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                    {s.requirements.map((r) => <li key={r}>✔️ {r}</li>)}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button
                      variant={isApplied ? "success" : "pink"}
                      size="lg"
                      className="w-full"
                      disabled={isApplied}
                      onClick={() => setApplying(s)}
                    >
                      {isApplied ? "✓ Postulación enviada" : "Postular ahora"}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-pink-soft">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-4xl font-bold text-navy">Concursos con premios 🎉</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {CONTESTS.map((c) => {
                const isIn = joined.has(c.id);
                return (
                  <div key={c.id} className="card-pop lift p-6">
                    <div className="flex items-start justify-between">
                      <span className="text-5xl">{c.emoji}</span>
                      <span className="flex items-center gap-1 rounded-full bg-navy px-3 py-1 font-display text-sm text-navy-foreground">
                        <CalendarDays className="size-4" /> {c.date}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-navy">{c.title}</h3>
                    <p className="mt-2 flex items-center gap-2 font-semibold text-pink"><Gift className="size-4" /> {c.prize}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{(c.participants + (isIn ? 1 : 0)).toLocaleString("es-PE")} inscritos</p>
                    <Button
                      variant={isIn ? "success" : "navy"}
                      className="mt-4 w-full"
                      onClick={() => {
                        setJoined((p) => {
                          const n = new Set(p);
                          if (n.has(c.id)) n.delete(c.id);
                          else {
                            n.add(c.id);
                            toast.success(`¡Inscrito en ${c.title}! 🍀`);
                          }
                          return n;
                        });
                      }}
                    >
                      {isIn ? "✓ Inscrito" : "Inscribirme"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-pop self-start overflow-hidden">
            <div className="flex items-center gap-3 bg-navy px-6 py-5 text-navy-foreground">
              <Crown className="size-7 text-sunshine" />
              <h2 className="text-2xl font-bold">Ranking del mes</h2>
            </div>
            <ol className="divide-y divide-border">
              {LEADERBOARD.map((p, i) => (
                <li key={p.name} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-pink-soft">
                  <span className="w-8 text-center font-display text-2xl font-bold text-navy">{MEDALS[i] ?? i + 1}</span>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-navy">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.school}</p>
                  </div>
                  <span className="rounded-full bg-sunshine px-3 py-1 font-display text-sm font-bold text-sunshine-foreground">
                    {p.xp.toLocaleString("es-PE")} XP
                  </span>
                </li>
              ))}
            </ol>
            <p className="bg-muted px-6 py-4 text-sm text-muted-foreground">
              Los 3 primeros del mes ganan 1 mes del plan Cometa gratis. 🚀
            </p>
          </div>
        </div>
      </section>

      <Dialog open={!!applying} onOpenChange={(o) => !o && setApplying(null)}>
        <DialogContent className="rounded-3xl border-[2.5px] border-navy-deep shadow-pop">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-navy">Postular a {applying?.title}</DialogTitle>
            <DialogDescription>Cuéntanos un poco sobre ti. ¡No hay respuestas incorrectas!</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-display text-navy">Nombre completo</Label>
              <Input id="name" name="name" maxLength={80} className="mt-1.5 h-11 rounded-xl border-2 border-navy-deep" />
            </div>
            <div>
              <Label htmlFor="school" className="font-display text-navy">Colegio y grado</Label>
              <Input id="school" name="school" maxLength={120} placeholder="Ej. I.E. 1052 · 5.º primaria" className="mt-1.5 h-11 rounded-xl border-2 border-navy-deep" />
            </div>
            <div>
              <Label htmlFor="why" className="font-display text-navy">¿Por qué quieres esta beca?</Label>
              <Textarea id="why" name="why" maxLength={600} rows={4} className="mt-1.5 rounded-xl border-2 border-navy-deep" />
            </div>
            <Button type="submit" variant="pink" size="lg" className="w-full">Enviar postulación 💌</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
