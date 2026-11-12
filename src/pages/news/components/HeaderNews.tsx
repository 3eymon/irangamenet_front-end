import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import { Keyboard, Navigation } from "swiper/modules";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

import ReactTimeAgo from "react-time-ago";
import EmptyState from "../../../components/EmptyState";
import Image from "../../../components/ui/Image";
import { cn } from "../../../utils/cn";
import { News } from "../../../services/news/queries";
import { extractAuthorName } from "../../../utils/extractAuthorName";

function FeaturedNewsSection({
  data,
  isLoading,
}: {
  data: {
    featured: News[];
    secondary: News[];
  };
  isLoading: boolean;
}) {
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-1 ">
        <div
          className={cn(
            "relative lg:h-auto lg:w-2/3 w-11/12  mx-auto h-1/2 lg:pr-5 xl:pr-20",
          )}
        >
          <Image
            src="/images/news/homePage.jpg"
            className="w-full h-full object-cover rounded-xl animate-fade scale-x-[-1] hidden sm:block"
            alt=""
          />
          <div className="bg-white/40  backdrop-blur w-full  sm:w-72 sm:max-h-60 md:max-h-80 lg:w-96 lg:h-[25rem] sm:absolute sm:top-20 sm:right-8 rounded flex  text-black animate__animated  animate__bounceInDown animate-delay-100 ">
            <Swiper
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              keyboard={true}
              modules={[Navigation, Keyboard]}
              className="mySwiper relative"
            >
              {data.featured.map((n) => (
                <SwiperSlide key={n.id} className="p-5">
                  <CardSlider data={n} />
                </SwiperSlide>
              ))}

              <div className={data.featured.length <= 1 ? "opacity-25" : ""}>
                <ChevronRightIcon className="prev z-50 absolute bottom-5 left-16 w-6 cursor-pointer text-[#a257f8] bg-white p-1 rounded-full" />
                <ChevronLeftIcon className="next z-50 absolute bottom-5 left-9 w-6 cursor-pointer text-[#a257f8] bg-white p-1 rounded-full" />
              </div>
            </Swiper>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 p-5">
          {data.secondary.length > 0 ? (
            data.secondary.map((n) => <PopularCard key={n.id} data={n} />)
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </>
  );
}
function CardSlider({ data }: { data: News }) {
  return (
    <div className="flex flex-col justify-between h-full text-xs lg:text-base">
      <div>
        <div className="flex items-center gap-2">
          <Image
            src={data?.author.avatar_path || ""}
            className="rounded-full"
            alt=""
          />
          <p className="text-black flex">
            {extractAuthorName(data)}
            <span className="text-gray-700q pr-1"> • 1 ماه پیش</span>
          </p>
        </div>
        <Link
          to={`/news/${data.slug}`}
          className=" hover:underline transition-all ease-linear line-clamp-4 font-Peyda text-xl lg:text-2xl"
        >
          {data.title}
        </Link>
        <div className="flex animate-fade">
          <p className="text-gray-700 text-sm line-clamp-5 sm:line-clamp-3 lg:line-clamp-5 pt-3">
            {data.excerpt || "توضیحات خبر ....."}
          </p>
        </div>
      </div>
      <div>
        <div className="text-xs inline-flex items-center gap-1 mt-4">
          <PencilIcon className="w-3" />
          {new Date(data.published_at || data.created_at).toLocaleDateString(
            "fa-IR",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            },
          )}
        </div>
      </div>
    </div>
  );
}

export function PopularCard({ data }: { data: News }) {
  const publishedAt = data.published_at ?? data.created_at ?? "";
  return (
    <div className="flex gap-2 hover:bg-white/5 backdrop-blur p-2 rounded-lg transition-colors ease-in-out animate-fade animate-duration-1000">
      <Link to={`/news/${data.slug}`} className="w-2/6 h-24 xl:h-28">
        <Image
          src={data.cover_path}
          className="w-full h-full object-cover rounded-lg "
          alt={` عکس/ خبر ${data.title}`}
        />
      </Link>x
      <div className="flex flex-col justify-around gap-2 w-3/4">
        <div className="flex gap-3 items-center text-xs xl:text-sm">
          <p className="text-white line-clamp-1"> {extractAuthorName(data)} </p>
          <div className="text-gray-400  inline-flex gap-1">
            <ClockIcon className="w-3.5" />
            <ReactTimeAgo
              date={new Date(publishedAt)}
              locale="fa-IR"
              timeStyle="round"
            />
          </div>
        </div>
        <div>
          <Link
            to={String(data.slug)}
            className="line-clamp-2 hover:underline underline-offset-4"
          >
            {data.title}
          </Link>
        </div>
        <div>
          <p className="text-gray-300 text-xs xl:text-sm">
            {data.categories.map((category) => (
              <Link
                to={`/news/category/${category.slug}`}
                className="text-red-500 pl-2 hover:underline "
              >
                {category.title}
              </Link>
            ))}
            {data.views.toLocaleString()} نفر خوندن
          </p>
        </div>
      </div>
    </div>
  );
}
function PopularCardLoader() {
  return (
    <div className="flex  gap-2 backdrop-blur p-2 rounded-lg">
      <div className="xl:w-56 w-44 h-28">
        <div className="w-full h-full object-cover rounded-lg bg-neutral-900/70 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <span className="text-red-500 w-7 h-4 bg-neutral-800/70 rounded animate-pulse"></span>
          <p className="text-white w-12 h-4 bg-neutral-800/70 rounded animate-pulse">
            {" "}
          </p>
          <span className="text-gray-400 text-sm w-16 h-4 rounded bg-neutral-800/70 animate-pulse"></span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-gray-400 bg-neutral-800/70 animate-pulse h-3 overflow-hidden rounded">
          </div>
          <div className="text-gray-400 bg-neutral-800/70 animate-pulse h-3 overflow-hidden rounded">
          </div>
        </div>
        <div>
          <div className="text-gray-300 text-sm flex items-center gap-3">
            <p className="text-red-500 pl-2 hover:underline w-7 h-3 bg-neutral-800/70 animate-pulse rounded"></p>
            <p className="w-16 h-3 bg-neutral-800/70 rounded animate-pulse"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex gap-1 cursor-progress flex-col lg:flex-row">
      <div className="relative w-full h-56 lg:h-auto lg:w-2/3 pr-5 xl:pr-20">
        <div className="w-full h-full object-cover rounded-xl  bg-neutral-800/70 animate-pulse"></div>
      </div>
      <div className="flex-1 flex flex-col gap-5 p-5">
        <PopularCardLoader />
        <PopularCardLoader />
        <PopularCardLoader />
        <PopularCardLoader />
      </div>
    </div>
  );
}
export default FeaturedNewsSection;
