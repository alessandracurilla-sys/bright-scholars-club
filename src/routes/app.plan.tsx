import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GROUP_INCLUDES, INDIVIDUAL_INCLUDES, PLAN_OPTIONS, formatSoles, getPlan, type PlanId } from "@/lib/platform/plans";
import { updatePlatform, usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/plan")({
  component: PlanPage,
});

function PlanPage() {
  const { family, paid, trialBooked } = usePlatform();
  if (!family) return null;
  const plan = getPlan(family.plan);
  const includes = plan.kind === "grupal" ? GROUP_INCLUDES : INDIVIDUAL_INCLUDES;

  function choose(id: PlanId) {
    if (!family) return;
    updatePlatform({ family: { ...family, plan: id }, paid: false });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="card-pop p-7">
        <h2 className="text-2xl font-bold text-navy">Tu plan</h2>
        <div className="mt-4 grid gap-3">
          {PLAN_OPTIONS.map((p) => (
            <button
              key={p.id}
              onClick={() => choose(p.id)}
              aria-pressed={family.plan === p.id}
              className={cn(
                "flex items-center justify-between gap-4 rounded-2xl border-[2.5px] border-navy-deep px-5 py-4 text-left transition-all",
                family.plan === p.id ? "bg-pink text-pink-foreground shadow-pop-sm" : "bg-card text-navy hover:-translate-y-0.5",
              )}
            >
              <span>
                <span className="block font-display text-lg font-bold">{p.name}</span>
                <span className={cn("block text-sm", family.plan === p.id ? "opacity-90" : "text-muted-foreground")}>{p.detail}</span>
              </span>
              <span className="shrink-0 text-right font-display">
                <span className="block text-2xl font-bold">{formatSoles(p.price)}</span>
                <span className="block text-xs opacity-80">{p.unit}</span>
              </span>
            </button>
          ))}
        </div>
        <ul className="mt-6 space-y-2">
          {includes.map((f) => (
            <li key={f} className="flex items-start gap-2 text-foreground">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pink text-pink-foreground"><Check className="size-3.5" /></span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      <aside className="card-pop h-fit p-7">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Resumen</p>
        <p className="mt-1 text-2xl font-bold text-navy">{plan.name}</p>
        <p className="mt-1 font-display text-4xl font-bold text-pink">{formatSoles(plan.price)} <span className="text-base text-muted-foreground">{plan.unit}</span></p>
        <p className="mt-1 text-sm text-muted-foreground">IGV incluido.</p>
        <p className="mt-4 rounded-2xl bg-pink-soft p-4 text-sm text-foreground">
          {trialBooked ? "Tu clase de prueba ya está reservada: no pagas nada hasta después de probar." : "Primero reserva tu clase de prueba gratis en “Mi grupo”."}
        </p>
        <Button
          variant={paid ? "success" : "pink"}
          size="xl"
          className="mt-5 w-full"
          disabled={paid}
          onClick={() => {
            updatePlatform({ paid: true });
            toast.success("Plan activado (simulación)", { description: "El cobro real con tarjeta, Yape o Plin se conectará con la pasarela de pagos." });
          }}
        >
          {paid ? "Plan activo" : "Activar plan"}
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Esta versión no cobra: simula la activación. Los pagos reales se conectarán con una pasarela (Culqi o Izipay).
        </p>
        <Button asChild variant="pop" size="lg" className="mt-4 w-full"><Link to="/planes">Comparar planes</Link></Button>
      </aside>
    </div>
  );
}
