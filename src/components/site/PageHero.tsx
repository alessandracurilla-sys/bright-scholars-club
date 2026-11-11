import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  emoji: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, emoji, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-night text-navy-foreground">
      <Sparkles />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-pink bg-pink/15 px-4 py-1 font-display text-sm font-semibold text-pink">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-foreground/80">{description}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div className="hidden size-44 shrink-0 animate-float place-items-center rounded-[2.5rem] border-[3px] border-navy-foreground bg-pink text-8xl shadow-pop-pink md:grid">
          {emoji}
        </div>
      </div>
    </section>
  );
}

export function Sparkles() {
  const stars = [
    { top: "12%", left: "6%", delay: "0s" },
    { top: "70%", left: "12%", delay: "0.8s" },
    { top: "25%", left: "48%", delay: "1.4s" },
    { top: "80%", left: "55%", delay: "0.4s" },
    { top: "15%", left: "88%", delay: "1.1s" },
    { top: "60%", left: "92%", delay: "1.8s" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle text-2xl text-sunshine"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
