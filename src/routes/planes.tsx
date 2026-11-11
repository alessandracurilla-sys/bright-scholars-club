import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/site/PageHero";
import { PLANS, planPrice, type Plan } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planes")({
  head: () => ({
    meta: [
      { title: "Registro y planes de refuerzo escolar — Cometa" },
      {
        name: "description",
        content: "Regístrate gratis o elige un plan de pago para clases en vivo ilimitadas, tutorías y material completo.",
      },
      { property: "og:title", content: "Registro y planes de refuerzo escolar — Cometa" },
      { property: "og:description", content: "Plan gratis para siempre y planes con clases ilimitadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanesPage,
});

const GRADES = [
  "1.º primaria", "2.º primaria", "3.º primaria", "4.º primaria", "5.º primaria", "6.º primaria",
  "1.º secundaria", "2.º secundaria", "3.º secundaria", "4.º secundaria", "5.º secundaria",
];

const schema = z.object({
  student: z.string().trim().min(2, "Escribe el nombre del estudiante").max(80),
  guardian: z.string().trim().min(2, "Escribe el nombre del apoderado").max(80),
  email: z.string().trim().email("Revisa el correo").max(255),
  grade: z.string().min(1, "Elige el grado"),
  terms: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos" }) }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function PlanesPage() {
  const [cycle, setCycle] = useState<"mensual" | "anual">("mensual");
  const [planId, setPlanId] = useState<Plan["id"]>("estrella");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const plan = PLANS.find((p) => p.id === planId)!;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse({
      student: fd.get("student"),
      guardian: fd.get("guardian"),
      email: fd.get("email"),
      grade: fd.get("grade"),
      terms: fd.get("terms") === "on",
    });
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) errs[issue.path[0] as keyof Errors] = issue.message;
      setErrors(errs);
      toast.error("Revisa los datos marcados");
      return;
    }
    setErrors({});
    setDone(result.data.student.split(" ")[0]);
  }

  return (
    <>
      <PageHero
        eyebrow="🎟️ Registro y planes"
        emoji="🎒"
        title={<>Elige tu plan y <span className="text-pink">despega</span></>}
        description="Empieza gratis hoy mismo. Si quieres más clases y tutorías, pásate a un plan de pago cuando quieras."
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex justify-center">
          <div className="flex items-center rounded-full border-[2.5px] border-navy-deep bg-card p-1 shadow-pop-sm">
            {(["mensual", "anual"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={cn(
                  "rounded-full px-6 py-2 font-display font-semibold capitalize text-navy transition-colors",
                  cycle === c && "bg-navy text-navy-foreground",
                )}
              >
                {c}
                {c === "anual" && <span className="ml-2 rounded-full bg-pink px-2 py-0.5 text-xs text-pink-foreground">2 meses gratis</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => {
            const selected = p.id === planId;
            const price = planPrice(p.monthly, cycle);
            return (
              <button
                key={p.id}
                onClick={() => setPlanId(p.id)}
                className={cn(
                  "card-pop relative flex flex-col p-7 text-left",
                  selected ? "-translate-y-2 shadow-pop-pink ring-4 ring-pink" : "lift",
                  p.highlight && "bg-navy text-navy-foreground",
                )}
              >
                {p.highlight && (
                  <span className="absolute -top-4 right-6 rounded-full border-2 border-navy-deep bg-sunshine px-3 py-1 font-display text-sm font-bold text-sunshine-foreground">
                    Más elegido
                  </span>
                )}
                <span className="text-5xl">{p.emoji}</span>
                <h3 className={cn("mt-3 text-3xl font-bold", p.highlight ? "text-navy-foreground" : "text-navy")}>{p.name}</h3>
                <p className={cn("text-sm", p.highlight ? "text-navy-foreground/75" : "text-muted-foreground")}>{p.tagline}</p>
                <p className="mt-5 font-display">
                  <span className="text-5xl font-bold">{price === 0 ? "Gratis" : `S/ ${price}`}</span>
                  {price > 0 && <span className="ml-1 opacity-70">/{cycle === "anual" ? "año" : "mes"}</span>}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pink text-pink-foreground">
                        <Check className="size-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <span
                  className={cn(
                    "mt-8 rounded-full border-[2.5px] border-navy-deep py-3 text-center font-display font-semibold",
                    selected ? "bg-pink text-pink-foreground" : "bg-card text-navy",
                  )}
                >
                  {selected ? "✓ Plan elegido" : "Elegir este plan"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="registro" className="mx-auto max-w-5xl px-6">
        <div className="card-pop grid overflow-hidden md:grid-cols-[1fr_1.3fr]">
          <div className="bg-candy p-8 text-pink-foreground">
            <h2 className="text-4xl font-bold">Crea tu cuenta</h2>
            <p className="mt-3 opacity-90">Toma menos de un minuto. Un apoderado debe completar el registro.</p>
            <div className="mt-8 rounded-2xl border-2 border-pink-foreground/40 bg-pink-foreground/15 p-5">
              <p className="text-sm opacity-90">Plan elegido</p>
              <p className="font-display text-2xl font-bold">{plan.emoji} {plan.name}</p>
              <p className="font-display text-lg">
                {plan.monthly === 0 ? "Gratis para siempre" : `S/ ${planPrice(plan.monthly, cycle)} / ${cycle === "anual" ? "año" : "mes"}`}
              </p>
            </div>
            <p className="mt-6 text-sm opacity-90">
              ¿No puedes pagar? <Link to="/becas" className="font-bold underline underline-offset-2">Postula a una beca</Link>
            </p>
          </div>

          <div className="p-8">
            {done ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center animate-pop">
                <PartyPopper className="size-16 text-pink" />
                <p className="mt-4 font-display text-3xl font-bold text-navy">¡Bienvenido a bordo, {done}! 🚀</p>
                <p className="mt-2 text-muted-foreground">Te enviamos un correo para confirmar la cuenta del plan {plan.name}.</p>
                <Button asChild variant="navy" size="lg" className="mt-6">
                  <Link to="/clases">Ver mis primeras clases</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <Field label="Nombre del estudiante" name="student" placeholder="Ej. Valentina Rojas" error={errors.student} />
                <Field label="Nombre del apoderado" name="guardian" placeholder="Ej. María Rojas" error={errors.guardian} />
                <Field label="Correo del apoderado" name="email" type="email" placeholder="correo@ejemplo.com" error={errors.email} />
                <div>
                  <Label htmlFor="grade" className="font-display text-navy">Grado</Label>
                  <select
                    id="grade"
                    name="grade"
                    defaultValue=""
                    className="mt-1.5 h-12 w-full rounded-xl border-[2.5px] border-navy-deep bg-card px-3 text-foreground focus:outline-none focus:ring-4 focus:ring-pink/30"
                  >
                    <option value="" disabled>Elige el grado</option>
                    {GRADES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                  {errors.grade && <p className="mt-1 text-sm font-semibold text-destructive">{errors.grade}</p>}
                </div>
                <label className="flex items-start gap-3 text-sm text-foreground">
                  <input type="checkbox" name="terms" className="mt-0.5 size-5 accent-pink" />
                  Acepto los términos y la política de privacidad para menores de edad.
                </label>
                {errors.terms && <p className="text-sm font-semibold text-destructive">{errors.terms}</p>}
                <Button type="submit" variant="pink" size="xl" className="w-full">
                  {plan.monthly === 0 ? "Crear cuenta gratis" : `Continuar con ${plan.name}`}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, error, type = "text", placeholder }: { label: string; name: string; error?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={name} className="font-display text-navy">{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="mt-1.5 h-12 rounded-xl border-[2.5px] border-navy-deep bg-card text-base focus-visible:ring-4 focus-visible:ring-pink/30"
      />
      {error && <p className="mt-1 text-sm font-semibold text-destructive">{error}</p>}
    </div>
  );
}
