import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { GROUP_INCLUDES, INDIVIDUAL_INCLUDES, PLAN_OPTIONS, formatSoles } from "@/lib/platform/plans";

export const Route = createFileRoute("/planes")({
  head: () => ({
    meta: [
      { title: "Planes de tutoría virtual — Cometa" },
      {
        name: "description",
        content: "Plan grupal de S/ 190 al mes (2 clases de 1 hora por semana, máximo 4 alumnos) o clases individuales desde S/ 75. Primera clase gratis.",
      },
      { property: "og:title", content: "Planes de tutoría virtual — Cometa" },
      { property: "og:description", content: "Grupo por nivel, docente constante y reporte semanal para la familia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanesPage,
});

function PlanesPage() {
  const individual = PLAN_OPTIONS.filter((p) => p.kind === "individual");

  return (
    <>
      <PageHero
        eyebrow="🎟️ Planes"
        emoji="🎒"
        title={<>Un plan claro, con <span className="text-pink">primera clase gratis</span></>}
        description="Grupos de máximo 4 alumnos del mismo nivel, o clases individuales. Todos incluyen diagnóstico y reporte de avance para la familia."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1.1fr_1fr]">
        <article className="card-pop relative flex flex-col bg-navy p-8 text-navy-foreground">
          <span className="absolute -top-4 right-6 rounded-full border-2 border-navy-deep bg-sunshine px-3 py-1 font-display text-sm font-bold text-sunshine-foreground">
            Recomendado
          </span>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Plan Grupal</p>
          <p className="mt-3 font-display">
            <span className="text-6xl font-bold">S/ 190</span> <span className="opacity-75">al mes</span>
          </p>
          <p className="mt-2 text-navy-foreground/80">2 clases de 1 hora por semana · hasta 4 alumnos · mismo docente</p>
          <ul className="mt-6 space-y-3">
            {GROUP_INCLUDES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pink text-pink-foreground"><Check className="size-3.5" /></span>
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant="pink" size="xl" className="mt-8">
            <Link to="/registro" search={{ plan: "grupal" }}>Empezar con clase de prueba gratis</Link>
          </Button>
        </article>

        <article className="card-pop flex flex-col p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Individual</p>
          <p className="mt-1 text-lg text-muted-foreground">Clases 1 a 1 de 1 hora con un docente.</p>
          <div className="mt-5 space-y-3">
            {individual.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 rounded-2xl border-[2.5px] border-navy-deep p-4">
                <div>
                  <p className="font-display text-lg font-bold text-navy">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.detail}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-2xl font-bold text-navy">{formatSoles(p.price)}</p>
                  <Button asChild variant="pop" size="sm" className="mt-1">
                    <Link to="/registro" search={{ plan: p.id }}>Elegir</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-sm text-foreground">
            {INDIVIDUAL_INCLUDES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pink text-pink-foreground"><Check className="size-3.5" /></span>
                {f}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="card-pop grid gap-6 bg-pink-soft p-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold text-navy">¿Cómo se arman los grupos?</p>
            <p className="mt-2 text-muted-foreground">Por nivel del diagnóstico, no por edad. Tú eliges entre 2 o 3 horarios fijos y nosotros ubicamos a tu hijo o hija.</p>
          </div>
          <div>
            <p className="font-display text-xl font-bold text-navy">¿Y si no abre el grupo?</p>
            <p className="mt-2 text-muted-foreground">El grupo abre con 3 alumnos. Mientras tanto, la clase de prueba es gratis y sin compromiso.</p>
          </div>
          <div>
            <p className="font-display text-xl font-bold text-navy">¿Qué incluye el reporte?</p>
            <p className="mt-2 text-muted-foreground">Asistencia, avance por tema, lo que costó y el ajuste de la próxima semana, revisado por el docente.</p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Precios en soles, IGV incluido. ¿No puedes pagar? <Link to="/becas" className="font-bold text-pink underline underline-offset-2">Postula a una beca</Link>
        </p>
      </section>
    </>
  );
}
