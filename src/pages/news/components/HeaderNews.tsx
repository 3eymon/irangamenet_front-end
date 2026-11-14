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
      <div className="flex flex-col gap-1 lg:flex-row">
        <div
          className={cn(
            "relative mx-auto h-1/2 w-11/12 lg:h-auto lg:w-2/3 lg:pr-5 xl:pr-20",
          )}
        >
          <Image
            src="/images/news/homePage.jpg"
            className="hidden h-full w-full scale-x-[-1] animate-fade rounded-xl object-cover sm:block"
            alt=""
          />
          <div className="animate__animated animate__bounceInDown flex w-full rounded bg-white/40 text-black backdrop-blur animate-delay-100 sm:absolute sm:right-8 sm:top-20 sm:max-h-60 sm:w-72 md:max-h-80 lg:h-[25rem] lg:w-96">
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
                <ChevronRightIcon className="prev absolute bottom-5 left-16 z-50 w-6 cursor-pointer rounded-full bg-white p-1 text-[#a257f8]" />
                <ChevronLeftIcon className="next absolute bottom-5 left-9 z-50 w-6 cursor-pointer rounded-full bg-white p-1 text-[#a257f8]" />
              </div>
            </Swiper>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5">
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
    <div className="flex h-full flex-col justify-between text-xs lg:text-base">
      <div>
        <div className="flex items-center gap-2">
          <Image
            src={data?.author.avatar_path || ""}
            className="rounded-full"
            alt=""
          />
          <p className="flex text-black">
            {extractAuthorName(data)}
            <span className="text-gray-700q pr-1"> • 1 ماه پیش</span>
          </p>
        </div>
        <Link
          to={`/news/${data.slug}`}
          className="line-clamp-4 font-Peyda text-xl transition-all ease-linear hover:underline lg:text-2xl"
        >
          {data.title}
        </Link>
        <div className="flex animate-fade">
          <p className="line-clamp-5 pt-3 text-sm text-gray-700 sm:line-clamp-3 lg:line-clamp-5">
            {data.excerpt || "توضیحات خبر ....."}
          </p>
        </div>
      </div>
      <div>
        <div className="mt-4 inline-flex items-center gap-1 text-xs">
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
    <div className="flex animate-fade gap-2 rounded-lg p-2 backdrop-blur transition-colors ease-in-out animate-duration-1000 hover:bg-white/5">
      <Link to={`/news/${data.slug}`} className="h-24 w-2/6 xl:h-28">
        <Image
          src={data.cover_path}
          className="h-full w-full rounded-lg object-cover"
          alt={` عکس/ خبر ${data.title}`}
        />
      </Link>
      <div className="flex w-3/4 flex-col justify-around gap-2">
        <div className="flex items-center gap-3 text-xs xl:text-sm">
          <div className="flex items-center gap-1">
            <Image
              src={data.author?.avatar_path}
              className="h-7 w-7 rounded-full object-cover"
              alt={`${extractAuthorName(data)} نویسنده خبر `}
            />
            <p className="line-clamp-1 text-white">
              {" "}
              {extractAuthorName(data)}{" "}
            </p>
          </div>
          <div className="inline-flex gap-1 text-gray-400">
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
            className="line-clamp-2 underline-offset-4 hover:underline"
          >
            {data.title}
          </Link>
        </div>
        <div>
          <p className="text-xs text-gray-300 xl:text-sm">
            {data.categories.map((category) => (
              <Link
                to={`/news/category/${category.slug}`}
                className="pl-2 text-red-500 hover:underline"
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
    <div className="flex gap-2 rounded-lg p-2 backdrop-blur">
      <div className="h-28 w-44 xl:w-56">
        <div className="h-full w-full animate-pulse rounded-lg bg-neutral-900/70 object-cover"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="h-4 w-7 animate-pulse rounded bg-neutral-800/70 text-red-500"></span>
          <p className="h-4 w-12 animate-pulse rounded bg-neutral-800/70 text-white">
            {" "}
          </p>
          <span className="h-4 w-16 animate-pulse rounded bg-neutral-800/70 text-sm text-gray-400"></span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-3 animate-pulse overflow-hidden rounded bg-neutral-800/70 text-gray-400"></div>
          <div className="h-3 animate-pulse overflow-hidden rounded bg-neutral-800/70 text-gray-400"></div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <p className="h-3 w-7 animate-pulse rounded bg-neutral-800/70 pl-2 text-red-500 hover:underline"></p>
            <p className="h-3 w-16 animate-pulse rounded bg-neutral-800/70"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex cursor-progress flex-col gap-1 lg:flex-row">
      <div className="relative h-56 w-full pr-5 lg:h-auto lg:w-2/3 xl:pr-20">
        <div className="h-full w-full animate-pulse rounded-xl bg-neutral-800/70 object-cover"></div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <PopularCardLoader />
        <PopularCardLoader />
        <PopularCardLoader />
        <PopularCardLoader />
      </div>
    </div>
  );
}
export default FeaturedNewsSection;
