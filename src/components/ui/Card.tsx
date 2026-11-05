import { Link } from "react-router-dom";
import {
  BookmarkIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/16/solid";
import ReactTimeAgo from "react-time-ago";
import { Tooltip } from "react-tooltip";
import { Rating } from "@mui/material";
import type { Game, GameCenter } from "../../types/game.types";
import type { News } from "../../types/news.types";
import { sliderCardsType } from "./SliderCards";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import Image from "./Image";

type CardData = Game | News | GameCenter;

export default function Card({
  data,
  type,
}: {
  data: CardData;
  type: sliderCardsType;
}) {
  const detailPath =
    type === sliderCardsType.GameCenters
      ? `/game-centers/${data.id}`
      : type === sliderCardsType.News
        ? `/news/${data.id}`
        : `/games/${data.id}`;
  const category = "category" in data ? data.category : "گیم نت";
  const author = data.author ?? "گیم نت";
  return (
    <div className="w-full px-5 md:px-0 md:w-[22rem]">
      <div className="relative">
        <Link to={detailPath}>
          <Image
            // loading="lazy"
            src={data.image}
            className="w-full h-60 object-cover rounded-xl hover:brightness-[.8] transition-all ease-linear bg-gray-400"
            alt={`${category ?? "بازی"} ${data.title}`}
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
        {type !== sliderCardsType.GameCenters && (
          <div className="flex justify-between gap-2 items-center text-sm pr-1">
            <Link to="/" className="inline-flex gap-1 items-center">
              <img
                loading="lazy"
                src="/images/icon/header/Grand-Theft-Auto-San-Andreas.jpg"
                className="w-7 h-7 rounded-full object-cover"
                alt={`${author} سازنده ${category ?? "محتوا"}`}
              />
              <p className="hover:underline">{data.author}</p>
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
        )}
        <h2 className="text-lg font-PeydaMed w-11/12 ">
          <Link to={detailPath}>{data.title}</Link>
        </h2>
        <p className="text-gray-300 text-xs line-clamp-3">{data.description}</p>
        <div className="pt-2">
          <div
            className="text-gray-400 inline-flex items-center text-xs gap-1 justify-between w-full"
            dir="ltr"
          >
            {type === sliderCardsType.GameCenters ? (
              <>
                <Tooltip
                  id="my-tooltip"
                  style={{
                    backgroundColor: "rgb(43 55 72)",
                    borderRadius: "10px",
                    color: "#FFF",
                  }}
                />
                <div
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={String(data.rating ?? 0)}
                >
                  <Rating
                    name="half-rating-read"
                    defaultValue={Number(data.rating ?? 0)}
                    precision={0.1}
                    size="small"
                    readOnly
                    sx={{
                      color: "#a855f7",
                      "& .MuiRating-iconEmpty": {
                        color: "rgba(255,255,255,.3)",
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              <Link to="/games" className="text-red-500 pl-2">
                اکشن
              </Link>
            )}
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
