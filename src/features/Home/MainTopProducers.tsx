import { ChevronLeftIcon } from "@heroicons/react/16/solid";

function MainTopProducers({ producers }) {
  return (
    <div className=" relative">
      <h3 className="pr-5">برترین استودیو های گیم</h3>
      <img
        loading="lazy"
        className=" md:absolute py-4 md:py-0 right-[10%] top-12 w-20 2xl:w-24 rotate-90 invert"
        src="images/icon/boost-3-0-offical-skyrocket-arrow_140x.webp"
        alt="Best Game Makers In Iran Game Net"
      ></img>
      <div className="flex felx-col flex-wrap gap-12 px-5 lg:px-44 justify-center divide-y-2 divide-gray-600">
        {producers.map((producer) => (
          <div
            key={producer.id}
            className={`flex gap-10  pt-5 items-center ${
              producer.id < 3 ? "xl:border-none" : ""
            }`}
          >
            <div className="flex gap-2 ">
              <a href="">
                <img
                  src={producer.icon}
                  className={`w-10 h-10 rounded-full ${
                    producer.id == 5 ? "invert" : ""
                  }`}
                  alt=""
                />
              </a>
              <div>
                <a
                  href="#"
                  className="text-xs pb-2 hover:underline  underline-offset-2"
                >
                  {producer.name}
                </a>
                <p className="text-[11px] text-gray-400">{producer.Founded}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] pb-2">
                <span className="text-gray-200">کارکنان</span>&nbsp; : &nbsp;{" "}
                {producer.employees}
              </p>
              <p className="text-[10px] tracking-widest">
                <span className="text-gray-200">درامد</span>&nbsp; : &nbsp;{" "}
                {producer.Revenue}
              </p>
            </div>
            <div>
              <div className="text-[9px] px-2 py-1 rounded-md bg-green-700 mb-1">
                0.555%
              </div>
              <div className="text-[9px] px-2 py-1 rounded-md bg-red-700">
                0.555%
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="text-xs flex hover:opacity-80 items-center mx-auto mt-5 font-thin bg-gradient-to-r from-[#3b35b2] to-[#733cb3] px-6 py-1.5 transition-opacity ease-linear rounded-md shadow-[#733cb39c_0px_0px_5px]">
        مشاهده همه ی سازنده ها
        <span>
          <ChevronLeftIcon className="w-4 h-4" />
        </span>
      </button>
    </div>
  );
}

export default MainTopProducers;
