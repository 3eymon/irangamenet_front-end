// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Image } from "@nextui-org/image";

function MainSlider({ cards, title }) {
  return (
    <div className="  relative">
      <h3 className="pr-5">{title}</h3>
      <div className="pt-5">
        <Slides cards={cards} />
      </div>
    </div>
  );
}
function Slides({ cards }) {
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
  const breakPoints = {
    450: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  };
  const navigation = {
    disabledClass: "opacity-0 unvisible",
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  };
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      breakpoints={breakPoints}
      navigation={navigation}
      pagination={pagination}
      modules={[Pagination, Navigation, Autoplay]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      className="mySwiper px-3"
    >
      {cards.map((card) => (
        <SwiperSlide key={card.id}>
          <div className="felx flex-col bg-white/10 backdrop-blur-lg rounded-lg p-3 ">
            <a href="#">
              <Image
                isBlurred
                className="rounded-md h-52 aspect-video object-cover mx-auto"
                loading="lazy"
                alt={card.title}
                src={card.image}
              />
            </a>
            <div className="flex flex-col gap-3 pt-2 ">
              <a href="#" className="text-sm line-clamp-1">
                {card.title}
              </a>
              <div className="flex justify-between text-[11px] text-gray-200 ">
                <span className="flex items-center gap-1">
                  {card.view}
                  <EyeIcon className="w-4 h-4" />
                </span>
                <div className="flex items-center gap-1">
                  {card.creatorName}
                  <img
                    loading="lazy"
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
      <SwiperSlide className="h-full my-auto">
        <div className="flex flex-col gap-3">
          <p className="lg:px-10 px-5 text-sm leading-relaxed text-gray-200 text-center">
            بهترین سازنده های بازی از نظر کاربران در ایران گیم نت :)
          </p>
          <button className="text-xs flex items-center px-7 py-1 transition-transform ease-linear rounded-md border-[1.9px] border-[#7b38c7] hover:scale-95 mx-auto">
            مشاهده بیشتر
            <span>
              <ChevronLeftIcon className="w-3 h-3" />
            </span>
          </button>
        </div>
      </SwiperSlide>
      <div className="relative flex items-center mt-4 justify-center gap-2">
        <ChevronRightIcon className="swiper-button-prev w-4 h-4 transition-opacity ease-linear stroke-2" />
        <div className="relative swiper-pagination flex justify-center gap-1 "></div>
        <ChevronLeftIcon className="swiper-button-next w-4 h-4 transition-opacity ease-linear stroke-2" />
      </div>
    </Swiper>
  );
}
export default MainSlider;
