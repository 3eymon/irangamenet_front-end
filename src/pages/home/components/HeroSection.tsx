import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { NewspaperIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { Game } from "../../../types/game.types";
import { formatCompactNumber } from "../../../utils/formatCompactNumber";
import { EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { News } from "../../../types/news.types";
type NewsCardPreviewProps = {
  cards: News[];
  isLoading?: boolean;
};

import { SignalSlashIcon } from "@heroicons/react/24/outline";

function NewsCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex w-full flex-col rounded-xl border border-primary-400/20 bg-gradient-to-br from-primary-500/35 via-primary-900/80 to-[#0b0b11] p-3 shadow-lg shadow-black/20"
    >
      <div className="aspect-video h-32 w-full rounded-md object-cover sm:h-44 md:h-52 bg-primary-400/10" />

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
        className="pointer-events-none absolute inset-0 backdrop-blur-[3px] bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.12),transparent_65%)]"
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
        autoplay={{ delay: 5_000 ,  }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={`mySwiper w-full max-w-[35rem] px-6 ${hasError ? "pointer-events-none" : ""}`}
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
                  <div className="flex w-full flex-col rounded-xl border border-primary-400/20 bg-gradient-to-br from-primary-500/35 via-primary-900/80 to-[#0b0b11]/95 p-3 shadow-lg shadow-black/20 backdrop-blur-[2px]">
                    <Link to={`/news/${card.id}`} className="w-full">
                      <img
                        className="aspect-video h-32 w-full rounded-md object-cover sm:h-44 md:h-52 bg-primary-400/10"
                        src={card.image}
                        alt={card.title ?? ""}
                        loading="lazy"
                      />
                    </Link>

                    <div className="flex flex-col gap-3 pt-2">
                      <Link
                        to={`/news/${card.id}`}
                        className="line-clamp-1 text-xs sm:text-sm"
                      >
                        {card.title}
                      </Link>

                      <div className="flex items-center justify-between gap-2 text-[10px] text-gray-200 sm:text-[11px]">
                        <span className="flex items-center gap-1">
                          <span dir="ltr" className="tabular-nums">
                            {formatCompactNumber(card.views)}
                          </span>
                          <EyeIcon className="w-3 shrink-0 sm:w-4" />
                        </span>

                        <div className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-xs font-medium text-white/80">
                            {card.author}
                          </span>

                          <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                            {card.authorImage ? (
                              <img
                                src={card.authorImage}
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
                </SwiperSlide>
              ))}

        <div
          className={`game-card-pagination relative mt-4 flex justify-center gap-1 ${hasError ? "brightness-50 opacity-25" : ""}`}
        />
      </Swiper>
    </div>
  );
}
function HeroSection({
  data,
  isLoading,
}: {
  data: News[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-full mt-8 sm:mt-28 px-4 z-10">
        <Texts />
        <NewsCardPreview isLoading={isLoading} cards={data ?? []} />
      </div>
    </>
  );
}
function Texts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col gap-7 font-Peyda"
    >
      <h1 className="text-4xl font-bold xl:w-3/4 line-clamp-2 leading-snug">
        تماشای بازی و و دیدن بروز ترین اخبار بازی ها فقط تو
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-extrabold ">
          ایران گیم نت&nbsp;
        </span>
        که حال میده ارعععع
      </h1>
      <p className="text-gray-400 text-xs">
        خیلی راحت با ایران گیم نت به تمام اخبار بازی های جهان اگاه باش .
      </p>
      <div className="flex gap-3 font-PeydaLight">
        <button
          onClick={() => window.scrollTo(0, 750)}
          className=" text-xs font-thin bg-gradient-to-r from-primary to-secondary px-6 py-1 transition-transform ease-linear rounded-md shadow-primary/35 hover:scale-95 "
        >
          بریم برای شروع
        </button>
        <Link
          to="/news/latest"
          className="text-xs inline-flex gap-1 items-center  px-5 py-1 transition-transform ease-linear rounded-md border-2 border-secondary hover:scale-95 "
        >
          <NewspaperIcon className="w-5" />
          جدیدترین اخبار
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex -space-x-2 space-x-reverse">
          <img
            className="w-12 h-12 border-2 bg-gray-800 border-secondary rounded-full  object-cover aspect-video"
            src="images/icon/header/Call_of_duty.jpg"
            alt=""
          />
          <img
            className="w-12 h-12 border-2 bg-gray-800 border-gray-600 rounded-full  object-cover aspect-video"
            src="images/icon/header/Forza.jpg"
            alt=""
          />
          <img
            className="w-12 h-12 border-2 bg-gray-800 border-secondary/70 rounded-full  object-cover aspect-video"
            src="images/icon/header/Grand-Theft-Auto-San-Andreas.jpg"
            alt=""
          />
        </div>
        <p className="text-xs w-[6.5rem]">
          بیش از 1000 سازنده بازی در ایران گیم نت ...
        </p>
      </div>
    </motion.div>
  );
}
export default HeroSection;
