import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import useGames from "../../hook/useGames";

function Prodoct() {
  const games = useGames();
  const { id } = useParams();
  const game = games.find((g) => g.link === id);
  return (
    <div className="flex h-full my-24 gap-8 justify-center flex-col lg:flex-row items-center lg:items-stretch relative px-5">
      <div className="lg:w-[29rem] h-full bg-white/5 backdrop-blur p-5 rounded-sm">
        <img
          src={game.image_background}
          alt={game.subTitle + "-images"}
          className="w-full object-cover h-[18rem] sm:h-[28rem] rounded-sm"
        />
      </div>
      <div className="flex flex-col gap-4 lg:gap-2 lg:w-1/2 justify-around">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">2024,11,03</span>
          <div className="flex  gap-5">
            <button className=" text-red-500 text-sm flex gap-1 items-center bg-red-500/30 hover:bg-red-500/50 transition-colors ease-linear px-2 py-1 rounded">
              <p className="mt-1">{game.like}</p>
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className=" text-gray-500 text-sm flex gap-1 items-center bg-gray-500/30 hover:bg-gray-500/50 transition-colors ease-linear px-2 py-1 rounded">
              <p className="mt-1">{game.save}</p>
              <BookmarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-Peyda font-semibold">{game.subTitle}</h1>
        <p className="lg:w-9/12 text-gray-200">{game.desc}</p>
        <div className="flex gap-1 items-center ">
          <img
            src="/images/csgo.jpg"
            loading="lazy"
            alt=""
            className="w-9 h-9 object-cover  rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-[10px] 3xl:text-xs  text-slate-400">نویسنده</p>
            <a
              href="#"
              className="text-xs 3xl:text-sm text-slate-200 hover:underline"
            >
              علی احمدی
            </a>
          </div>
        </div>
        <ImagePlatform game={game} />
        <div className="flex justify-between w-full items-end">
          <div className="flex items-center gap-5 lg:gap-10">
            <button className="btn font-medium lg:px-10 bg-[#5850f57c] hover:bg-[#5850f598] text-white">
              دیدن بازی در استیم
            </button>
            <p className="text-sm font-PeydaBlack sm:text-lg pt-2"> {game.price} </p>
          </div>
          <div className="flex gap-3 items-end">
            <button className="px-4 py-2 bg-[#5850f57c] hover:bg-[#5850f598] rounded transition ease-linear">
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-[#1f1f24c5] text-gray-400 rounded">
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prodoct;

function ImagePlatform({ game }) {
  const img_platform = [
    "/images/Platform/windows-icon.svg",
    "/images/Platform/playstation.png",
    "/images/Platform/xbox.png",
    "/images/Platform/nintendo_switch.png",
  ];
  return (
    <div className="flex gap-5 items-center">
      {game.platform.map((p, index) => {
        switch (p.toLowerCase()) {
          case "pc": {
            return (
              <img
                key={index}
                src={img_platform[0]}
                className="w-5 h-5 invert"
                alt={p + "-platform  پلتفرم بازی"}
              />
            );
          }
          case "ps4": {
            return (
              <img
                key={index}
                src={img_platform[1]}
                className="w-5 h-5 invert"
                alt={p + "-platform  پلتفرم بازی"}
              />
            );
          }
          case "xboxseries": {
            return (
              <img
                key={index}
                src={img_platform[2]}
                className="w-5 h-5 invert"
                alt={p + "-platform  پلتفرم بازی"}
              />
            );
          }
          case "nintendoswitch": {
            return (
              <img
                key={index}
                src={img_platform[3]}
                className="w-5 h-5 invert"
                alt={p + "-platform  پلتفرم بازی"}
              />
            );
          }
          default:
            return;
        }
      })}
    </div>
  );
}
