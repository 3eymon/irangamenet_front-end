import { UserIcon } from "@heroicons/react/24/solid";
import { memo, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

type Status = "loading" | "loaded" | "error";

interface ImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
  fallback?: ReactNode;
  icon?: boolean;
}

const GamingFallback = memo(function GamingFallback({ alt }: { alt: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 isolate overflow-hidden bg-[#19181e]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(124,94,170,0.12),transparent_65%),linear-gradient(135deg,#292630_0%,#1d1c23_55%,#141419_100%)]" />

      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity=".55" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity=".08" />
          </linearGradient>

          <radialGradient id={`${id}-glow`}>
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".18" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <pattern
            id={`${id}-grid`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke="#aaa0c0"
              strokeOpacity=".065"
              strokeWidth=".7"
            />
          </pattern>
        </defs>

        <rect width="600" height="400" fill={`url(#${id}-grid)`} />

        <circle cx="300" cy="200" r="190" fill={`url(#${id}-glow)`} />

        <g fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="1">
          <ellipse
            cx="300"
            cy="200"
            rx="205"
            ry="85"
            transform="rotate(-25 300 200)"
          />

          <ellipse
            cx="300"
            cy="200"
            rx="155"
            ry="65"
            transform="rotate(25 300 200)"
          />

          <circle cx="300" cy="200" r="115" strokeOpacity=".3" />
          <circle
            cx="300"
            cy="200"
            r="85"
            strokeOpacity=".2"
            strokeDasharray="4 9"
          />
        </g>

        <g fill="none" stroke="#a78bfa" strokeOpacity=".35" strokeWidth="1">
          <path d="M0 290H100L135 255H195" />
          <path d="M600 110H510L475 145H420" />
          <path d="M40 80H100L125 105" />
          <path d="M560 330H490L460 300" />
        </g>

        <g
          transform="translate(300 200) rotate(-12)"
          fill="#272431"
          stroke="#a78bfa"
          strokeOpacity=".6"
          strokeWidth="2"
        >
          <path
            d="M-105-29Q-110-54-80-57L-42-63Q0-70 42-63L80-57Q110-54 105-29L91 43Q85 67 67 65L35 30Q0 20-35 30L-67 65Q-85 67-91 43Z"
            strokeLinejoin="round"
          />

          <g fill="#a78bfa" fillOpacity=".65" stroke="none">
            <rect x="-72" y="-22" width="15" height="42" rx="3" />
            <rect x="-85" y="-9" width="42" height="15" rx="3" />
          </g>

          <g fill="#a78bfa" fillOpacity=".65" stroke="none">
            <circle cx="65" cy="-17" r="7" />
            <circle cx="82" cy="0" r="7" />
            <circle cx="48" cy="0" r="7" />
            <circle cx="65" cy="17" r="7" />
          </g>

          <g fill="#a78bfa" fillOpacity=".4" stroke="none">
            <rect x="-14" y="-23" width="11" height="5" rx="2" />
            <rect x="5" y="-23" width="11" height="5" rx="2" />
          </g>
        </g>

        <g fill="#c4b5fd">
          <circle cx="115" cy="135" r="2" opacity=".7" />
          <circle cx="470" cy="235" r="2" opacity=".6" />
          <circle cx="390" cy="75" r="1.5" opacity=".5" />
          <circle cx="180" cy="320" r="1.5" opacity=".5" />
          <circle cx="520" cy="65" r="2" opacity=".4" />
        </g>

        <g fill="none" stroke="#a78bfa" strokeOpacity=".45" strokeWidth="1.5">
          <path d="M20 50V20H50" />
          <path d="M550 20H580V50" />
          <path d="M20 350V380H50" />
          <path d="M550 380H580V350" />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#111116]/15 via-transparent to-[#111116]/40" />
    </div>
  );
});
const IconFallback = memo(function IconFallback({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#30283d] via-[#211d2a] to-[#17151d]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]" />

      <div className="relative flex size-full items-center justify-center">
        <UserIcon className="size-1/2 text-violet-400/80" />
      </div>
    </div>
  );
});
function ImageBase({
  src,
  alt,
  className = "",
  priority = false,
  srcSet,
  sizes,
  fallback,
  icon,
}: ImageProps) {
  const [result, setResult] = useState<{
    src: string;
    status: Status;
  } | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  const status: Status = !src
    ? "error"
    : result?.src === src
      ? result.status
      : "loading";

  useEffect(() => {
    const img = imgRef.current;

    if (!src || !img?.complete) return;

    setResult({
      src,
      status: img.naturalWidth > 0 ? "loaded" : "error",
    });
  }, [src]);

  return (
    <div
      className={`relative isolate overflow-hidden bg-[#19181e] ${className}`}
    >
      {status === "error" ? (
        (fallback ??
        (icon ? <IconFallback alt={alt} /> : <GamingFallback alt={alt} />))
      ) : (
        <>
          {status === "loading" && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[#302b38]/50 via-[#242129]/60 to-[#19181e] animate-pulse"
            />
          )}

          <img
            ref={imgRef}
            src={src ?? undefined}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            draggable={false}
            onLoad={() => {
              if (src) setResult({ src, status: "loaded" });
            }}
            onError={() => {
              if (src) setResult({ src, status: "error" });
            }}
            className={`relative size-full object-cover transition-opacity duration-300 ${
              status === "loaded" ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
    </div>
  );
}

const Image = memo(ImageBase);

export default Image;
