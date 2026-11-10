import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  BookmarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  ArrowRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ReactTimeAgo from "react-time-ago";
import { isNotFoundError } from "../../../utils/isNotFoundErr";
import ErrorState from "../../../components/ErrorState";
import NotFound from "../../../components/NotFound";
import Breadcrumb from "../../../components/Breadcrumb";
import { getNewsBySlug, getRelatedNews } from "../../../services/news";
import { extractAuthorName } from "../../../utils/extractAuthorName";
import Image from "../../../components/ui/Image";

import DataSliderSection from "../../../components/DataSliderSection";
import { sliderCardsType } from "../../../types/card.types";
import MarkDownContent from "../../../components/MarkDownContent";

function formatNumber(value: number | string) {
  return Number(value).toLocaleString("fa-IR");
}

function LoadingPage() {
  return (
    <main className="mx-auto max-w-[1400px] animate-pulse px-5 py-12 sm:px-8">
      <div className="h-5 w-24 rounded bg-white/10" />

      <div className="mt-8 h-10 max-w-3xl rounded bg-white/10" />

      <div className="mt-4 h-4 max-w-xl rounded bg-white/10" />

      <div className="mt-8 aspect-[16/7] w-full rounded-2xl bg-white/10" />

      <div className="mt-12">
        <div className="space-y-6">
          <div className="h-8 w-1/3 rounded bg-white/10" />
          <div className="h-4 rounded bg-white/10" />
          <div className="h-4 rounded bg-white/10" />
          <div className="h-4 w-4/5 rounded bg-white/10" />
        </div>
      </div>
    </main>
  );
}

