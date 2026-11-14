import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LEVEL_STYLE, SUBJECT_LABEL, type Level } from "@/lib/platform/diagnostic";
import { GROUP_MAX, blockLabel, teacherFor } from "@/lib/platform/group";
import { buildReportDraft } from "@/lib/platform/report";
import { updatePlatform, useHydrated, usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docente")({
  head: () => ({
    meta: [
      { title: "Panel del docente — Cometa" },
      { name: "description", content: "El docente ve el diagnóstico de cada alumno y aprueba el reporte semanal antes de enviarlo." },
      { property: "og:title", content: "Panel del docente — Cometa" },
      { property: "og:description", content: "El docente revisa y aprueba cada reporte antes de que llegue a la familia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocentePage,
});

type Row = { name: string; level: Level; weak: string; real?: boolean };

const DEMO_STUDENTS: Row[] = [
  { name: "Mateo", level: "En proceso", weak: "Ecuaciones" },
  { name: "Camila", level: "En proceso", weak: "Fracciones" },
  { name: "Joaquín", level: "Inicial", weak: "Proporcionalidad" },
];

function DocentePage() {
  const { family, diagnostic, block, reportApproved, reportAdjustment } = usePlatform();
  const [draftText, setDraftText] = useState<string | null>(null);
  const hydrated = useHydrated();

  const subject = family?.subject ?? "matematica";
  const teacher = teacherFor(subject);
  const draft = family && diagnostic ? buildReportDraft(family.student, diagnostic) : null;
  const text = draftText ?? reportAdjustment ?? draft?.adjustment ?? "";

  const students: Row[] = [
    ...(family && diagnostic
      ? [{ name: family.student.split(" ")[0] ?? family.student, level: diagnostic.overall, weak: draft ? draft.struggle.split(":")[0] ?? "" : "", real: true }]
      : []),
    ...DEMO_STUDENTS,
  ].slice(0, GROUP_MAX);

  if (!hydrated) return <div className="mx-auto min-h-[50vh] max-w-6xl px-6 py-10" aria-busy="true" />;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Panel del docente · demostración</p>
      <h1 className="mt-1 text-3xl font-bold text-navy md:text-4xl">{teacher.name}</h1>
      <p className="text-muted-foreground">
        Grupo de {SUBJECT_LABEL[subject]} · {blockLabel(block)} · {students.length} de {GROUP_MAX} alumnos
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="card-pop p-6">
          <h2 className="text-xl font-bold text-navy">Alumnos del grupo</h2>
          <ul className="mt-4 space-y-3">
            {students.map((s) => (
              <li key={s.name} className="flex items-center justify-between rounded-2xl border-2 border-border px-4 py-3">
                <div>
                  <p className="font-display font-bold text-navy">{s.name}{s.real && <span className="ml-2 rounded-full bg-sky-soft px-2 py-0.5 text-xs">tu registro</span>}</p>
                  <p className="text-sm text-muted-foreground">Tema a reforzar: {s.weak || "—"}</p>
                </div>
                <span className={cn("rounded-full px-3 py-0.5 text-sm font-semibold", LEVEL_STYLE[s.level])}>{s.level}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Los alumnos de ejemplo son ficticios. El primero aparece si registraste a un estudiante en este dispositivo.</p>
        </section>

        <section className="card-pop p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-navy"><ShieldCheck className="size-5 text-pink" /> Revisar reporte semanal</h2>
          {!draft || !family ? (
            <p className="mt-4 rounded-2xl bg-pink-soft p-5 text-foreground">
              Aún no hay un reporte para revisar. Registra a un estudiante y completa su diagnóstico para ver el borrador.
            </p>
          ) : (
            <>
              <p className="mt-1 text-muted-foreground">Borrador para {family.student}: {draft.title}</p>
              <div className="mt-4 space-y-3 text-sm">
                <p className="rounded-xl bg-pink-soft p-3"><span className="font-bold text-navy">Resumen: </span>{draft.summary}</p>
                <p className="rounded-xl bg-sunshine/25 p-3"><span className="font-bold text-navy">Lo que costó: </span>{draft.struggle}</p>
              </div>
              <label htmlFor="adjust" className="mt-4 block font-display font-semibold text-navy">Ajuste para la próxima semana (editable)</label>
              <Textarea id="adjust" value={text} onChange={(e) => setDraftText(e.target.value)} rows={4} className="mt-1.5 rounded-xl border-[2.5px] border-navy-deep" />
              <Button
                variant={reportApproved ? "success" : "pink"}
                size="xl"
                className="mt-4 w-full"
                disabled={reportApproved}
                onClick={() => {
                  updatePlatform({ reportApproved: true, reportAdjustment: text });
                  toast.success("Reporte aprobado y enviado a la familia");
                }}
              >
                {reportApproved ? "Reporte aprobado" : "Aprobar y enviar a la familia"}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">La IA propone y el docente decide: ningún reporte llega a la familia sin esta aprobación.</p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
