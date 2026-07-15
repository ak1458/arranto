import { Michroma, Fraunces, Inter, JetBrains_Mono, Tajawal } from "next/font/google";

// Logo wordmark face only — wide geometric monoline, echoes the ARRANTO logotype
// (flat-top A, circular O). Used for the literal "ARRANTO" lockup (Logo.tsx), not
// general headlines — see `fraunces` below for that.
export const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
});

// Display / headline face per the brand kit's Typography System (Fraunces for
// headlines, Inter for body) — restores the original pre-rebrand-damage value;
// a later pass had swapped this to Michroma site-wide, which was never the spec.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body / UI — clean neutral grotesque for readability at every size.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Terminal / code / mono labels.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

// Arabic — geometric, premium, pairs with the Latin system. Applied on [dir=rtl].
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const fontVariables = [
  michroma.variable,
  fraunces.variable,
  inter.variable,
  jetbrainsMono.variable,
  tajawal.variable,
].join(" ");
