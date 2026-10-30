import { useMemo } from "react";
import type { Producer } from "../../../types/ producer.types";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SeeAll from "../../../components/ui/SeeAll";
const LIMIT = 8;

function buildRows<T>(items: T[]): T[][] {
  const list = items.slice(0, LIMIT);
  if (list.length <= 1) return [list];
  const rows: T[][] = [[list[0]]];
  const rest = list.slice(1);
  const last = rest.length % 2 === 1 ? rest.pop() : undefined;
  for (let i = 0; i < rest.length; i += 2) rows.push(rest.slice(i, i + 2));
  if (last) rows.push([last]);
  return rows;
}

function ProducerCard({ producer }: { producer: any }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
      <div className="flex items-center gap-2.5 min-w-0">
        <Link to="#" className="shrink-0">
          {producer.icon ? (
            <img
              src={producer.icon}
              loading="lazy"
              className="w-11 h-11 md:w-13 md:h-13 rounded-full object-contain p-0.5 ring-[3px] ring-primary-500/15 bg-white shadow-sm shadow-black/20"
              alt={producer.name || ""}
            />
          ) : (
            <BuildingOffice2Icon className="w-11 h-11 md:w-13 md:h-13 p-2.5 rounded-full border border-gray-600/80 text-gray-400 bg-white/5" />
          )}
        </Link>

        <div className="min-w-0">
          <Link
            to="#"
            className="block text-xs font-medium truncate hover:underline underline-offset-2"
          >
            {producer.name || "نامشخص"}
          </Link>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {producer.Founded || "-"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[10px] text-gray-300">
        <p>
          <span className="text-gray-200">کارکنان</span>
          <span className="mx-1.5 text-gray-500">:</span>
          {producer.employees || "-"}
        </p>
        <p className="tracking-wide">
          <span className="text-gray-200">درامد</span>
          <span className="mx-1.5 text-gray-500">:</span>
          {producer.Revenue || "-"}
        </p>
      </div>

      <div className="hidden sm:flex flex-col gap-1">
        <div className="text-[9px] px-2 py-0.5 rounded bg-green-700/90 leading-none">
          0.555%
        </div>
        <div className="text-[9px] px-2 py-0.5 rounded bg-red-700/90 leading-none">
          0.555%
        </div>
      </div>
    </div>
  );
}

function BestProducers({
  data,
  isLoading,
}: {
  data: Producer[];
  isLoading: boolean;
}) {
  const rows = useMemo(() => buildRows(data ?? []), [data]);
  console.log(data);
  return (
    <div className="relative">
      <SeeAll
        title="برترین استودیو های گیم"
        className="mb-16 md:mb-20"
        color="#FFF"
      />
      <div className="flex justify-end absolute rotate-45 scale-x-[-1]  top-10 right-10 md:right-20">
        <svg
          viewBox="0 0 39 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 md:w-8 lg:w-10 block text-white"
        >
          <path
            d="M9.96 92.03c3.946 3.092 9.307 7.14 13.43 9.493m0 0c.474.271.204-3.913.177-4.109-.581-4.301-1.625-8.535-2.764-12.848m2.586 16.957C4.44 80.457-2.175 53.037 5.481 38.907c.758-1.4 1.586-2.924 2.55-4.313m0 0c1.537-2.213 3.422-4.087 5.935-4.59 2.318-.463 5.784.17 7.94 2.607 4.027 4.553 2.166 11.094-2.429 11.22-4.037.112-9.76-4.42-11.445-9.237Zm0 0a9.684 9.684 0 0 1-.1-.305C.23 9.709 19.54-1.921 36.868 3.657"
            stroke="currentColor"
            strokeWidth="3"
            strokeMiterlimit="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col items-center gap-5 px-3 sm:px-6 lg:px-16 xl:px-20 mt-4">
        {!isLoading && rows[0]?.length === 0 && (
          <p className="text-sm text-gray-400 py-10">
            فعلاً استودیویی برای نمایش وجود ندارد
          </p>
        )}

        {!isLoading &&
          rows.map((row, i) => (
            <div
              key={i}
              className="
                flex flex-wrap justify-center
                gap-x-8 gap-y-5 sm:gap-x-12 md:gap-x-16
                w-full
                pt-5 first:pt-0
                border-t border-gray-600/60 first:border-t-0
              "
            >
              {row.map((producer) => (
                <ProducerCard key={producer.id} producer={producer} />
              ))}
            </div>
          ))}
      </div>

      {data.length > 0 && (
        <button className="text-xs flex items-center gap-1 mx-auto mt-7 font-thin bg-gradient-to-r from-primary to-secondary px-6 py-1.5 rounded-md shadow-primary/30 hover:opacity-85 transition-opacity">
          مشاهده ی همه ی سازنده ها
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default BestProducers;
