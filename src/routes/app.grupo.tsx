import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarClock, Users, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LEVEL_STYLE } from "@/lib/platform/diagnostic";
import { GROUP_MAX, GROUP_MIN_TO_OPEN, SCHEDULE_BLOCKS, groupFor } from "@/lib/platform/group";
import { updatePlatform, usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/grupo")({
  component: GrupoPage,
});

function GrupoPage() {
  const { family, diagnostic, block, trialBooked } = usePlatform();
  if (!family) return null;

  if (!diagnostic) {
    return (
      <div className="card-pop p-10 text-center">
        <p className="text-2xl font-bold text-navy">Primero el diagnóstico</p>
        <p className="mt-2 text-muted-foreground">Con el resultado armamos un grupo de su mismo nivel.</p>
        <Button asChild variant="pink" size="xl" className="mt-6"><Link to="/diagnostico">Hacer el diagnóstico</Link></Button>
      </div>
    );
  }

  const group = groupFor(family.subject, diagnostic.overall, block, family.student);
  const t = group.teacher;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="space-y-6">
        <div className="card-pop p-7">
          <h2 className="text-2xl font-bold text-navy">1. Elige el horario fijo del grupo</h2>
          <p className="mt-1 text-muted-foreground">Son 2 clases de 1 hora por semana, siempre con el mismo docente.</p>
          <div className="mt-5 grid gap-3">
            {SCHEDULE_BLOCKS.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  updatePlatform({ block: b.id });
                  toast.success("Horario guardado", { description: b.label });
                }}
                aria-pressed={block === b.id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-[2.5px] border-navy-deep px-5 py-4 text-left font-display text-lg font-semibold transition-all",
                  block === b.id ? "bg-pink text-pink-foreground shadow-pop-sm" : "bg-card text-navy hover:-translate-y-0.5",
                )}
              >
                <CalendarClock className="size-5" /> {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card-pop p-7">
          <h2 className="text-2xl font-bold text-navy">2. Clase de prueba gratis</h2>
          <p className="mt-1 text-muted-foreground">Sin costo y sin compromiso. Si no te convence, no pasa nada.</p>
          <Button
            variant={trialBooked ? "success" : "pink"}
            size="xl"
            className="mt-5"
            disabled={!block}
            onClick={() => {
              updatePlatform({ trialBooked: true });
              toast.success("¡Clase de prueba reservada! 🎉", { description: "Te enviaremos el enlace de la sala antes de la clase." });
            }}
          >
            <Video /> {trialBooked ? "Clase de prueba reservada" : block ? "Reservar clase de prueba" : "Elige un horario primero"}
          </Button>
        </div>
      </section>

      <aside className="card-pop h-fit p-7">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Tu grupo</p>
        <h3 className="mt-1 text-2xl font-bold text-navy">{group.name}</h3>
        <span className={cn("mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold", LEVEL_STYLE[diagnostic.overall])}>
          Agrupado por nivel, no por edad
        </span>
        <p className="mt-5 flex items-center gap-2 font-semibold text-navy">
          <Users className="size-4" /> {group.members.length} de {GROUP_MAX} cupos ocupados
        </p>
        <div className="mt-3 flex gap-2">
          {Array.from({ length: GROUP_MAX }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "grid size-12 place-items-center rounded-full border-2 border-navy-deep font-display font-bold",
                group.members[i] ? "bg-sky text-navy-deep" : "border-dashed bg-card text-muted-foreground",
              )}
            >
              {group.members[i] ?? "+"}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          El grupo abre con {GROUP_MIN_TO_OPEN} alumnos. Los compañeros son de ejemplo hasta que haya inscripciones reales.
        </p>
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-pink-soft p-4">
          <span className="grid size-11 place-items-center rounded-full border-2 border-navy-deep bg-pink font-display font-bold text-pink-foreground">{t.initials}</span>
          <div>
            <p className="flex items-center gap-1 font-semibold text-foreground">{t.name} <BadgeCheck className="size-4 text-pink" aria-label="Docente verificado" /></p>
            <p className="text-sm text-muted-foreground">Tu docente constante · {t.years} años enseñando</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
