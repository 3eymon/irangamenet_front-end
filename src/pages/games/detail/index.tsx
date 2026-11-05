import { useEffect, useState } from "react";

import {
  BookmarkIcon,
  CheckIcon,
  HeartIcon,
  PlayIcon,
  PlusIcon,
  ShareIcon,
  CalendarDaysIcon,
  CodeBracketIcon,
  BuildingOffice2Icon,
  UsersIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Rating from "@mui/lab/Rating/Rating";
import Image from "../../../components/ui/Image";
import { getGameById } from "../../../services/gameService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { isNotFoundError } from "../../../utils/isNotFoundErr";
import ErrorState from "../../../components/ui/ErrorState";
import NotFound from "../../../components/ui/NotFound";
type IconButtonProps = {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function GamePage() {
  const { id: gameId } = useParams<{ id: string }>();
  const [inList, setInList] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const {
    data: game,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGameById(gameId!),
    enabled: !!gameId,
  });
  useEffect(() => {
    if (!shareNote) return;

    const timer = window.setTimeout(() => {
      setShareNote("");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [shareNote]);

  async function handleShare() {
    if (!game) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: game.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        setShareNote("پیوند کپی شد");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setShareNote("اشتراک‌گذاری ناموفق بود");
      }
    }
  }
  if (isLoading) return <GamePageSkeleton />;
  if (isError && !isNotFoundError(error)) {
    return (
      <ErrorState
        title="خطا در دریافت اطلاعات بازی"
        description={
          error instanceof Error ? error.message : "مشکلی پیش آمده است."
        }
        retry={{
          fn: refetch,
          label: isFetching ? "در حال تلاش مجدد..." : "تلاش دوباره",
          isLoading: isFetching,
        }}
      />
    );
  }

  if (!game) {
    return (
      <NotFound
        backTo="/games"
        backLabel="برگشت به بخش بازی ها"
        title="بازی پیدا نشد"
        description="ممکن است این بازی حذف شده باشد یا آدرس اشتباه باشد."
      />
    );
  }

  const rating = (game && Number(game.rating)) || 0;

  return (
    <main className="relative isolate w-full overflow-hidden text-white">
      <section
        aria-labelledby="game-title"
        className="relative isolate min-h-[100svh] w-full overflow-hidden md:rounded-2xl"
      >
        <div className="grid min-h-[100svh] grid-cols-1 gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:p-12">
          <section className="flex flex-col justify-center gap-6 lg:py-2">
            <div className="space-y-5">
              <div>
                <span className="mb-3 block text-xs font-bold tracking-[0.2em] text-primary-400">
                  {game.category}
                </span>

                <h1
                  id="game-title"
                  className="text-3xl font-black sm:text-4xl lg:text-5xl "
                >
                  {game.title}
                </h1>

                <AccentBar />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                {game.rating !== undefined && (
                  <div className="flex items-center gap-2" dir="ltr">
                    <Rating
                      name="game-rating"
                      value={rating}
                      precision={0.1}
                      size="small"
                      readOnly
                      sx={{
                        color: "#a855f7",
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(255,255,255,.3)",
                        },
                      }}
                    />

                    <span className="text-sm font-bold" dir="rtl">
                      {rating.toLocaleString("fa-IR", {
                        minimumFractionDigits: 1,
                      })}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  {game.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded font-Jaro border border-white/20 bg-white/5 px-2 py-1 text-sm text-zinc-200"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-zinc-400">ژانر:</span>

                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="-skew-x-12 border border-primary-400/40 bg-primary-500/15 px-3 py-1 text-xs"
                  >
                    <span className="inline-block skew-x-12">{genre}</span>
                  </span>
                ))}
              </div>

              <p className="max-w-2xl line-clamp-4 text-sm leading-8 text-zinc-300 sm:text-base">
                {game.description}
              </p>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5 border-y border-white/10 py-5 sm:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CalendarDaysIcon className="size-4 text-primary-400" />
                    <span className="text-xs">سال انتشار</span>
                  </div>

                  <p className="max-sm:text-base text-lg font-bold font-Jaro">
                    {game.releaseYear}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CodeBracketIcon className="size-4 text-primary-400" />
                    <span className="text-xs">سازنده</span>
                  </div>

                  <p className="text-sm font-bold">{game.developer}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <BuildingOffice2Icon className="size-4 text-primary-400" />
                    <span className="text-xs">ناشر</span>
                  </div>

                  <p className="text-sm font-bold">{game.publisher}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <UsersIcon className="size-4 text-primary-400" />
                    <span className="text-xs">حالت بازی</span>
                  </div>

                  <p className="text-sm font-bold">{game.modes.join("، ")}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  aria-pressed={inList}
                  onClick={() => setInList((value) => !value)}
                  className={`
                  -skew-x-12 px-4 py-3 text-sm font-bold
                  transition focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-primary-300
                  sm:px-5
                  ${
                    inList
                      ? "border border-primary-400 bg-primary-500/20"
                      : "bg-primary-500 hover:bg-primary-600"
                  }
                `}
                >
                  <span className="flex skew-x-12 items-center gap-2">
                    {inList ? (
                      <CheckIcon className="size-5" />
                    ) : (
                      <PlusIcon className="size-5" />
                    )}

                    {inList ? "در لیست بازی‌ها" : "افزودن به لیست بازی‌ها"}
                  </span>
                </button>

                <IconButton
                  label={
                    favorite
                      ? "حذف از علاقه‌مندی‌ها"
                      : "افزودن به علاقه‌مندی‌ها"
                  }
                  pressed={favorite}
                  onClick={() => setFavorite((value) => !value)}
                >
                  <HeartIcon className="size-5" />
                </IconButton>

                <IconButton
                  label={saved ? "حذف از ذخیره‌شده‌ها" : "ذخیره بازی"}
                  pressed={saved}
                  onClick={() => setSaved((value) => !value)}
                >
                  <BookmarkIcon className="size-5" />
                </IconButton>

                <IconButton label="اشتراک‌گذاری بازی" onClick={handleShare}>
                  <ShareIcon className="size-5" />
                </IconButton>

                {shareNote && (
                  <span role="status" className="text-xs text-primary-300">
                    {shareNote}
                  </span>
                )}
              </div>
            </div>
          </section>

          <aside className="flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
              <div>
                <p className="font-bold">تریلر بازی</p>

                <p className="mt-1 text-xs text-zinc-400">
                  تماشای ویدئوی معرفی بازی
                </p>
              </div>

              {game.trailerUrl ? (
                <a
                  href={game.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="مشاهده تریلر"
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-500 transition hover:bg-primary-600"
                >
                  <PlayIcon className="size-6" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-label="تریلر به‌زودی"
                  className="grid size-12 shrink-0 cursor-not-allowed place-items-center rounded-full bg-white/10 text-zinc-400"
                >
                  <PlayIcon className="size-6" />
                </button>
              )}
            </div>

            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold">تصاویر بازی</h2>
                <AccentBar />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                {game.screenshots.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="w-56 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:w-64 lg:w-full"
                  >
                    <Image
                      src={src}
                      alt={`تصویر ${index + 1} بازی ${game.title}`}
                      className="aspect-video w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
function Bone({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/10 ${className}`} />;
}

function GamePageSkeleton() {
  return (
    <main
      className="relative isolate w-full overflow-hidden text-white"
      aria-busy="true"
      aria-label="در حال بارگذاری"
    >
      <section className="relative isolate min-h-[100svh] w-full overflow-hidden md:rounded-2xl">
        <div className="grid min-h-[100svh] grid-cols-1 gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:p-12">
          <section className="flex flex-col justify-center gap-6 lg:py-2">
            <div className="space-y-5">
              <div className="space-y-3">
                <Bone className="h-3 w-24" />
                <Bone className="h-10 w-3/4 sm:h-12" />
                <Bone className="h-1 w-16" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Bone className="h-4 w-32" />
                <Bone className="h-6 w-16" />
                <Bone className="h-6 w-16" />
                <Bone className="h-6 w-16" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Bone className="h-4 w-10" />
                <Bone className="h-6 w-20" />
                <Bone className="h-6 w-24" />
              </div>

              <div className="max-w-2xl space-y-3">
                <Bone className="h-3 w-full" />
                <Bone className="h-3 w-full" />
                <Bone className="h-3 w-11/12" />
                <Bone className="h-3 w-2/3" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5 border-y border-white/10 py-5 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Bone className="h-3 w-20" />
                    <Bone className="h-4 w-24" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Bone className="h-12 w-48 rounded-none" />
                <Bone className="size-12 rounded-full" />
                <Bone className="size-12 rounded-full" />
                <Bone className="size-12 rounded-full" />
              </div>
            </div>
          </section>

          <aside className="flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="space-y-2">
                <Bone className="h-4 w-24" />
                <Bone className="h-3 w-36" />
              </div>
              <Bone className="size-12 shrink-0 rounded-full" />
            </div>

            <div>
              <div className="mb-4 space-y-2">
                <Bone className="h-6 w-32" />
                <Bone className="h-1 w-16" />
              </div>
              <div className="flex gap-3 overflow-x-hidden lg:flex-col">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Bone
                    key={i}
                    className="aspect-video w-56 shrink-0 rounded-lg sm:w-64 lg:w-full"
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function IconButton({ label, pressed, onClick, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`
        grid size-10 shrink-0 -skew-x-12 place-items-center
        border transition duration-200
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-primary-300
        ${
          pressed
            ? "border-primary-400 bg-primary-500/25 text-primary-300"
            : "border-white/20 text-white hover:border-primary-400 hover:text-primary-300"
        }
      `}
    >
      <span className="skew-x-12">{children}</span>
    </button>
  );
}

function AccentBar() {
  return (
    <div
      aria-hidden="true"
      className="mt-2 h-2 w-16 -skew-x-[45deg] bg-primary-500 shadow-[5px_0_15px] shadow-purple-500/50"
    />
  );
}
