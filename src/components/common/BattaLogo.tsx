export function BattaLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="battaGrad" x1="20" y1="5" x2="80" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="50%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/*
        Duck silhouette — line-art stroke style matching the reference image:
        Facing left. Tall curved neck rising from left side of a bowl-shaped body.
        Small head at top-left with short beak pointing left-down.
        Body is a wide boat/bowl shape sitting low.
      */}
      <path
        d="
          M 28 30
          C 26 28, 23 28, 21 30
          C 19 32, 19 34, 21 35
          L 25 34
          C 26 36, 28 40, 30 45
          C 32 50, 33 56, 33 62
          C 33 68, 34 74, 38 78
          C 42 82, 48 85, 56 86
          C 64 87, 72 86, 78 82
          C 84 78, 87 72, 87 64
          C 87 56, 84 50, 78 46
          C 72 42, 66 42, 60 42
          C 56 42, 52 40, 48 36
          C 44 32, 40 26, 36 22
          C 34 20, 32 20, 30 22
          C 28 24, 28 27, 28 30
          Z
        "
        stroke="url(#battaGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eye */}
      <circle cx="27" cy="30" r="1.5" fill="url(#battaGrad)" />

      {/* Circuit board traces inside the body */}
      <g stroke="url(#battaGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.45">
        {/* Horizontal lines */}
        <line x1="44" y1="56" x2="74" y2="56" />
        <line x1="42" y1="64" x2="78" y2="64" />
        <line x1="44" y1="72" x2="72" y2="72" />

        {/* Vertical connections */}
        <line x1="52" y1="50" x2="52" y2="60" />
        <line x1="62" y1="50" x2="62" y2="68" />
        <line x1="72" y1="56" x2="72" y2="76" />

        {/* Angled connectors */}
        <line x1="44" y1="52" x2="52" y2="56" />
        <line x1="74" y1="60" x2="72" y2="64" />
      </g>

      {/* Circuit solder nodes */}
      <g fill="url(#battaGrad)" opacity="0.55">
        <circle cx="44" cy="56" r="2.2" />
        <circle cx="62" cy="56" r="2.2" />
        <circle cx="74" cy="56" r="2.2" />
        <circle cx="52" cy="56" r="2.2" />
        <circle cx="52" cy="50" r="2.2" />
        <circle cx="42" cy="64" r="2.2" />
        <circle cx="62" cy="64" r="2.2" />
        <circle cx="78" cy="64" r="2.2" />
        <circle cx="72" cy="64" r="2.2" />
        <circle cx="44" cy="72" r="2.2" />
        <circle cx="62" cy="72" r="2.2" />
        <circle cx="72" cy="72" r="2.2" />
        <circle cx="72" cy="76" r="2.2" />
      </g>
    </svg>
  );
}
