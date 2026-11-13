import { useState } from "react";
import {
  HeartIcon,
  NewspaperIcon,
  PuzzlePieceIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
const FAVORITE_TABS = [
  { label: "همه", value: "all", icon: Squares2X2Icon },
  { label: "بازی‌ها", value: "games", icon: PuzzlePieceIcon },
  { label: "اخبار", value: "news", icon: NewspaperIcon },
];

function Favorites() {
  const [activeTab, setActiveTab] = useState("all");

  const favorites: { id: string; type: string }[] = [];

  const filteredFavorites =
    activeTab === "all"
      ? favorites
      : favorites.filter((item) => item.type === activeTab);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">علاقه‌مندی‌های من</h1>
        <p className="text-sm text-neutral-500">
          مجموعه‌ای از بازی‌ها، اخبار و محتواهایی که بهشون علاقه داری.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">محتوای موردعلاقه</h2>

          <span className="text-xs text-neutral-500">
            {favorites.length} مورد
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-3">
          {FAVORITE_TABS.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs transition-colors ${
                activeTab === value
                  ? "bg-primary-500/15 text-primary-300"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
              <HeartIcon className="size-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">
                {activeTab === "all"
                  ? "هنوز چیزی به علاقه‌مندی‌هات اضافه نکردی!"
                  : activeTab === "games"
                    ? "بازی موردعلاقه‌ای نداری!"
                    : "خبر موردعلاقه‌ای نداری!"}
              </h3>

              <p className="max-w-xs text-xs leading-6 text-neutral-500">
                محتواهایی که دوست داری رو به علاقه‌مندی‌هات اضافه کن تا همه رو
                یکجا داشته باشی.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Favorite Cards */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
