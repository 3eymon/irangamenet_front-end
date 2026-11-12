import { useMemo } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import SeeAll from "../../../components/SeeAll";
import { Tables } from "../../../types/database.types";
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
function ProducerSkeleton() {
  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="md:w-13 md:h-13 h-11 w-11 shrink-0 animate-pulse rounded-full bg-neutral-800" />

        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 animate-pulse rounded-sm bg-neutral-800" />
          <div className="h-2 w-12 animate-pulse rounded-sm bg-neutral-800/70" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-2.5 w-16 animate-pulse rounded-sm bg-neutral-800/80" />
        <div className="h-2.5 w-20 animate-pulse rounded-sm bg-neutral-800/80" />
      </div>

      <div className="hidden flex-col gap-1.5 sm:flex">
        <div className="h-4 w-12 animate-pulse rounded bg-neutral-800" />
        <div className="h-4 w-12 animate-pulse rounded bg-neutral-800" />
      </div>
    </div>
  );
}

function ProducerCard({ producer }: { producer: any }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
      <div className="flex min-w-0 items-center gap-2.5">
        <Link to="#" className="shrink-0">
          {producer.icon ? (
            <img
              src={producer.icon}
              loading="lazy"
              className="md:w-13 md:h-13 h-11 w-11 rounded-full bg-white object-contain p-0.5 shadow-sm shadow-black/20 ring-[3px] ring-primary-500/15"
              alt={producer.name || ""}
            />
          ) : (
            <BuildingOffice2Icon className="md:w-13 md:h-13 h-11 w-11 rounded-full border border-gray-600/80 bg-white/5 p-2.5 text-gray-400" />
          )}
        </Link>

        <div className="min-w-0">
          <Link
            to="#"
            className="block truncate text-xs font-medium underline-offset-2 hover:underline"
          >
            {producer.name || "نامشخص"}
          </Link>
          <p className="mt-0.5 text-[11px] text-gray-400">
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

      <div className="hidden flex-col gap-1 sm:flex">
        <div className="rounded bg-green-700/90 px-2 py-0.5 text-[9px] leading-none">
          0.555%
        </div>
        <div className="rounded bg-red-700/90 px-2 py-0.5 text-[9px] leading-none">
          0.555%
        </div>
      </div>
    </div>
  );
}

function BestProducers({
  data = [],
  isLoading,
}: {
  data?: Tables<"producers">[];
  isLoading: boolean;
}) {
  const rows = useMemo(() => buildRows(data ?? []), [data]);
  if (isLoading)
    return (
      <div className={"relative"}>
        <div className="mx-auto mb-16 h-6 w-52 animate-pulse rounded-sm bg-neutral-800 md:mx-0 md:mb-20" />

        <div className="mt-4 flex flex-col items-center gap-5 px-3 sm:px-6 lg:px-16 xl:px-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex w-full flex-wrap justify-center gap-x-8 gap-y-5 border-t border-gray-600/60 pt-5 first:border-t-0 first:pt-0 sm:gap-x-12 md:gap-x-16"
            >
              {Array.from({ length: i === 3 ? 1 : 2 }).map((_, j) => (
                <ProducerSkeleton key={j} />
              ))}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-7 h-7 w-36 animate-pulse rounded-md bg-neutral-800" />
      </div>
    );
  return (
    <div className="relative">
      <SeeAll
        title="برترین استودیو های گیم"
        className="mb-16 md:mb-20"
        color="#FFF"
      />
      <div className="absolute right-10 top-10 flex rotate-45 scale-x-[-1] justify-end md:right-20">
        <svg
          viewBox="0 0 39 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-6 text-white md:w-8 lg:w-10"
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

      <div className="mt-4 flex flex-col items-center gap-5 px-3 sm:px-6 lg:px-16 xl:px-20">
        {rows[0]?.length === 0 && (
          <p className="py-10 text-sm text-gray-400">
            فعلاً استودیویی برای نمایش وجود ندارد
          </p>
        )}

        {rows.map((row, i) => (
          <div
            key={i}
            className="flex w-full flex-wrap justify-center gap-x-8 gap-y-5 border-t border-gray-600/60 pt-5 first:border-t-0 first:pt-0 sm:gap-x-12 md:gap-x-16"
          >
            {row.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
        ))}
      </div>

      {data && data?.length > 0 && (
        <button className="mx-auto mt-7 flex items-center gap-1 rounded-md bg-gradient-to-r from-primary to-secondary px-6 py-1.5 text-xs font-thin shadow-primary/30 transition-opacity hover:opacity-85">
          مشاهده ی همه ی سازنده ها
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default BestProducers;
