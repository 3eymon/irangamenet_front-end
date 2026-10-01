import { useParams } from "react-router-dom";
import useServer from "../../hook/useServer";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Rating } from "@mui/material";

function SingleGameNets() {
  const { id } = useParams();
  const [gameNet, isLoading] = useServer(`GameNets/${id}`);
  console.log(gameNet);
  function nFormatter(num) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);
    return item
      ? (num / item.value).toFixed(1).replace(regexp, "").concat(item.symbol)
      : "0";
  }
  if (isLoading) return <p>loader</p>;
  return (
    <div className="w-full flex gap-7 flex-col  px-5 mt-6 ">
      <HeaderSection nFormatter={nFormatter} gameNet={gameNet} />
    </div>
  );
}

function HeaderSection({ gameNet, nFormatter }) {
  console.log(gameNet.details?.completeExplanations.amenities);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-7">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-2xl font-PeydaMed">
            {gameNet.title} <br />{" "}
            <span className="text-xs inline-flex gap-1">
              <MapPinIcon className="w-4" />{" "}
              {gameNet.details?.location.main.desc}{" "}
            </span>
          </h1>
          <div className="flex items-center gap-3">
            <div
              dir="ltr"
              data-tooltip-id="my-tooltip"
              className="px-3 pt-1 rounded-md flex flex-col items-center gap-1"
            >
              <Rating
                name="half-rating-read"
                defaultValue={+gameNet.rating}
                precision={0.1}
                size="small"
                readOnly
              />
              <p className="text-sm inline-flex gap-1 items-center">
                <span>بازدید</span> {nFormatter(gameNet.views)}
              </p>
            </div>
            <div
              dir="ltr"
              data-tooltip-id="my-tooltip"
              className={`px-3 pt-1 rounded-md font-Peyda ${
                gameNet.rating > 4
                  ? "bg-green-400/50"
                  : gameNet.rating > 3
                  ? "bg-lime-400/50"
                  : gameNet.rating > 2
                  ? "bg-yellow-500/60"
                  : gameNet.rating > 1
                  ? "bg-orange-400/50"
                  : "bg-red-400/50"
              }`}
            >
              {`${gameNet.rating} نمره `}
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="py-4 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
            <div className="col-span-2 sm:col-span-1 md:col-span-2  h-auto md:h-full flex flex-col">
              <a
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
              >
                <img
                  src={gameNet.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 ">
              <a
                href=""
                className="group relative hidden lg:flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4 "
              >
                <img
                  src={gameNet.details?.images[1]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </a>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                <a
                  href=""
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                >
                  <img
                    src={gameNet.details?.images[2]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </a>
                <a
                  href=""
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                >
                  <img
                    src={gameNet.details?.images[3]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </a>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-1  h-auto md:h-full flex flex-col">
              <a
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
              >
                <img
                  src={gameNet.details?.images[4]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out "
                />
                {gameNet.details?.images.length > 4 ? (
                  <>
                    {" "}
                    <div className="absolute inset-0 bg-black/65 z-10"></div>
                    <h3 className="z-10 text-2xl font-PeydaBlack text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xs:text-xl lg:text-3xl inline-block text-center">
                      {gameNet.details?.images.length} +
                      <p className="text-base">عکس</p>
                    </h3>
                  </>
                ) : (
                  ""
                )}
              </a>
            </div>
          </div>
        </div>
      </section>
      <AmenitiesLocationSection
        completeExplanations={gameNet.details?.completeExplanations}
      />
    </div>
  );
}
function AmenitiesLocationSection({ completeExplanations }) {
  return (
    <section className="flex w-full justify-between">
      <div>
        <h2 className="text-xl font-PeydaMed ">امکانات</h2>
        <div>
          {completeExplanations?.amenities.map((a, i) => (
            <div key={i}>{a.icon}s</div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-PeydaMed  ">آدرس</h2>
      </div>
    </section>
  );
}
export default SingleGameNets;
