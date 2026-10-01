import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EyeIcon ,NewspaperIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MainHeader({ cards }) {
  return (
    <div className="flex flex-col md:flex-row w-full h-full mt-8 sm:mt-28 px-4 z-10">
      <GameTexts />
      <GameCardPreview cards={cards} />
    </div>
  );
}

export default MainHeader;

function GameCardPreview({ cards }) {
  return (
    <div className="relative flex items-center w-full py-10 lg:py-0">
      <div className="gradient"></div>
      <GameCardSlider cards={cards} />
    </div>
  );
}

function GameCardSlider({ cards }) {
  const pagination = {
    el: ".swiper-pagination",
    bulletClass:
      " bg-white/50 w-1.5 h-1.5 rounded-full transition-all ease-linear cursor-pointer hover: bg-white/10",
    bulletActiveClass: "!bg-white !w-3",
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class="${className}"></div>`;
    },
  };
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      initialSlide={1}
      centeredSlides={true}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={pagination}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper w-[35rem] px-6"
    >
      {cards.map((card) => (
        <SwiperSlide key={card.id}>
          <div className="felx flex-col w-full bg-white/10 backdrop-blur-lg rounded-lg p-3 animate-fade-right">
            <a href="#">
              <img
                className="rounded-md h-32 sm:h-44 md:h-52 aspect-video object-cover"
                src={card.image}
                alt=""
              />
            </a>
            <div className="flex flex-col gap-3 pt-2 ">
              <a href="#" className="text-xs sm:text-sm line-clamp-1">
                {card.title}
              </a>
              <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-200 ">
                <span className="flex items-center gap-1">
                  {card.view}
                  <EyeIcon className="w-3 sm:w-4" />
                </span>
                <div className="flex items-center gap-1">
                  {card.creatorName}
                  <img
                    src={card.creatorImage}
                    className="w-5 h-5 rounded-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="relative swiper-pagination flex justify-center gap-1 mt-4 "></div>
    </Swiper>
  );
}

function GameTexts() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col gap-7 font-Peyda"
    >
      <h1 className="text-4xl font-bold xl:w-3/4 line-clamp-2 first-letter:text-lg leading-snug">
        تماشای بازی و و دیدن بروز ترین اخبار بازی ها فقط تو{" "}
        <span className="bg-gradient-to-r from-[#655fd8] to-[#8856c0] bg-clip-text text-transparent font-extrabold ">
          ایران گیم نت&nbsp;
        </span>
        که حال میده ارعععع
      </h1>
      <p className="text-gray-400 text-xs">
        خیلی راحت با ایران گیم نت به تمام اخبار بازی های جهان اگاه باش .
      </p>
      <div className="flex gap-3 font-PeydaLight">
        <button onClick={()=> window.scrollTo(0,750)} className=" text-xs font-thin bg-gradient-to-r from-[#3b35b2] to-[#733cb3] px-6 py-1 transition-transform ease-linear rounded-md shadow-[#733cb39c_0px_0px_5px] hover:scale-95 ">
          بریم برای شروع
        </button>
        <Link
          to="/news/latest"
          className="text-xs inline-flex gap-1 items-center  px-5 py-1 transition-transform ease-linear rounded-md border-2 border-[#733cb3] hover:scale-95 "
        >
          <NewspaperIcon className="w-5" />
          جدیدترین اخبار
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex -space-x-2 space-x-reverse">
          <img
            className="w-12 h-12 border-2 bg-gray-800 border-[#733cb3] rounded-full  object-cover aspect-video"
            src="images/icon/header/Call_of_duty.jpg"
            alt=""
          />
          <img
            className="w-12 h-12 border-2 bg-gray-800 border-gray-600 rounded-full  object-cover aspect-video"
            src="images/icon/header/Forza.jpg"
            alt=""
          />
          <img
            className="w-12 h-12 border-2 bg-gray-800 border-[#50297e] rounded-full  object-cover aspect-video"
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
