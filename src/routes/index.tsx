import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ClipboardCheck, FileText, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/site/PageHero";
import heroKids from "@/assets/hero-kids.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cometa — Tutoría virtual con diagnóstico y reporte semanal" },
      {
        name: "description",
        content:
          "Diagnóstico inicial, grupos de máximo 4 alumnos por nivel, docente constante y reporte semanal para la familia. Primera clase gratis.",
      },
      { property: "og:title", content: "Cometa — Tutoría virtual con diagnóstico y reporte semanal" },
      {
        property: "og:description",
        content: "Ningún estudiante debería avanzar solo: empezamos midiendo su nivel y te mostramos su avance cada semana.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  { icon: ClipboardCheck, title: "Diagnóstico", text: "Medimos el nivel por tema antes de la primera clase.", tone: "bg-pink text-pink-foreground" },
  { icon: Users, title: "Grupo por nivel", text: "Máximo 4 alumnos del mismo nivel, con horario fijo.", tone: "bg-navy text-navy-foreground" },
  { icon: GraduationCap, title: "Docente constante", text: "2 clases de 1 hora por semana con el mismo docente.", tone: "bg-sky text-navy-deep" },
  { icon: FileText, title: "Reporte semanal", text: "La familia recibe el avance y el ajuste de la semana.", tone: "bg-sunshine text-sunshine-foreground" },
] as const;

const FACTS = [
  { value: "66%", label: "de los estudiantes peruanos de 15 años no llega al nivel básico en matemática (PISA 2022)" },
  { value: "≤ 4", label: "alumnos por grupo, del mismo nivel" },
  { value: "2 × 1 h", label: "clases por semana con el mismo docente" },
  { value: "Cada semana", label: "reporte de avance para la familia" },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-night text-navy-foreground">
        <Sparkles />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-pink bg-pink/15 px-4 py-1 font-display text-sm font-semibold text-pink">
              🚀 Tutoría virtual para secundaria
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">
              Ningún estudiante debería avanzar <span className="text-pink">solo</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-navy-foreground/80">
              Empezamos con un diagnóstico, armamos un grupo de hasta 4 alumnos de su mismo nivel y un docente
              constante los acompaña. Cada semana, tu familia ve cómo avanza.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild variant="pink" size="xl">
                <Link to="/registro" search={{ plan: "grupal" }}>
                  Clase de prueba gratis <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="pop" size="xl">
                <Link to="/planes">Ver planes y precios</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-navy-foreground/70">
              <BadgeCheck className="size-5 text-mint" /> Diagnóstico en 10 minutos. Sin pagar nada hoy.
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rotate-2 rounded-[2.5rem] bg-pink" />
            <img
              src={heroKids}
              alt="Niños y niñas aprendiendo juntos frente a una laptop"
              width={1280}
              height={1024}
              className="relative rounded-[2.5rem] border-[3px] border-navy-foreground"
            />
            <div className="absolute -bottom-6 -left-6 animate-float rounded-2xl border-[2.5px] border-navy-deep bg-card px-5 py-3 text-foreground shadow-pop">
              <p className="font-display text-sm text-muted-foreground">Reporte semanal</p>
              <p className="font-display text-2xl font-bold">📈 45% → 70%</p>
            </div>
            <div
              className="absolute -right-4 -top-5 animate-float rounded-2xl border-[2.5px] border-navy-deep bg-sunshine px-5 py-3 text-sunshine-foreground shadow-pop"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="font-display text-xl font-bold">Grupo de 4 ⭐</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-[2.5px] border-navy-deep bg-pink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {FACTS.map((s) => (
            <div key={s.value} className="text-center text-pink-foreground">
              <p className="font-display text-4xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm font-semibold opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dots">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center text-4xl font-bold text-navy md:text-5xl">
            Así funciona <span className="text-pink">Cometa</span> ✨
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted-foreground">
            Primero medimos, después enseñamos lo que hace falta y siempre mostramos el avance.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((f, i) => (
              <div key={f.title} className="card-pop lift group p-6">
                <span className={`grid size-14 place-items-center rounded-2xl border-[2.5px] border-navy-deep ${f.tone} group-hover:animate-wiggle`}>
                  <f.icon className="size-7" />
                </span>
                <p className="mt-4 font-display text-sm font-semibold text-pink">Paso {i + 1}</p>
                <h3 className="text-2xl font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="pink" size="xl">
              <Link to="/registro" search={{ plan: "grupal" }}>Empezar ahora <ArrowRight /></Link>
            </Button>
            <Button asChild variant="pop" size="xl">
              <Link to="/clases">Conocer a los docentes</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="card-pop grid items-center gap-8 overflow-hidden bg-navy p-10 text-navy-foreground md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Plan Grupal</p>
            <h2 className="mt-1 text-4xl font-bold">S/ 190 al mes · primera clase gratis</h2>
            <p className="mt-3 max-w-2xl text-lg text-navy-foreground/80">
              2 clases de 1 hora por semana en un grupo de máximo 4 alumnos, con diagnóstico y reporte semanal incluidos.
              También tenemos clases individuales desde S/ 75 y becas para quienes más lo necesitan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="pink" size="xl">
              <Link to="/planes">Ver planes</Link>
            </Button>
            <Button asChild variant="pop" size="xl">
              <Link to="/becas">Ver becas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
