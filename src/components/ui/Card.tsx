import { Link } from "react-router-dom";
import {
  BookmarkIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/16/solid";
import ReactTimeAgo from "react-time-ago";
import { sliderCardsType } from "../../types/card.types";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import Image from "./Image";
import { Game } from "../../services/games/queries";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { Ref } from "react";
import { News } from "../../services/news/queries";
import { extractAuthorName } from "../../utils/extractAuthorName";
import { UserCircleIcon } from "@heroicons/react/24/outline";
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
              // loading="lazy"
              src={data.cover_path}
              className="w-full h-60 object-cover rounded-xl hover:brightness-[.8] transition-all ease-linear bg-gray-400"
              alt={`${data ?? "خبر"} ${data.title}`}
            />
          </Link>
          <div className="flex absolute left-2 -bottom-2  gap-5">
            <button
              // onClick={}
              title={String(data.likes ?? "")}
              className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-red-500 transition-all ease-linear"
            >
              <HeartIcon
                className={`w-5 h-5 group-hover:fill-red-400/30 transition-all ease-linear `}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-3">
          <div className="flex justify-between gap-2 items-center text-sm pr-1">
            <div className="inline-flex gap-1 items-center">
              {data.author?.avatar_path ? (
                <img
                  loading="lazy"
                  src={data.author?.avatar_path}
                  className="w-7 h-7 rounded-full object-cover"
                  alt={`${extractAuthorName(data)} سازنده `}
                />
              ) : (
                <UserCircleIcon className="size-6 text-white stroke-[1px]" />
              )}

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
          <h2 className="text-lg font-PeydaMed w-11/12 ">
            <Link to={`/news/${data.slug}`}>{data.title}</Link>
          </h2>
          <p className="text-gray-300 text-xs line-clamp-3">{data.excerpt}</p>
          <div className="pt-2">
            <div
              className="text-gray-400 inline-flex items-center text-xs gap-1 justify-between w-full"
              dir="ltr"
            >
              <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                {data.categories.slice(0, 2).map((category) => (
                  <Link
                    key={category.slug}
                    to={`/news/category/${category.slug}`}
                    className="text-[11px] text-red-500 hover:text-red-600 rounded-md px-2 py-1 whitespace-nowrap transition-colors"
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
                    className="text-[12px] text-red-500 bg-red-500/5 border border-red-500/10 rounded-full px-2 py-1 whitespace-nowrap cursor-help"
                  >
                    +{data.categories.length - 2}
                  </span>
                )}
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-gray-300">
                <EyeIcon className="h-4 w-4 shrink-0" />

                <span className="inline-flex items-center gap-1">
                  <span>بازدید</span>
                  <span dir="ltr" className="tabular-nums">
                    {formatCompactNumber(Number(data.views))}
                  </span>
                </span>
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
              className="w-full h-60 object-cover rounded-xl hover:brightness-[.8] transition-all ease-linear bg-gray-400"
              alt={data.title}
            />
          </Link>
          <div className="flex absolute left-2 -bottom-2  gap-5">
            <button
              // onClick={}
              title={String(data.likes ?? "")}
              className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-red-500 transition-all ease-linear"
            >
              <HeartIcon
                className={`w-5 h-5 group-hover:fill-red-400/30 transition-all ease-linear `}
              />
            </button>
            <button
              title={String(data.saves ?? "")}
              className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-gray-400 transition-all ease-linear"
            >
              <BookmarkIcon className="w-5 h-5 group-hover:fill-gray-400/30 transition-all ease-linear" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-3">
          <div className="flex justify-between gap-2 items-center text-sm pr-1">
            <Link
              to={`/producers/${data.producer?.slug}`}
              className="inline-flex gap-1 items-center"
            >
              {data.producer?.logo_path ? (
                <img
                  loading="lazy"
                  src={data.producer.logo_path}
                  className="w-7 h-7 rounded-full object-cover"
                  alt={`${data.producer?.name} سازنده `}
                />
              ) : (
                <BuildingOffice2Icon className="size-7 text-white/80 p-1 border rounded-full border-zinc-500" />
              )}

              <p className="hover:underline">{data.producer?.name}</p>
            </Link>
            {data.created_at && (
              <div className="text-gray-400 inline-flex gap-2">
                <ReactTimeAgo
                  date={new Date(data.created_at)}
                  locale="fa-IR"
                  timeStyle="round"
                />
                <ClockIcon className="w-4 text-gray-500" />
              </div>
            )}
          </div>
          <h2 className="text-lg font-PeydaMed w-11/12 ">
            <Link to={`/games/${data.id}`}>{data.title}</Link>
          </h2>
          <p className="text-gray-300 text-xs line-clamp-3">
            {data.description}
          </p>
          <div className="pt-3 flex flex-row-reverse items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
              {data.categories.slice(0, 2).map((category) => (
                <Link
                  key={category.slug}
                  to={`/games/category/${category.slug}`}
                  className="text-[11px] text-red-500 hover:text-red-600 rounded-md px-2 py-1 whitespace-nowrap transition-colors"
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
                  className="text-[12px] text-red-500 bg-red-500/5 border border-red-500/10 rounded-full px-2 py-1 whitespace-nowrap cursor-help"
                >
                  +{data.categories.length - 2}
                </span>
              )}
            </div>

            <div className="inline-flex items-center gap-1.5 text-sm text-gray-300 shrink-0">
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
