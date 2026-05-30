/** Shared cat SVGs for the dark-mode toggle (MẪU 01 Classic Face).
 *  Paths copied verbatim from design bundle aCujplQUrHneORo8DAo3tg /
 *  project/darkmode.js inline SVG. Light-mode preview = moon (sleeping cat
 *  under crescent moon + Zzz), dark-mode preview = sun (awake cat with rays). */

interface CatProps {
  className?: string;
}

export function CatMoonSvg({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text x="3" y="11" fontFamily="Fredoka, system-ui, sans-serif" fontSize="7" fontWeight="700" fill="#FCD34D">z</text>
      <text x="1" y="6" fontFamily="Fredoka, system-ui, sans-serif" fontSize="4.5" fontWeight="700" fill="#FCD34D" opacity="0.9">z</text>
      <circle cx="28" cy="9" r="4.2" fill="#FCD34D" />
      <circle cx="29.6" cy="8" r="3.2" fill="#334155" />
      <path d="M7.5 14 L11 5.5 L16 12 Z" fill="#1E293B" />
      <path d="M28.5 14 L25 5.5 L20 12 Z" fill="#1E293B" />
      <path d="M10.2 11.8 L12.5 7.8 L14.6 11.8 Z" fill="#FB7185" />
      <path d="M25.8 11.8 L23.5 7.8 L21.4 11.8 Z" fill="#FB7185" />
      <ellipse cx="18" cy="21" rx="10.2" ry="9" fill="#334155" />
      <ellipse cx="11.8" cy="23" rx="2.2" ry="1.3" fill="#F472B6" opacity="0.65" />
      <ellipse cx="24.2" cy="23" rx="2.2" ry="1.3" fill="#F472B6" opacity="0.65" />
      <path d="M12.6 19.6 q1.6 2.2 3.2 0" stroke="#F8FAFC" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M20.2 19.6 q1.6 2.2 3.2 0" stroke="#F8FAFC" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="12.4" cy="19.2" r="0.45" fill="#F8FAFC" />
      <circle cx="23.6" cy="19.2" r="0.45" fill="#F8FAFC" />
      <path d="M16.9 22.8 L19.1 22.8 L18 24.2 Z" fill="#FB7185" />
      <path d="M18 24.2 q-1.3 1.5 -2.4 0.9" stroke="#F8FAFC" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M18 24.2 q1.3 1.5 2.4 0.9" stroke="#F8FAFC" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M9 22 L5.5 21.3 M9 23.4 L5.5 24" stroke="#94A3B8" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M27 22 L30.5 21.3 M27 23.4 L30.5 24" stroke="#94A3B8" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function CatSunSvg({ className }: CatProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round">
        <line x1="18" y1="1.5" x2="18" y2="4" />
        <line x1="6" y1="6" x2="7.8" y2="7.8" />
        <line x1="30" y1="6" x2="28.2" y2="7.8" />
        <line x1="1.5" y1="18" x2="4" y2="18" />
        <line x1="34.5" y1="18" x2="32" y2="18" />
      </g>
      <path d="M7.5 14 L11 5.5 L16 12 Z" fill="#F97316" />
      <path d="M28.5 14 L25 5.5 L20 12 Z" fill="#F97316" />
      <path d="M10.2 11.8 L12.5 7.8 L14.6 11.8 Z" fill="#FCA5A5" />
      <path d="M25.8 11.8 L23.5 7.8 L21.4 11.8 Z" fill="#FCA5A5" />
      <ellipse cx="18" cy="21" rx="10.2" ry="9" fill="#FBBF24" />
      <path d="M14.2 13.5 q1 1.5 0 3" stroke="#F97316" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M21.8 13.5 q-1 1.5 0 3" stroke="#F97316" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M18 13 v3.2" stroke="#F97316" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="11.8" cy="23" rx="2.2" ry="1.3" fill="#F472B6" opacity="0.75" />
      <ellipse cx="24.2" cy="23" rx="2.2" ry="1.3" fill="#F472B6" opacity="0.75" />
      <circle cx="14.2" cy="20" r="1.7" fill="#1F2937" />
      <circle cx="21.8" cy="20" r="1.7" fill="#1F2937" />
      <circle cx="14.7" cy="19.4" r="0.6" fill="#fff" />
      <circle cx="22.3" cy="19.4" r="0.6" fill="#fff" />
      <path d="M16.9 22.8 L19.1 22.8 L18 24.2 Z" fill="#EC4899" />
      <path d="M18 24.2 q-1.3 1.6 -2.5 0.8" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M18 24.2 q1.3 1.6 2.5 0.8" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M9 22 L5.5 21.3 M9 23.4 L5.5 24" stroke="#92400E" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M27 22 L30.5 21.3 M27 23.4 L30.5 24" stroke="#92400E" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
