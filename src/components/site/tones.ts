export type Tone = "pink" | "navy" | "sky" | "sunshine" | "mint";

export const TONE_BG: Record<Tone, string> = {
  pink: "bg-pink text-pink-foreground",
  navy: "bg-navy text-navy-foreground",
  sky: "bg-sky text-navy-deep",
  sunshine: "bg-sunshine text-sunshine-foreground",
  mint: "bg-mint text-navy-deep",
};

export const TONE_SOFT: Record<Tone, string> = {
  pink: "bg-pink-soft",
  navy: "bg-sky-soft",
  sky: "bg-sky-soft",
  sunshine: "bg-sunshine/25",
  mint: "bg-mint-soft",
};
