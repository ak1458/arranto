import React from "react";
import Image from "next/image";

export type LogoVariant = "full" | "horizontal" | "vertical" | "stacked" | "wordmark" | "mark" | "symbol";
export type LogoTheme = "dark" | "light";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "custom";

export type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  className?: string;
  wordmarkClassName?: string;
  node?: string; // backwards compatibility
  priority?: boolean;
  alt?: string;
};

const HORIZONTAL_SIZE_MAP: Record<LogoSize, string> = {
  xs: "h-5 w-auto",
  sm: "h-6 w-auto",
  md: "h-7 w-auto",
  lg: "h-9 w-auto",
  xl: "h-12 w-auto",
  "2xl": "h-16 w-auto",
  custom: "",
};

const SYMBOL_SIZE_MAP: Record<LogoSize, string> = {
  xs: "h-5 w-auto",
  sm: "h-6 w-auto",
  md: "h-8 w-auto",
  lg: "h-12 w-auto",
  xl: "h-16 w-auto",
  "2xl": "h-24 w-auto",
  custom: "",
};

const WORDMARK_SIZE_MAP: Record<LogoSize, string> = {
  xs: "h-3.5 w-auto",
  sm: "h-4.5 w-auto",
  md: "h-5.5 w-auto",
  lg: "h-7 w-auto",
  xl: "h-9 w-auto",
  "2xl": "h-12 w-auto",
  custom: "",
};

const VERTICAL_SIZE_MAP: Record<LogoSize, string> = {
  xs: "h-16 w-auto",
  sm: "h-20 w-auto",
  md: "h-28 w-auto",
  lg: "h-40 w-auto",
  xl: "h-56 w-auto",
  "2xl": "h-72 w-auto",
  custom: "",
};

/**
 * Arranto Brand Mark — the metallic geometric studio symbol.
 */
export function LogoMark({
  className = "",
  size = "md",
  theme = "dark",
  priority = false,
}: {
  className?: string;
  size?: LogoSize;
  theme?: LogoTheme;
  priority?: boolean;
  node?: string;
}) {
  const sizeClass = SYMBOL_SIZE_MAP[size] || SYMBOL_SIZE_MAP.md;
  const appliedClass = className.includes("h-") ? className : `${sizeClass} ${className}`;

  return (
    <Image
      src="/brand/arranto-symbol.png"
      alt="Arranto Symbol"
      width={915}
      height={1028}
      priority={priority}
      className={`object-contain transition-transform duration-300 ${appliedClass}`}
    />
  );
}

/**
 * Arranto Wordmark — typographic logotype.
 */
export function LogoWordmark({
  className = "",
  size = "md",
  theme = "dark",
  priority = false,
}: {
  className?: string;
  size?: LogoSize;
  theme?: LogoTheme;
  priority?: boolean;
}) {
  const sizeClass = WORDMARK_SIZE_MAP[size] || WORDMARK_SIZE_MAP.md;
  const appliedClass = className.includes("h-") ? className : `${sizeClass} ${className}`;
  const src = theme === "light" ? "/brand/arranto-wordmark-light.png" : "/brand/arranto-wordmark-dark.png";

  return (
    <Image
      src={src}
      alt="ARRANTO"
      width={972}
      height={142}
      priority={priority}
      className={`object-contain ${appliedClass}`}
    />
  );
}

/**
 * Arranto Logo Component — supporting full/horizontal, vertical/stacked, symbol, and wordmark.
 */
export function Logo({
  variant = "full",
  theme = "dark",
  size = "md",
  className = "",
  wordmarkClassName = "",
  priority = false,
  alt = "Arranto — AI Software Studio",
}: LogoProps) {
  // 1. Symbol only
  if (variant === "mark" || variant === "symbol") {
    return <LogoMark className={className} size={size} theme={theme} priority={priority} />;
  }

  // 2. Wordmark only
  if (variant === "wordmark") {
    return <LogoWordmark className={`${className} ${wordmarkClassName}`} size={size} theme={theme} priority={priority} />;
  }

  // 3. Vertical / Stacked lockup
  if (variant === "vertical" || variant === "stacked") {
    const sizeClass = VERTICAL_SIZE_MAP[size] || VERTICAL_SIZE_MAP.md;
    const appliedClass = className.includes("h-") ? className : `${sizeClass} ${className}`;
    const src = theme === "light" ? "/brand/arranto-logo-vertical-light.png" : "/brand/arranto-logo-vertical-dark.png";

    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`} aria-label={alt}>
        <Image
          src={src}
          alt={alt}
          width={810}
          height={833}
          priority={priority}
          className={`object-contain ${appliedClass}`}
        />
      </div>
    );
  }

  // 4. Horizontal / Full lockup (Default)
  const sizeClass = HORIZONTAL_SIZE_MAP[size] || HORIZONTAL_SIZE_MAP.md;
  const appliedClass = className.includes("h-") ? className : `${sizeClass} ${className}`;
  const src = theme === "light" ? "/brand/arranto-logo-horizontal-light.png" : "/brand/arranto-logo-horizontal-dark.png";

  return (
    <div className={`inline-flex items-center ${className}`} aria-label={alt}>
      <Image
        src={src}
        alt={alt}
        width={895}
        height={258}
        priority={priority}
        className={`object-contain ${appliedClass}`}
      />
    </div>
  );
}
