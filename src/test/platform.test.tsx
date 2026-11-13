import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { QUESTIONS, TOPICS, levelFromRatio, scoreDiagnostic } from "@/lib/platform/diagnostic";
import { GROUP_MAX, groupFor } from "@/lib/platform/group";
import { PLAN_OPTIONS, getPlan } from "@/lib/platform/plans";
import { buildReportDraft } from "@/lib/platform/report";
import { routeTree } from "@/routeTree.gen";

describe("Diagnóstico", () => {
  it("cada curso tiene 2 preguntas por tema y una respuesta válida", () => {
    for (const subject of ["matematica", "comunicacion"] as const) {
      const qs = QUESTIONS[subject];
      for (const topic of TOPICS[subject]) {
        expect(qs.filter((q) => q.topic === topic)).toHaveLength(2);
      }
      for (const q of qs) {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      }
    }
  });

  it("asigna nivel según el porcentaje de aciertos", () => {
    expect(levelFromRatio(1)).toBe("Logrado");
    expect(levelFromRatio(0.5)).toBe("En proceso");
    expect(levelFromRatio(0.125)).toBe("Inicial");
  });

  it("puntúa por tema y en total", () => {
    const perfect = QUESTIONS.matematica.map((q) => q.answer);
    const d = scoreDiagnostic("matematica", perfect, "2026-11-13T00:00:00.000Z");
    expect(d.score).toBe(100);
    expect(d.overall).toBe("Logrado");
    expect(d.results.every((r) => r.level === "Logrado")).toBe(true);

    const wrong = QUESTIONS.matematica.map((q) => (q.answer + 1) % q.options.length);
    const w = scoreDiagnostic("matematica", wrong, "2026-11-13T00:00:00.000Z");
    expect(w.score).toBe(0);
    expect(w.overall).toBe("Inicial");
  });
});

describe("Grupos, planes y reporte", () => {
  it("el grupo nunca supera 4 alumnos", () => {
    const g = groupFor("matematica", "En proceso", "lm-17", "Valentina Rojas");
    expect(g.members.length).toBeLessThanOrEqual(GROUP_MAX);
    expect(g.members.at(-1)).toBe("V.");
  });

  it("los precios coinciden con el modelo definido", () => {
    expect(getPlan("grupal").price).toBe(190);
    expect(PLAN_OPTIONS.map((p) => p.price)).toEqual([190, 75, 540, 780]);
  });

  it("el reporte nombra el tema más débil", () => {
    const answers = QUESTIONS.matematica.map((q) => q.answer);
    answers[0] = (answers[0]! + 1) % 4;
    answers[1] = (answers[1]! + 1) % 4;
    const d = scoreDiagnostic("matematica", answers);
    const r = buildReportDraft("Valentina Rojas", d);
    expect(r.struggle).toContain("Fracciones");
    expect(r.adjustment.toLowerCase()).toContain("fracciones");
  });
});

describe("Rutas de la plataforma", () => {
  it.each(["/", "/planes", "/registro", "/diagnostico", "/app", "/app/grupo", "/app/reporte", "/app/plan", "/docente"])(
    "existe una página para %s",
    (path) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    },
  );
});
