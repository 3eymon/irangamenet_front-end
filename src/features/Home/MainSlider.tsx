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
        {/* <Slides cards={cards} /> */}
      </div>
    </div>
  );
}
export default MainSlider;
