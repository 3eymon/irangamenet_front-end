import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { NewspaperIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { formatCompactNumber } from "../../../utils/formatCompactNumber";
import { EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
type NewsCardPreviewProps = {
  cards: News[];
  isLoading?: boolean;
};

import { SignalSlashIcon } from "@heroicons/react/24/outline";
import Image from "../../../components/ui/Image";
import { News } from "../../../services/news/queries";
import { extractAuthorName } from "../../../utils/extractAuthorName";

function NewsCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex w-full flex-col rounded-xl border border-primary-400/20 bg-gradient-to-br from-primary-500/35 via-primary-900/80 to-[#0b0b11] p-3 shadow-lg shadow-black/20"
    >
      <div className="aspect-video h-32 w-full rounded-md bg-primary-400/10 object-cover sm:h-44 md:h-52" />

      <div className="flex flex-col gap-3 pt-3">
        <div className="h-3 w-3/4 rounded-sm bg-primary-200/10" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-8 rounded-sm bg-primary-200/10" />
            <div className="h-3 w-3 rounded-full bg-primary-200/10" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-14 rounded-sm bg-primary-200/10" />
            <div className="h-6 w-6 shrink-0 rounded-full bg-primary-300/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
function NewsCardError() {
  return (
    <div
      role="alert"
      aria-label="خطا در دریافت خبر"
      className="relative flex w-full select-none flex-col overflow-hidden rounded-xl border border-primary-400/10 bg-gradient-to-br from-primary-500/35 via-primary-900/80 to-[#0b0b11] p-3 shadow-lg shadow-black/20"
    >
      <div aria-hidden="true" className="flex flex-col opacity-40">
        <div className="aspect-video h-32 w-full rounded-md bg-primary-400/10 sm:h-44 md:h-52" />

        <div className="flex flex-col gap-3 pt-3">
          <div className="h-3 w-3/4 rounded-sm bg-primary-200/10" />

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-8 rounded-sm bg-primary-200/10" />
              <div className="h-3 w-3 rounded-full bg-primary-200/10" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-14 rounded-sm bg-primary-200/10" />
              <div className="h-6 w-6 shrink-0 rounded-full bg-primary-300/10" />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.12),transparent_65%)] backdrop-blur-[3px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0b11]/10 via-[#0b0b11]/40 to-[#0b0b11]/85"
      />

      <div className="absolute inset-x-3 top-3 flex h-32 items-center justify-center sm:h-44 md:h-52">
        <SignalSlashIcon
          className="h-10 w-10 text-primary-100/40 sm:h-12 sm:w-12"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
function NewsCardPreview({ cards, isLoading = false }: NewsCardPreviewProps) {
  const showSkeleton = isLoading && cards.length === 0;
  const hasError = !isLoading && cards.length === 0;
  const pagination = {
    el: ".game-card-pagination",
    bulletClass:
      "bg-white/50 w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/80",
    bulletActiveClass: "!bg-white !w-3",
    clickable: true,
    renderBullet: (_index: number, className: string) =>
      `<span class="${className}"></span>`,
  };
  return (
    <div
      className="relative flex w-full items-center py-10 lg:py-0"
      aria-busy={isLoading}
    >
      <div className="gradient" />

      <Swiper
        effect="coverflow"
        grabCursor={!showSkeleton}
        initialSlide={0}
        centeredSlides
        slidesPerView={2}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={showSkeleton ? false : pagination}
        autoplay={{ delay: 5_000 }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={`mySwiper w-full max-w-xl !overflow-visible ${hasError ? "pointer-events-none" : ""}`}
      >
        {hasError
          ? Array.from({ length: 3 }, (_, index) => (
              <SwiperSlide key={`error-${index}`}>
                <NewsCardError />{" "}
              </SwiperSlide>
            ))
          : showSkeleton
            ? Array.from({ length: 3 }, (_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <NewsCardSkeleton />
                </SwiperSlide>
              ))
            : cards.map((card) => (
                <SwiperSlide key={card.id}>
                  <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-primary-400/20 bg-gradient-to-br from-primary-500/35 via-primary-900/80 to-[#0b0b11]/95 p-3 shadow-lg shadow-black/30 backdrop-blur-[2px]">
                    <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-400/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <Link
                      to={`/news/${card.slug}`}
                      className="relative block w-full overflow-hidden rounded-xl"
                    >
                      <Image
                        className="aspect-video h-32 w-full bg-primary-400/10 object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-44 md:h-52"
                        src={card.cover_path}
                        alt={card.title ?? ""}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {card.categories?.length > 0 && (
                        <div className="absolute end-2 top-2 flex max-w-[80%] flex-wrap gap-1.5">
                          {card.categories.slice(0, 2).map((category) => (
                            <span
                              key={category.slug}
                              className="truncate rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md sm:text-xs"
                            >
                              {category.title}
                            </span>
                          ))}
                          {card.categories.length > 2 && (
                            <span className="rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-md sm:text-xs">
                              +{card.categories.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      <span className="absolute bottom-2 left-2 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-primary-500 text-white opacity-0 shadow-lg shadow-primary-500/40 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17 17 7M7 7h10v10"
                          />
                        </svg>
                      </span>
                    </Link>

                    <div className="relative flex flex-col gap-3 pt-3">
                      <Link
                        to={`/news/${card.slug}`}
                        className="line-clamp-1 text-xs font-semibold text-white transition-colors duration-200 hover:text-primary-200 sm:text-sm lg:text-base"
                      >
                        {card.title}
                      </Link>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                      <div className="flex items-center justify-between gap-2 text-[10px] text-gray-200 sm:text-[11px]">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10 transition-colors group-hover:bg-white/10">
                          <span dir="ltr" className="tabular-nums">
                            {formatCompactNumber(card.views)}
                          </span>
                          <EyeIcon className="w-3 shrink-0 text-primary-200 sm:w-4" />
                        </span>

                        <div className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-xs font-medium text-white/80 transition-colors group-hover:text-white">
                            {extractAuthorName(card)}
                          </span>

                          <div className="shrink-0 rounded-full bg-gradient-to-tr from-primary-300 via-primary-500 to-white/70 p-[1.5px]">
                            <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-neutral-800">
                              {card.author.avatar_path ? (
                                <img
                                  src={card.author.avatar_path}
                                  alt=""
                                  loading="lazy"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <UserCircleIcon className="h-4 w-4 text-white/50" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}

        <div
          className={`game-card-pagination relative mt-4 flex justify-center gap-1 ${hasError ? "opacity-25 brightness-50" : ""}`}
        />
      </Swiper>
    </div>
  );
}
function HeroSection({
  data,
  isLoading,
}: {
  data?: News[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className="z-10 mt-8 flex h-full w-full flex-col items-center px-4 sm:mt-28 lg:flex-row">
        <Texts />
        <NewsCardPreview isLoading={isLoading} cards={data ?? []} />
      </div>
    </>
  );
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Texts() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-20 flex w-full flex-col gap-7 font-Peyda max-md:items-center max-md:text-center"
    >
      <div className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-3xl bg-gradient-to-r from-background/95 via-backfrom-background/75 to-transparent blur-2xl" />

      <div className="gradient inset-0" />

      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold leading-[1.3] xl:text-5xl xl:leading-[1.4]"
      >
        دنیای بازی‌ها رو از زاویه‌ای تازه تجربه کن؛ از جدیدترین اخبار تا
        محبوب‌ترین بازی‌ها، همه در{" "}
        <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text font-extrabold text-transparent">
          ایران گیم نت
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="max-w-xl text-sm leading-8 text-gray-400 sm:text-base"
      >
        جدیدترین اخبار دنیای گیم، معرفی و بررسی بازی‌ها و محتوای جذاب از دنیای
        بازی‌های ویدیویی رو یک‌جا دنبال کن.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="font-PeydaLight flex flex-wrap gap-3"
      >
        <a
          href="#latest-games"
          className="inline-flex items-center rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm shadow-primary/35 transition-transform hover:scale-95"
        >
          کشف دنیای بازی‌ها
        </a>

        <Link
          to="/news/discover/latest"
          className="inline-flex items-center gap-2 rounded-md border-2 border-secondary px-5 py-2.5 text-sm transition-transform hover:scale-95"
        >
          <NewspaperIcon className="w-5" />
          آخرین اخبار گیمینگ
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <div className="flex -space-x-2 space-x-reverse">
          <img
            className="h-12 w-12 rounded-full border-2 border-secondary bg-gray-800 object-cover"
            src="images/icon/header/Call_of_duty.jpg"
            alt=""
          />
          <img
            className="h-12 w-12 rounded-full border-2 border-gray-600 bg-gray-800 object-cover"
            src="images/icon/header/Forza.jpg"
            alt=""
          />
          <img
            className="h-12 w-12 rounded-full border-2 border-secondary/70 bg-gray-800 object-cover"
            src="images/icon/header/Grand-Theft-Auto-San-Andreas.jpg"
            alt=""
          />
        </div>

        <p className="max-w-[12rem] text-xs leading-6 text-gray-400 sm:text-sm">
          دنیای بازی‌ها، اخبار و تجربه‌هایی که ارزش کشف کردن دارن!
        </p>
      </motion.div>
    </motion.div>
  );
}
export default HeroSection;
