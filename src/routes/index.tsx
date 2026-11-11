import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BookOpen, ChartLine, Gift, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/site/PageHero";
import heroKids from "@/assets/hero-kids.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cometa — Refuerzo escolar divertido y de calidad" },
      {
        name: "description",
        content:
          "Clases en vivo con profesores verificados, material de reforzamiento, seguimiento de progreso y becas con premios para primaria y secundaria.",
      },
      { property: "og:title", content: "Cometa — Refuerzo escolar divertido y de calidad" },
      {
        property: "og:description",
        content: "Aprende con profesores verificados, gana insignias y postula a becas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { to: "/clases", icon: Video, title: "Clases en vivo", text: "Profesores que pasaron nuestro filtro de 4 pasos.", tone: "bg-pink text-pink-foreground" },
  { to: "/material", icon: BookOpen, title: "Material de refuerzo", text: "Guías, videos, ejercicios y juegos por grado.", tone: "bg-sky text-navy-deep" },
  { to: "/progreso", icon: ChartLine, title: "Mi progreso", text: "Mira tu avance, rachas e insignias ganadas.", tone: "bg-sunshine text-sunshine-foreground" },
  { to: "/becas", icon: Gift, title: "Becas y premios", text: "Concursos, retos y becas para seguir creciendo.", tone: "bg-mint text-navy-deep" },
] as const;

const STATS = [
  { value: "12 000+", label: "estudiantes" },
  { value: "180", label: "profes verificados" },
  { value: "2 500", label: "materiales" },
  { value: "420", label: "becas entregadas" },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-night text-navy-foreground">
        <Sparkles />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-pink bg-pink/15 px-4 py-1 font-display text-sm font-semibold text-pink">
              🚀 Refuerzo escolar para todos
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">
              ¡Aprender puede ser <span className="text-pink">increíble</span>!
            </h1>
            <p className="mt-6 max-w-lg text-lg text-navy-foreground/80">
              Clases en vivo con profes de verdad, material para practicar y becas para que ningún
              estudiante de primaria o secundaria se quede sin apoyo.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild variant="pink" size="xl">
                <Link to="/planes">
                  Empieza gratis <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="pop" size="xl">
                <Link to="/clases">Ver clases de hoy</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-navy-foreground/70">
              <BadgeCheck className="size-5 text-mint" /> Todos los profesores pasan entrevista, clase demo y verificación.
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
              <p className="font-display text-sm text-muted-foreground">Racha de hoy</p>
              <p className="font-display text-2xl font-bold">🔥 7 días</p>
            </div>
            <div
              className="absolute -right-4 -top-5 animate-float rounded-2xl border-[2.5px] border-navy-deep bg-sunshine px-5 py-3 text-sunshine-foreground shadow-pop"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="font-display text-xl font-bold">+150 XP ⭐</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-[2.5px] border-navy-deep bg-pink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center text-pink-foreground">
              <p className="font-display text-4xl font-bold">{s.value}</p>
              <p className="font-semibold opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dots">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center text-4xl font-bold text-navy md:text-5xl">
            Todo lo que necesitas para <span className="text-pink">brillar</span> ✨
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted-foreground">
            Elige por dónde empezar. Cada sección está pensada para que practicar sea un juego.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Link key={f.to} to={f.to} className="card-pop lift group block p-6">
                <span className={`grid size-14 place-items-center rounded-2xl border-[2.5px] border-navy-deep ${f.tone} group-hover:animate-wiggle`}>
                  <f.icon className="size-7" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-display font-semibold text-pink">
                  Explorar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="card-pop grid items-center gap-8 overflow-hidden bg-navy p-10 text-navy-foreground md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-4xl font-bold">¿No puedes pagar refuerzo? 💗</h2>
            <p className="mt-3 max-w-2xl text-lg text-navy-foreground/80">
              Tenemos un plan gratis para siempre y becas de hasta 100% para estudiantes de colegios
              públicos. Postular toma menos de 5 minutos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="pink" size="xl">
              <Link to="/becas">Ver becas</Link>
            </Button>
            <Button asChild variant="pop" size="xl">
              <Link to="/planes">Ver planes</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
