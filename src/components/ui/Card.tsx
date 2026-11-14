import { Link } from "react-router-dom";

import ReactTimeAgo from "react-time-ago";
import { sliderCardsType } from "../../types/card.types";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import Image from "./Image";
import { Game } from "../../services/games/queries";
import {
  BookmarkIcon,
  BuildingOffice2Icon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Ref } from "react";
import { News } from "../../services/news/queries";
import { extractAuthorName } from "../../utils/extractAuthorName";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/solid";
type CardProps = {
  ref?: Ref<HTMLDivElement>;
} & (
  | {
      type: sliderCardsType.News;
      data: News;
    }
  | {
      type: sliderCardsType.Games;
      data: Game;
    }
);

export default function Card({ data, type, ref }: CardProps) {
  if (type === sliderCardsType.News) {
    const publishedDate = data.published_at ?? data.created_at;
    return (
      <div className="w-full px-5 md:px-0" ref={ref}>
        <div className="relative">
          <Link to={`/news/${data.slug}`}>
            <Image
              src={data.cover_path}
              className="h-60 w-full rounded-xl bg-gray-400 object-cover transition-all ease-linear hover:brightness-[.8]"
              alt={`${data ?? "خبر"} ${data.title}`}
            />
          </Link>
          <div className="absolute -bottom-2 left-2 flex gap-5">
            <button
              // onClick={}
              title={String(data.likes ?? "")}
              className="group rounded-full bg-[#2b3748] p-1.5 text-red-500 shadow-2xl transition-all ease-linear"
            >
              <HeartIcon
                className={`h-5 w-5 transition-all ease-linear group-hover:fill-red-400/30`}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-3">
          <div className="flex items-center justify-between gap-2 pr-1 text-sm">
            <div className="inline-flex items-center gap-1">
              <Image
                src={data.author?.avatar_path}
                className="h-7 w-7 rounded-full object-cover"
                alt={`${extractAuthorName(data)} نویسنده خبر `}
              />
              <p>{extractAuthorName(data)}</p>
            </div>
            {publishedDate && (
              <div className="inline-flex items-center gap-2 text-gray-400">
                <ReactTimeAgo
                  date={new Date(publishedDate)}
                  locale="fa-IR"
                  timeStyle="round"
                />
                <ClockIcon className="w-4 text-gray-500" />
              </div>
            )}
          </div>
          <h2 className="w-11/12 font-PeydaMed text-lg">
            <Link to={`/news/${data.slug}`}>{data.title}</Link>
          </h2>
          <p className="line-clamp-3 text-xs text-gray-300">{data.excerpt}</p>
          <div className="pt-2">
            <div
              className="inline-flex w-full items-center justify-between gap-1 text-xs text-gray-400"
              dir="ltr"
            >
              <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
                {data.categories.slice(0, 2).map((category) => (
                  <Link
                    key={category.slug}
                    to={`/news/category/${category.slug}`}
                    className="whitespace-nowrap rounded-md px-2 py-1 text-[11px] text-red-500 transition-colors hover:text-red-600"
                  >
                    {category.title}
                  </Link>
                ))}

                {data.categories.length > 2 && (
                  <span
                    title={data.categories
                      .slice(2)
                      .map((item) => item.title)
                      .join("، ")}
                    className="cursor-help whitespace-nowrap rounded-full border border-red-500/10 bg-red-500/5 px-2 py-1 text-[12px] text-red-500"
                  >
                    +{data.categories.length - 2}
                  </span>
                )}
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-gray-300">
                <EyeIcon className="h-4 w-4 shrink-0" />

                <span dir="ltr" className="font-medium tabular-nums">
                  {formatCompactNumber(Number(data.views))}
                </span>

                <span className="text-gray-400">بازدید</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === sliderCardsType.Games) {
    return (
      <div className="w-full px-5 md:px-0" ref={ref}>
        <div className="relative">
          <Link to={`/games/${data.id}`}>
            <Image
              src={data.cover_path}
              className="h-60 w-full rounded-xl bg-gray-400 object-cover transition-all ease-linear hover:brightness-[.8]"
              alt={data.title}
            />
          </Link>
          <div className="absolute -bottom-2 left-2 flex gap-5">
            <button
              // onClick={}
              title={String(data.likes ?? "")}
              className="group rounded-full bg-[#2b3748] p-1.5 text-red-500 shadow-2xl transition-all ease-linear"
            >
              <HeartIcon
                className={`h-5 w-5 transition-all ease-linear group-hover:fill-red-400/30`}
              />
            </button>
            <button
              title={String(data.saves ?? "")}
              className="group rounded-full bg-[#2b3748] p-1.5 text-gray-400 shadow-2xl transition-all ease-linear"
            >
              <BookmarkIcon className="h-5 w-5 transition-all ease-linear group-hover:fill-gray-400/30" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-3">
          <div className="flex items-center justify-between gap-2 pr-1 text-sm">
            <Link
              to={`/producers/${data.producer?.slug}`}
              className="inline-flex items-center gap-1"
            >
              {data.producer?.logo_path ? (
                <img
                  loading="lazy"
                  src={data.producer.logo_path}
                  className="h-7 w-7 rounded-full object-cover"
                  alt={`${data.producer?.name} سازنده `}
                />
              ) : (
                <BuildingOffice2Icon className="size-7 rounded-full border border-zinc-500 p-1 text-white/80" />
              )}

              <p className="hover:underline">{data.producer?.name}</p>
            </Link>
            {data.created_at && (
              <div className="inline-flex gap-2 text-gray-400">
                <ReactTimeAgo
                  date={new Date(data.created_at)}
                  locale="fa-IR"
                  timeStyle="round"
                />
                <ClockIcon className="w-4 text-gray-500" />
              </div>
            )}
          </div>
          <h2 className="w-11/12 font-PeydaMed text-lg">
            <Link to={`/games/${data.id}`}>{data.title}</Link>
          </h2>
          <p className="line-clamp-3 text-xs text-gray-300">
            {data.description}
          </p>
          <div className="flex w-full flex-row-reverse items-center justify-between gap-2 pt-3">
            <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
              {data.categories.slice(0, 2).map((category) => (
                <Link
                  key={category.slug}
                  to={`/games/category/${category.slug}`}
                  className="whitespace-nowrap rounded-md px-2 py-1 text-[11px] text-red-500 transition-colors hover:text-red-600"
                >
                  {category.title}
                </Link>
              ))}

              {data.categories.length > 2 && (
                <span
                  title={data.categories
                    .slice(2)
                    .map((item) => item.title)
                    .join("، ")}
                  className="cursor-help whitespace-nowrap rounded-full border border-red-500/10 bg-red-500/5 px-2 py-1 text-[12px] text-red-500"
                >
                  +{data.categories.length - 2}
                </span>
              )}
            </div>

            <div className="inline-flex shrink-0 items-center gap-1.5 text-sm text-gray-300">
              <EyeIcon className="h-4 w-4 text-gray-500" />

              <span className="inline-flex items-center gap-1">
                <span className="text-xs text-gray-400">بازدید</span>
                <span dir="ltr" className="tabular-nums">
                  {formatCompactNumber(Number(data.views))}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // if(type === sliderCardsType.GameCenters) {
  //   return (
  //     <div className="w-full px-5 md:px-0 md:w-[22rem]">
  //       <div className="relative">
  //         <Link to={`/news/${data.id}`}>
  //           <Image
  //             // loading="lazy"
  //             src={data.cover_path}
  //             className="w-full h-60 object-cover rounded-xl hover:brightness-[.8] transition-all ease-linear bg-gray-400"
  //             alt={`${data ?? "خبر"} ${data.title}`}
  //           />
  //         </Link>
  //         <div className="flex absolute left-2 -bottom-2  gap-5">
  //           <button
  //             // onClick={}
  //             title={String(data.likes ?? "")}
  //             className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-red-500 transition-all ease-linear"
  //           >
  //             <HeartIcon
  //               className={`w-5 h-5 group-hover:fill-red-400/30 transition-all ease-linear `}
  //             />
  //           </button>
  //           <button
  //             title={String(data.saves ?? "")}
  //             className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-gray-400 transition-all ease-linear"
  //           >
  //             <BookmarkIcon className="w-5 h-5 group-hover:fill-gray-400/30 transition-all ease-linear" />
  //           </button>
  //         </div>
  //       </div>
  //       <div className="flex flex-col gap-1 pt-3">
  //         {type !== sliderCardsType.GameCenters && (
  //           <div className="flex justify-between gap-2 items-center text-sm pr-1">
  //             <Link to="/" className="inline-flex gap-1 items-center">
  //               <img
  //                 loading="lazy"
  //                 src="/images/icon/header/Grand-Theft-Auto-San-Andreas.jpg"
  //                 className="w-7 h-7 rounded-full object-cover"
  //                 alt={`${author} سازنده ${category ?? "محتوا"}`}
  //               />
  //               <p className="hover:underline">{data.author}</p>
  //             </Link>
  //             {data.created_at && (
  //               <div className="text-gray-400 inline-flex gap-2">
  //                 <ReactTimeAgo
  //                   date={new Date(data.created_at)}
  //                   locale="fa-IR"
  //                   timeStyle="round"
  //                 />
  //                 <ClockIcon className="w-4 text-gray-500" />
  //               </div>
  //             )}
  //           </div>
  //         )}
  //         <h2 className="text-lg font-PeydaMed w-11/12 ">
  //           <Link to={detailPath}>{data.title}</Link>
  //         </h2>
  //         <p className="text-gray-300 text-xs line-clamp-3">
  //           {data.description}
  //         </p>
  //         <div className="pt-2">
  //           <div
  //             className="text-gray-400 inline-flex items-center text-xs gap-1 justify-between w-full"
  //             dir="ltr"
  //           >
  //             {type === sliderCardsType.GameCenters ? (
  //               <>
  //                 <Tooltip
  //                   id="my-tooltip"
  //                   style={{
  //                     backgroundColor: "rgb(43 55 72)",
  //                     borderRadius: "10px",
  //                     color: "#FFF",
  //                   }}
  //                 />
  //                 <div
  //                   data-tooltip-id="my-tooltip"
  //                   data-tooltip-content={String(data.rating ?? 0)}
  //                 >
  //                   <Rating
  //                     name="half-rating-read"
  //                     defaultValue={Number(data.rating ?? 0)}
  //                     precision={0.1}
  //                     size="small"
  //                     readOnly
  //                     sx={{
  //                       color: "#a855f7",
  //                       "& .MuiRating-iconEmpty": {
  //                         color: "rgba(255,255,255,.3)",
  //                       },
  //                     }}
  //                   />
  //                 </div>
  //               </>
  //             ) : (
  //               <Link to="/games" className="text-red-500 pl-2">
  //                 اکشن
  //               </Link>
  //             )}
  //             <div className="inline-flex items-center gap-1.5 text-sm text-gray-300">
  //               <EyeIcon className="h-4 w-4 shrink-0" />

  //               <span className="inline-flex items-center gap-1">
  //                 <span>بازدید</span>
  //                 <span dir="ltr" className="tabular-nums">
  //                   {formatCompactNumber(Number(data.views))}
  //                 </span>
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return "UNKNOWN";
}
