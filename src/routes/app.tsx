import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { resetPlatform, useHydrated, usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Mi cuenta — Cometa" },
      { name: "description", content: "Panel de la familia: diagnóstico, grupo, reporte semanal y plan." },
      { property: "og:title", content: "Mi cuenta — Cometa" },
      { property: "og:description", content: "Sigue el avance de tu hijo o hija semana a semana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppLayout,
});

const TABS = [
  { to: "/app", label: "Inicio", exact: true },
  { to: "/app/grupo", label: "Mi grupo", exact: false },
  { to: "/app/reporte", label: "Reporte semanal", exact: false },
  { to: "/app/plan", label: "Plan y pagos", exact: false },
  { to: "/app/estudiante", label: "Vista del estudiante", exact: false },
  { to: "/docente", label: "Vista del docente (demo)", exact: false },
] as const;

function AppLayout() {
  const { family } = usePlatform();
  const hydrated = useHydrated();

  if (!hydrated) return <div className="mx-auto min-h-[50vh] max-w-6xl px-6 py-10" aria-busy="true" />;

  if (!family) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="card-pop p-10 text-center">
          <p className="text-3xl font-bold text-navy">Aún no tienes una cuenta</p>
          <p className="mt-2 text-muted-foreground">Regístrate para hacer el diagnóstico y reservar tu clase de prueba gratis.</p>
          <Button asChild variant="pink" size="xl" className="mt-6">
            <Link to="/registro">Crear mi cuenta</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-pink">Cuenta de la familia</p>
          <h1 className="text-3xl font-bold text-navy md:text-4xl">Hola, {family.guardian.split(" ")[0]} 👋</h1>
        </div>
        <Button variant="pop" size="lg" onClick={resetPlatform}>Borrar datos de este dispositivo</Button>
      </div>
      <nav className="mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Secciones de la cuenta">
        {TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: t.exact }}
            className="shrink-0 rounded-full border-[2.5px] border-navy-deep bg-card px-5 py-2 font-display font-semibold text-navy transition-colors hover:bg-pink-soft"
            activeProps={{ className: "bg-navy text-navy-foreground hover:bg-navy" }}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
