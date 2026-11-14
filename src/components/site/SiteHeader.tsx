import { Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/clases", label: "Clases en vivo" },
  { to: "/material", label: "Material" },
  { to: "/progreso", label: "Mi progreso" },
  { to: "/becas", label: "Becas y premios" },
  { to: "/planes", label: "Planes" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-[2.5px] border-navy-deep bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid size-11 place-items-center rounded-2xl border-[2.5px] border-navy-deep bg-pink text-pink-foreground shadow-pop-sm transition-transform group-hover:animate-wiggle">
            <Rocket className="size-5" />
          </span>
          <span className="font-display text-2xl font-bold text-navy">
            Cometa<span className="text-pink">.</span>
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 font-display text-[15px] font-medium text-navy transition-colors hover:bg-pink-soft"
              activeProps={{ className: "bg-navy text-navy-foreground hover:bg-navy" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Button asChild variant="pop" size="lg" className="hidden sm:inline-flex">
            <Link to="/app">Mi cuenta</Link>
          </Button>
          <Button asChild variant="pink" size="lg">
            <Link to="/registro" search={{ plan: "grupal" }}>Clase gratis</Link>
          </Button>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="shrink-0 rounded-full border-2 border-navy-deep px-3 py-1 font-display text-sm text-navy"
            activeProps={{ className: "bg-navy text-navy-foreground" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
