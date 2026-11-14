import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/site/PageHero";
import { PLAN_OPTIONS, formatSoles, getPlan, type PlanId } from "@/lib/platform/plans";
import { SUBJECT_LABEL, type SubjectKey } from "@/lib/platform/diagnostic";
import { updatePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

const PLAN_IDS = ["grupal", "ind-1", "ind-8", "ind-12"] as const;

export const Route = createFileRoute("/registro")({
  validateSearch: (search: Record<string, unknown>): { plan?: PlanId | undefined } => {
    const parsed = z.enum(PLAN_IDS).safeParse(search["plan"]);
    return parsed.success ? { plan: parsed.data } : {};
  },
  head: () => ({
    meta: [
      { title: "Registro de la familia y clase de prueba gratis — Cometa" },
      {
        name: "description",
        content: "Registra a tu hijo o hija, haz el diagnóstico inicial y reserva tu clase de prueba gratis.",
      },
      { property: "og:title", content: "Registro y clase de prueba gratis — Cometa" },
      { property: "og:description", content: "Diagnóstico inicial, grupo por nivel y reporte semanal para la familia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistroPage,
});

const GRADES = ["1.º de secundaria", "2.º de secundaria", "3.º de secundaria"];

const schema = z.object({
  guardian: z.string().trim().min(2, "Escribe el nombre del padre, madre o apoderado").max(80),
  email: z.string().trim().email("Revisa el correo").max(255),
  phone: z.string().trim().max(20),
  student: z.string().trim().min(2, "Escribe el nombre del estudiante").max(80),
  grade: z.string().min(1, "Elige el grado"),
  subject: z.enum(["matematica", "comunicacion"], { errorMap: () => ({ message: "Elige un curso" }) }),
  plan: z.enum(PLAN_IDS),
  consent: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu consentimiento para continuar" }) }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function RegistroPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [planId, setPlanId] = useState<PlanId>(search.plan ?? "grupal");
  const [subject, setSubject] = useState<SubjectKey | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const plan = getPlan(planId);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse({
      guardian: fd.get("guardian"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
      student: fd.get("student"),
      grade: fd.get("grade"),
      subject: subject || undefined,
      plan: planId,
      consent: fd.get("consent") === "on",
    });
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      toast.error("Revisa los datos marcados");
      return;
    }
    setErrors({});
    const { consent: _consent, ...data } = result.data;
    updatePlatform({
      family: { ...data, consentAt: new Date().toISOString() },
      diagnostic: undefined,
      block: undefined,
      trialBooked: false,
      paid: false,
      reportApproved: false,
    });
    toast.success("¡Listo! Ahora hagamos el diagnóstico 🚀");
    void navigate({ to: "/diagnostico" });
  }

  return (
    <>
      <PageHero
        eyebrow="🎟️ Registro de la familia"
        emoji="📝"
        title={<>Empieza con una <span className="text-pink">clase de prueba gratis</span></>}
        description="Registra a tu hijo o hija, haz el diagnóstico de 10 minutos y te armamos un grupo de su mismo nivel."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-6">
          <div className="card-pop bg-candy p-7 text-pink-foreground">
            <p className="text-sm opacity-90">Plan elegido</p>
            <p className="font-display text-3xl font-bold">{plan.name}</p>
            <p className="mt-1 font-display text-2xl">
              {formatSoles(plan.price)} <span className="text-base opacity-80">{plan.unit}</span>
            </p>
            <p className="mt-3 text-sm opacity-90">{plan.detail}</p>
            <p className="mt-4 text-sm font-semibold">La primera clase es gratis. No cobramos nada hoy.</p>
          </div>
          <div className="card-pop p-6">
            <p className="font-display text-lg font-bold text-navy">¿Cómo sigue?</p>
            <ol className="mt-3 space-y-2 text-muted-foreground">
              <li><span className="font-bold text-pink">1.</span> Registro (2 minutos)</li>
              <li><span className="font-bold text-pink">2.</span> Diagnóstico del estudiante</li>
              <li><span className="font-bold text-pink">3.</span> Grupo por nivel y horario</li>
              <li><span className="font-bold text-pink">4.</span> Clase de prueba gratis</li>
            </ol>
          </div>
        </aside>

        <form onSubmit={onSubmit} noValidate className="card-pop space-y-5 p-8">
          <h2 className="text-3xl font-bold text-navy">Datos de la familia</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nombre del padre, madre o apoderado" name="guardian" placeholder="Ej. María Rojas" error={errors.guardian} />
            <Field label="Correo" name="email" type="email" placeholder="correo@ejemplo.com" error={errors.email} />
            <Field label="Celular (opcional)" name="phone" placeholder="999 999 999" error={errors.phone} />
          </div>

          <h2 className="pt-2 text-3xl font-bold text-navy">Datos del estudiante</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nombre del estudiante" name="student" placeholder="Ej. Valentina Rojas" error={errors.student} />
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
          </div>

          <fieldset>
            <legend className="font-display text-navy">¿Qué curso quieren reforzar primero?</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {(["matematica", "comunicacion"] as const).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSubject(s)}
                  aria-pressed={subject === s}
                  className={cn(
                    "rounded-2xl border-[2.5px] border-navy-deep px-5 py-4 text-left font-display text-lg font-semibold transition-all",
                    subject === s ? "bg-pink text-pink-foreground shadow-pop-sm" : "bg-card text-navy hover:-translate-y-0.5",
                  )}
                >
                  {s === "matematica" ? "🔢" : "📚"} {SUBJECT_LABEL[s]}
                </button>
              ))}
            </div>
            {errors.subject && <p className="mt-1 text-sm font-semibold text-destructive">{errors.subject}</p>}
          </fieldset>

          <div>
            <Label htmlFor="plan" className="font-display text-navy">Plan</Label>
            <select
              id="plan"
              value={planId}
              onChange={(e) => setPlanId(e.target.value as PlanId)}
              className="mt-1.5 h-12 w-full rounded-xl border-[2.5px] border-navy-deep bg-card px-3 text-foreground focus:outline-none focus:ring-4 focus:ring-pink/30"
            >
              {PLAN_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>{p.name} · {formatSoles(p.price)} {p.unit}</option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border-[2.5px] border-navy-deep bg-pink-soft p-5">
            <p className="flex items-center gap-2 font-display font-bold text-navy">
              <ShieldCheck className="size-5 text-pink" /> Consentimiento informado
            </p>
            <p className="mt-2 text-sm text-foreground">
              Las clases se graban para generar la transcripción y el reporte semanal de avance con ayuda de inteligencia
              artificial. El docente revisa cada reporte antes de enviarlo. Los datos de menores se tratan con el
              consentimiento del padre, madre o apoderado, y puedes retirar tu permiso cuando quieras. Esta versión es un
              prototipo: aún no se envía información a servidores.
            </p>
            <label className="mt-3 flex items-start gap-3 text-sm text-foreground">
              <input type="checkbox" name="consent" className="mt-0.5 size-5 accent-pink" />
              Soy el padre, madre o apoderado y acepto la grabación de las clases y el tratamiento de los datos de mi hijo o hija.
            </label>
            {errors.consent && <p className="mt-2 text-sm font-semibold text-destructive">{errors.consent}</p>}
          </div>

          <Button type="submit" variant="pink" size="xl" className="w-full">Continuar al diagnóstico</Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya te registraste? <Link to="/app" className="font-bold text-pink underline underline-offset-2">Ir a mi cuenta</Link>
          </p>
        </form>
      </section>
    </>
  );
}

function Field({ label, name, error, type = "text", placeholder }: { label: string; name: string; error?: string | undefined; type?: string; placeholder?: string }) {
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
