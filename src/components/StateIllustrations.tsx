type Props = { className?: string };

const base = "h-auto w-48 sm:w-60";

export function NotFoundIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <ellipse
        cx="120"
        cy="164"
        rx="72"
        ry="7"
        className="fill-primary-500/10"
      />

      {/* پنجره */}
      <rect
        x="36"
        y="24"
        width="160"
        height="112"
        rx="14"
        strokeWidth="2"
        className="fill-primary-900/50 stroke-primary-700"
      />
      <path d="M36 52H196" strokeWidth="2" className="stroke-primary-700" />
      <circle cx="54" cy="38" r="4" className="fill-primary-600" />
      <circle cx="68" cy="38" r="4" className="fill-primary-700" />
      <circle cx="82" cy="38" r="4" className="fill-primary-800" />

      <text
        x="96"
        y="104"
        textAnchor="middle"
        fontSize="34"
        fontWeight="800"
        className="fill-primary-400"
        style={{ fontFamily: "inherit" }}
      >
        404
      </text>
      <rect
        x="58"
        y="118"
        width="56"
        height="6"
        rx="3"
        className="fill-primary-800"
      />

      {/* ذره‌بین */}
      <path
        d="M180 132L202 154"
        strokeWidth="8"
        strokeLinecap="round"
        className="stroke-primary-400"
      />
      <circle
        cx="160"
        cy="112"
        r="26"
        strokeWidth="6"
        className="fill-primary-900 stroke-primary-400"
      />
      <circle cx="152" cy="107" r="2.5" className="fill-primary-300" />
      <circle cx="168" cy="107" r="2.5" className="fill-primary-300" />
      <path
        d="M151 122Q160 114 169 122"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-primary-300"
      />
    </svg>
  );
}

export function EmptyIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <ellipse
        cx="120"
        cy="164"
        rx="72"
        ry="7"
        className="fill-primary-500/10"
      />

      {/* برگه خالی */}
      <rect
        x="94"
        y="30"
        width="52"
        height="54"
        rx="8"
        strokeWidth="2"
        strokeDasharray="5 5"
        className="stroke-primary-500"
      />
      <rect
        x="106"
        y="46"
        width="28"
        height="5"
        rx="2.5"
        className="fill-primary-700"
      />
      <rect
        x="106"
        y="58"
        width="18"
        height="5"
        rx="2.5"
        className="fill-primary-800"
      />

      {/* جعبه */}
      <rect
        x="66"
        y="80"
        width="108"
        height="64"
        rx="12"
        strokeWidth="2"
        className="fill-primary-900 stroke-primary-700"
      />
      <path
        d="M66 98H98Q104 98 106 106H134Q136 98 142 98H174"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="stroke-primary-500"
      />

      {/* جزئیات تزئینی */}
      <circle cx="58" cy="52" r="3.5" className="fill-primary-500/40" />
      <circle cx="186" cy="64" r="3" className="fill-primary-500/40" />
      <path
        d="M180 34V46M174 40H186"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-primary-400/60"
      />
    </svg>
  );
}

export function ErrorIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <ellipse
        cx="120"
        cy="164"
        rx="72"
        ry="7"
        className="fill-primary-500/10"
      />

      {/* کارت */}
      <rect
        x="48"
        y="34"
        width="144"
        height="100"
        rx="14"
        strokeWidth="2"
        className="fill-primary-900/50 stroke-primary-700"
      />
      <rect
        x="70"
        y="104"
        width="100"
        height="6"
        rx="3"
        className="fill-primary-800"
      />
      <rect
        x="70"
        y="118"
        width="62"
        height="6"
        rx="3"
        className="fill-primary-800"
      />

      {/* هشدار */}
      <path
        d="M120 46L148 92H92Z"
        strokeWidth="6"
        strokeLinejoin="round"
        className="fill-rose-500/15 stroke-rose-400"
      />
      <path
        d="M120 62V76"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-rose-400"
      />
      <circle cx="120" cy="84" r="3" className="fill-rose-400" />

      <circle cx="40" cy="60" r="3" className="fill-primary-500/40" />
      <circle cx="204" cy="48" r="3.5" className="fill-primary-500/40" />
    </svg>
  );
}
