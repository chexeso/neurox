export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="nx-bw" x1="6" y1="4" x2="42" y2="44">
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
      <path
        d="M14 8h12l10 16-10 16H14L24 24 14 8z"
        fill="none"
        stroke="url(#nx-bw)"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M18 14h6l6 10-6 10h-6l6-10-6-10z" fill="url(#nx-bw)" opacity=".95" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark />
      {!compact && (
        <span className="text-[17px] font-semibold tracking-tight text-[color:var(--fg)]">
          Neuro<span className="opacity-45">X</span>
        </span>
      )}
    </span>
  );
}
