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
import { getNewsById, getRelatedNews } from "../../../services/newsService";
import Card from "../../../components/ui/Card";
import { sliderCardsType } from "../../../components/ui/SliderCards";
import DataSliderSection from "../../../components/ui/DataSliderSection";
import ReactTimeAgo from "react-time-ago";

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

function ErrorPage({ message }: { message: string }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <span className="text-5xl text-zinc-600">!</span>

      <h1 className="mt-5 text-xl font-bold text-white">مشکلی پیش آمده</h1>

      <p className="mt-3 text-sm text-zinc-500">{message}</p>

      <Link
        to="/news"
        className="mt-6 rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-600"
      >
        بازگشت به اخبار
      </Link>
    </main>
  );
}

export default function NewsPage() {
  const { id } = useParams<{ id: string }>();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareNote, setShareNote] = useState("");

  const {
    data: news,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id!),
    enabled: Boolean(id),
    staleTime: 60_000,
  });

  const { data: relatedNews = [] } = useQuery({
    queryKey: ["related-news", id],
    queryFn: () => getRelatedNews(news!),
    enabled: Boolean(news),
    staleTime: 60_000,
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

  if (isError) {
    return (
      <ErrorPage
        message={
          error instanceof Error ? error.message : "دریافت خبر با خطا مواجه شد."
        }
      />
    );
  }

  if (!news) {
    return <ErrorPage message="خبری با این شناسه پیدا نشد." />;
  }

  return (
    <main className="min-h-screen overflow-hidden text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <nav
          aria-label="مسیر صفحه"
          className="mb-8 flex items-center gap-2 text-xs text-zinc-500"
        >
          <Link to="/" className="transition hover:text-primary-300">
            خانه
          </Link>

          <span>/</span>

          <Link to="/news" className="transition hover:text-primary-300">
            اخبار
          </Link>

          <span>/</span>

          <span className="max-w-[180px] truncate text-zinc-300">
            {news.category ?? "خبر"}
          </span>
        </nav>

        <header className="mx-auto">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {news.category && (
              <span className="rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-1.5 text-xs font-bold text-primary-300">
                {news.category}
              </span>
            )}

            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <CalendarDaysIcon className="size-4" />
              {news.created_at &&
                new Date(news.created_at).toLocaleDateString("fa-IR")}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <ClockIcon className="size-4" />
              {formatNumber(news.readingTime)} دقیقه مطالعه
            </span>
          </div>

          <h1 className="text-2xl font-black leading-[1.8] text-white sm:text-3xl lg:text-4xl">
            {news.title}
          </h1>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-zinc-400 sm:text-base">
            {news.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-white/10 py-5">
            <div className="flex items-center gap-3">
              {news.authorImage ? (
                <img
                  src={news.authorImage}
                  alt={news.author}
                  className="size-11 rounded-full border border-white/10 object-cover"
                  width={44}
                  height={44}
                />
              ) : (
                <UserCircleIcon className="size-11 text-zinc-500" />
              )}

              <div>
                <p className="text-sm font-bold text-white">{news.author}</p>

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
          <img
            src={news.image}
            alt={news.title}
            fetchPriority="high"
            decoding="async"
            className="aspect-[16/8] w-full object-cover sm:aspect-[16/7]"
          />
        </figure>

        <div className="mt-14">
          <article className="min-w-0">
            <div className="mb-10 rounded-xl border border-primary-500/15 bg-primary-500/[0.04] p-5">
              <p className="text-sm leading-8 text-zinc-300">
                {news.description}
              </p>
            </div>

            <div className="space-y-16">
              {news.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-6"
                >
                  <h2 className="border-b border-white/10 pb-4 text-xl font-black text-white sm:text-2xl">
                    {section.title}
                  </h2>

                  <div className="space-y-6">
                    {section.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-9 text-zinc-300 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.image && (
                    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#111116]">
                      <img
                        src={section.image}
                        alt={section.imageCaption ?? section.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[520px] w-full object-cover"
                      />

                      {section.imageCaption && (
                        <figcaption className="border-t border-white/10 px-4 py-3 text-center text-xs text-zinc-500">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </section>
              ))}
            </div>

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-14 border-t border-white/10 pt-8">
                <h3 className="mb-4 text-sm font-bold">موضوعات مرتبط</h3>

                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400 transition hover:border-primary-500/40 hover:text-primary-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Actions */}
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
