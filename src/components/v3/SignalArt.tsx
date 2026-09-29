export function SignalArt({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`signal-art ${compact ? "compact" : ""}`}
      aria-hidden="true"
    >
      <div className="signal-halo" />
      <div className="signal-grid" />
      <svg viewBox="0 0 600 580" className="signal-sculpture" fill="none">
        <defs>
          <linearGradient
            id={compact ? "fold-c" : "fold"}
            x1="110"
            y1="130"
            x2="470"
            y2="480"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#dbe4ff" />
            <stop offset=".35" stopColor="#687fff" />
            <stop offset=".7" stopColor="#3748df" />
            <stop offset="1" stopColor="#9294ff" />
          </linearGradient>
          <linearGradient
            id={compact ? "edge-c" : "edge"}
            x1="160"
            y1="100"
            x2="480"
            y2="440"
          >
            <stop stopColor="#434ace" />
            <stop offset="1" stopColor="#151a53" />
          </linearGradient>
        </defs>
        <g className="signal-orbit">
          <ellipse
            cx="300"
            cy="325"
            rx="277"
            ry="116"
            stroke="#6678bd"
            strokeOpacity=".3"
            transform="rotate(-28 300 325)"
          />
          <ellipse
            cx="300"
            cy="325"
            rx="236"
            ry="98"
            stroke="#6678bd"
            strokeOpacity=".18"
            transform="rotate(-28 300 325)"
          />
          <circle cx="528" cy="190" r="5" fill="#d8ff8b" />
          <circle cx="75" cy="460" r="3" fill="#aab7ff" />
        </g>
        <g className="signal-monogram">
          <path
            d="M135 167 180 194V456L135 429ZM180 194 294 284 444 165 489 192 339 359 294 332ZM399 265 444 289V456L399 429Z"
            fill={`url(#${compact ? "edge-c" : "edge"})`}
          />
          <path
            d="M135 167 294 287 444 165V429H367V318L294 376 212 315V429H135Z"
            fill={`url(#${compact ? "fold-c" : "fold"})`}
            stroke="#c5d0ff"
            strokeOpacity=".45"
          />
          <path
            d="M135 167 294 287 444 165M212 315 294 376 367 318"
            stroke="#e2e7ff"
            strokeOpacity=".65"
          />
        </g>
        <path d="M65 95H118M65 95V148M510 460H558V410" stroke="#6272ac" />
        <path
          d="M430 113H540M466 123H540M494 133H540"
          stroke="#8da0fc"
          strokeOpacity=".6"
        />
      </svg>
      <span className="signal-label signal-label-top">
        Stratégie → Exécution
      </span>
      <span className="signal-label signal-label-bottom">
        Le mouvement a une direction.
      </span>
    </div>
  );
}