export default function NewsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareNote, setShareNote] = useState("");

  const {
    data: news,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["news", slug],
    queryFn: () => getNewsBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 5 * 60_000,
  });

  const { data: relatedNews = [] } = useQuery({
    queryKey: ["related-news", slug],
    queryFn: () => getRelatedNews(news!),
    enabled: Boolean(news),
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (!shareNote) return;

    const timer = window.setTimeout(() => {
      setShareNote("");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [shareNote]);

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: news?.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        setShareNote("لینک خبر کپی شد");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setShareNote("اشتراک‌گذاری ناموفق بود");
      }
    }
  }

  if (isLoading) return <LoadingPage />;

  if (isError && !isNotFoundError(error)) {
    return (
      <ErrorState
        title="خطا در دریافت اطلاعات خبر"
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

  if (!news) {
    return (
      <NotFound
        backTo="/news"
        backLabel="برگشت به بخش خبر ها"
        title="خبر پیدا نشد"
        description="ممکن است این خبر حذف شده باشد یا آدرس اشتباه باشد."
      />
    );
  }
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <Breadcrumb
          items={[
            { label: "اخبار", to: "/news" },
            { label: news.title ?? "خبر" },
          ]}
        />

        <header className="mx-auto">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {news.categories &&
              news.categories.map((category) => (
                <Link
                  to={`/news/category/${category.slug}`}
                  key={category.slug}
                  className="rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-1.5 text-xs font-bold text-primary-300"
                >
                  {category.title}
                </Link>
              ))}

            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <CalendarDaysIcon className="size-4" />
              {news.created_at &&
                new Date(news.created_at).toLocaleDateString("fa-IR")}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <ClockIcon className="size-4" />
              {formatNumber(news.reading_time)} دقیقه مطالعه
            </span>
          </div>

          <h1 className="text-2xl font-black leading-[1.8] text-white sm:text-3xl lg:text-4xl">
            {news.title}
          </h1>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-zinc-400 sm:text-base">
            {news.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-white/10 py-5">
            <div className="flex items-center gap-3">
              {news.author.avatar_path ? (
                <img
                  src={news.author.avatar_path}
                  alt={extractAuthorName(news)}
                  className="size-11 rounded-full border border-white/10 object-cover"
                  width={44}
                  height={44}
                />
              ) : (
                <UserCircleIcon className="size-11 text-zinc-500" />
              )}

              <div>
                <p className="text-sm font-bold text-white">
                  {extractAuthorName(news)}
                </p>

                <p className="mt-1 text-[11px] text-zinc-500">نویسنده خبر</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <EyeIcon className="size-4" />
                {formatNumber(news.views)} بازدید
              </span>

              {news.updated_at && (
                <span className="hidden sm:block">
                  آخرین بروزرسانی:{" "}
                  <ReactTimeAgo
                    date={new Date(news.updated_at)}
                    locale="fa-IR"
                    timeStyle="round"
                  />
                </span>
              )}
            </div>
          </div>
        </header>

        <figure className="mx-auto mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111116]">
          <Image
            src={news.cover_path}
            alt={news.title}
            className="aspect-[16/8] w-full object-cover sm:aspect-[16/7]"
          />
        </figure>

        <div className="mt-14">
          <article className="min-w-0">
            <div className="mb-10 rounded-xl border border-primary-500/15 bg-primary-500/[0.04] p-5">
              <p className="text-sm leading-8 text-zinc-300">{news.excerpt}</p>
            </div>

            <MarkDownContent content={news.content} />
            {news.categories && news.categories.length > 0 && (
              <div className="mt-14 border-t border-white/10 pt-8">
                <h3 className="mb-4 text-sm font-bold">دسته بندی ها</h3>

                <div className="flex flex-wrap gap-2">
                  {news.categories.map((cat) => (
                    <Link
                      to={`/news/category/${cat.slug}`}
                      key={cat.slug}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400 transition hover:border-primary-500/40 hover:text-primary-300"
                    >
                      #{cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#111116] p-5">
              <div>
                <p className="text-sm font-bold">از این خبر لذت بردی؟</p>

                <p className="mt-1 text-xs text-zinc-500">
                  نظرت رو با ما به اشتراک بگذار.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-pressed={liked}
                  onClick={() => setLiked((value) => !value)}
                  className={`
                    flex items-center gap-2 rounded-xl border px-3 py-2.5
                    text-xs transition
                    ${
                      liked
                        ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                        : "border-white/10 text-zinc-400 hover:border-rose-500/30 hover:text-rose-400"
                    }
                  `}
                >
                  <HeartIcon className="size-4" />
                  {formatNumber(Number(news.likes ?? 0) + (liked ? 1 : 0))}
                </button>

                <button
                  type="button"
                  aria-pressed={saved}
                  onClick={() => setSaved((value) => !value)}
                  className={`
                    grid size-10 place-items-center rounded-xl border transition
                    ${
                      saved
                        ? "border-primary-500/30 bg-primary-500/10 text-primary-300"
                        : "border-white/10 text-zinc-400 hover:text-primary-300"
                    }
                  `}
                  aria-label={saved ? "حذف از ذخیره‌شده‌ها" : "ذخیره خبر"}
                  title={saved ? "حذف از ذخیره‌شده‌ها" : "ذخیره خبر"}
                >
                  <BookmarkIcon className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="grid size-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-primary-500/30 hover:text-primary-300"
                  aria-label="اشتراک‌گذاری خبر"
                  title="اشتراک‌گذاری"
                >
                  <ShareIcon className="size-4" />
                </button>
              </div>

              {shareNote && (
                <span role="status" className="w-full text-xs text-primary-300">
                  {shareNote}
                </span>
              )}
            </div>
          </article>
        </div>

        {relatedNews.length > 0 && (
          <section className="mt-24 border-t border-white/10 pt-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-primary-400">
                  RELATED NEWS
                </span>

                <h2 className="mt-2 text-2xl font-black">خبرهای مرتبط</h2>

                <p className="mt-2 text-sm text-zinc-500">
                  مطالب دیگری که ممکن است برایت جالب باشند.
                </p>
              </div>

              <Link
                to="/news"
                className="flex items-center gap-2 text-xs text-primary-300 transition hover:text-primary-200"
              >
                مشاهده همه اخبار
                <ArrowRightIcon className="size-4 rotate-180" />
              </Link>
            </div>
            <DataSliderSection
              sliderProps={{
                spaceBetween: 0,
                breakpoints: {
                  576: { slidesPerView: 1 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 2.5 },
                  1500: { slidesPerView: 3.3 },
                },
              }}
              data={relatedNews}
              isLoading={false}
              type={sliderCardsType.News}
            />
          </section>
        )}

        <section className="mt-20 border-t border-white/10 pt-12">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-400">
              KEEP EXPLORING
            </span>

            <h2 className="mt-2 text-2xl font-black">بیشتر بخوانید</h2>

            <p className="mt-2 text-sm text-zinc-500">
              خبرهای بیشتری از دنیای بازی و فناوری.
            </p>
          </div>

          <Link
            to="/news"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-l from-primary-500/10 to-[#111116] p-5 transition hover:border-primary-500/40 sm:p-7"
          >
            <div>
              <h3 className="text-base font-bold">تمام اخبار ایران گیم نت</h3>

              <p className="mt-2 text-xs text-zinc-500">
                آخرین اخبار، بررسی‌ها و مطالب دنیای گیمینگ
              </p>
            </div>

            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-500 text-white">
              <ArrowRightIcon className="size-5 rotate-180" />
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
