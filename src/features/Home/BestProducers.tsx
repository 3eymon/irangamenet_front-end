import React from "react";
import { useMemo } from "react";
import type { Producer } from "../../types/ producer.types";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
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
      {/* Icon + Name */}
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

      {/* Stats */}
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

      {/* Percent badges - hidden on very small screens */}
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

  return (
    <div className="relative">
      <h3 className="pr-5 mb-16 md:mb-20">برترین استودیو های گیم</h3>

      <img
        loading="lazy"
        className="md:absolute py-3 md:py-0 right-[8%] top-10 w-16 md:w-20 2xl:w-24 rotate-90 invert opacity-90"
        src="images/icon/boost-3-0-offical-skyrocket-arrow_140x.webp"
        alt="برترین استودیو های گیم"
      />

      <div className="flex flex-col items-center gap-5 px-3 sm:px-6 lg:px-16 xl:px-20 mt-4">
        {!isLoading && rows[0]?.length === 0 && (
          <p className="text-xs text-gray-400 py-10">
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

      <button className="text-xs flex items-center gap-1 mx-auto mt-7 font-thin bg-gradient-to-r from-primary to-secondary px-6 py-1.5 rounded-md shadow-primary/30 hover:opacity-85 transition-opacity">
        مشاهده ی همه ی سازنده ها
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

export default BestProducers;
