import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-night text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-bold">
            Cometa<span className="text-pink">.</span>
          </p>
          <p className="mt-3 max-w-sm text-navy-foreground/75">
            Tutoría virtual con diagnóstico y reporte semanal: ningún estudiante debería avanzar solo.
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-display font-semibold text-pink">Aprender</p>
          <Link to="/clases" className="block text-navy-foreground/80 hover:text-navy-foreground">Clases en vivo</Link>
          <Link to="/material" className="block text-navy-foreground/80 hover:text-navy-foreground">Material</Link>
          <Link to="/progreso" className="block text-navy-foreground/80 hover:text-navy-foreground">Mi progreso</Link>
        </div>
        <div className="space-y-2">
          <p className="font-display font-semibold text-pink">Oportunidades</p>
          <Link to="/becas" className="block text-navy-foreground/80 hover:text-navy-foreground">Becas y premios</Link>
          <Link to="/planes" className="block text-navy-foreground/80 hover:text-navy-foreground">Planes</Link>
          <Link to="/registro" search={{ plan: "grupal" }} className="block text-navy-foreground/80 hover:text-navy-foreground">Registro y diagnóstico</Link>
          <Link to="/app" className="block text-navy-foreground/80 hover:text-navy-foreground">Mi cuenta</Link>
          <Link to="/docente" className="block text-navy-foreground/80 hover:text-navy-foreground">Panel del docente (demo)</Link>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15 py-5 text-center text-sm text-navy-foreground/60">
        Hecho con <Heart className="inline size-4 fill-pink text-pink" /> para estudiantes curiosos · © 2026 Cometa
      </div>
    </footer>
  );
}
