import { Link, useSearchParams } from "react-router-dom";
import useGames from "../../hook/useGames";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useStoreContext } from "./context/StoreProvider";
import LazyLoad from "react-lazyload";

function Prodocts() {
  const [searchParams] = useSearchParams();
  const { price } = useStoreContext();
  const dolarPrice = 50_000;
  let games = useGames();
  let deduped = [];
  const filterPlatform = () => {
    // platform filter
    if (searchParams.get("platform")) {
      const searchp = searchParams.get("platform").split(",");
      //
      let searchFilter = [];
      searchp.map((f) => {
        games.map((g) => {
          g.platform.map((gp) => {
            if (gp.toLowerCase() === f.toLowerCase()) {
              searchFilter = [...searchFilter, g];
            }
          });
        });
      });
      //
      deduped = searchFilter.filter(function (el, i, arr) {
        return arr.indexOf(el) === i;
      });
      games = deduped;
    }
    // category filter
    if (searchParams.get("categ")) {
      const searchc = searchParams.get("categ").split(",");
      //
      let searchFilter = [];
      searchc.map((f) => {
        games.map((g) => {
          if (g.category === f) {
            searchFilter = [...searchFilter, g];
          }
        });
      });
      //
      deduped = searchFilter.filter(function (el, i, arr) {
        return arr.indexOf(el) === i;
      });
      games = deduped;
    }
  };
  filterPlatform();
  games = games
    .map((g) => {
      if (
        +g.price * dolarPrice >= price[0] &&
        +g.price * dolarPrice <= price[1]
      ) {
        return g;
      }
    })
    .filter((element) => {
      return element !== undefined;
    });
  return games.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
      {games.map((g) => (
        <div
          className="card w-full sm:w-72  bg-white/5 backdrop-blur shadow-xl"
          key={g.id}
        >
          <figure className="relative p-3">
            <Link to={g.link} className="w-full h-44">
              <LazyLoad  className="h-full">
                <img
                  src={g.image_preview}
                  alt="Shoes"
                  className=" object-cover w-full h-full rounded-2xl"
                />
              </LazyLoad>
            </Link>
            <div className="flex absolute left-5 bottom-0  gap-5">
              <button
                title={String(g.like ?? "")}
                className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-red-500 transition-all ease-linear"
              >
                <HeartIcon className="w-5 h-5 group-hover:fill-red-400/30 transition-all ease-linear" />
              </button>
              <button
                title={String(g.save ?? "")}
                className="group bg-[#2b3748] shadow-2xl p-1.5 rounded-full text-gray-400 transition-all ease-linear"
              >
                <BookmarkIcon className="w-5 h-5 group-hover:fill-gray-400/30 transition-all ease-linear" />
              </button>
            </div>
          </figure>
          <div className="card-body px-4 py-2 gap-5">
            <div className="flex justify-between pl-4">
              <h2 className="card-title">{g.subTitle}</h2>
            </div>
            <p className="text-gray-400 line-clamp-1 text-sm">{g.desc}</p>
            <div className="card-actions  flex items-center flex-nowrap justify-between text-[#9f9af5]">
              <Link
                to={g.link}
                className="btn  bg-[#5850f57c] hover:bg-[#473fce7c]  text-white  rounded-full py-0 px-5 min-h-9 h-9 w-36 border-none font-normal font-Peyda"
              >
                ادامه مطلب
              </Link>
              <p className="text-center -pl-2 pt-1 text-lg font-bold">
                {+g.price === 0 ? "رایگان" : g.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p> چیزی پیدا نشد </p>
  );
}

export default Prodocts;
