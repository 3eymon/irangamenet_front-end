import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";

import { Platform, Streamer } from "../../types/streamer.types";
const PLATFORM_LABEL: Record<Platform, string> = {
  twitch: "Twitch",
  youtube: "YouTube",
  aparat: "آپارات",
  instagram: "Instagram",
};

const getAvatar = (s: Streamer) =>
  s.avatar ||
  (s.platform !== "aparat"
    ? `https://unavatar.io/${s.platform}/${s.username}`
    : "");

export default function StreamerCard({ s }: { s: Streamer }) {
  const [failed, setFailed] = useState(false);
  const src = getAvatar(s);
  const imgCls =
    "w-16 h-16 md:w-20 md:h-20 rounded-full ring-2 ring-violet-500/40";

  return (
    <a
      href={s.link}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col items-center gap-2 text-center"
    >
      <div className="relative transition-transform duration-200 group-hover:scale-105">
        {src && !failed ? (
          <img
            src={src}
            alt={s.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`${imgCls} object-cover`}
          />
        ) : (
          <UserIcon
            className={`${imgCls} p-4 text-violet-300/70 bg-violet-500/10`}
          />
        )}
        {s.isLive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-2 py-0.5 text-[8px] font-bold">
            LIVE
          </span>
        )}
      </div>

      <p className="text-xs md:text-sm text-gray-100 group-hover:text-violet-300 transition-colors">
        {s.name}
      </p>
      <p className="text-[10px] text-violet-300/80">
        {PLATFORM_LABEL[s.platform]}
        {s.followers ? ` · ${s.followers}` : ""}
      </p>
      {s.category && (
        <p className="text-[10px] text-gray-400">{s.category}</p>
      )}
    </a>
  );
}