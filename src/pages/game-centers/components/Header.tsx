
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
  getAllProvinces,
  getCitiesByProvinceName,
} from "../../../";

import {
  ArrowLongLeftIcon,
  ArrowUturnRightIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import "./style.css";

type Destination = string[];

type FilterType =
  | "new"
  | "bestOfWeek"
  | "mostScore"
  | "bestByIGN";

interface HeaderProps {
  setFilter: (filter: FilterType) => void;
  destination: Destination;
  setDestination: Dispatch<SetStateAction<Destination>>;
}

interface SelectDestinationProps {
  destination: Destination;
  setDestination: Dispatch<SetStateAction<Destination>>;
}

interface FilterProps {
  setFilter: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: "جدیدترین ها", value: "new" },
  { label: "بهترین های هفته", value: "bestOfWeek" },
  { label: "بیشترین امتیاز", value: "mostScore" },
  { label: "برترین از نظر IGN", value: "bestByIGN" },
];

function Header({
  setFilter,
  destination,
  setDestination,
}: HeaderProps) {
  return (
    <div className="relative 2xl:h-[40rem] xl:h-[32rem] sm:h-[30rem] h-72 rounded-2xl overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src="/images/gameCenters/cover.jpg"
        alt="گیم نت های ایران / ایران گیم نت"
      />

      <div className="absolute w-full bottom-10 left-0 px-5">
        <h2 className="text-2xl font-PeydaBlack pr-5 pb-3">
          پیدا کردن بهترین گیم نت
        </h2>

        <div className="bg-[#18181b] w-full h-full rounded-lg flex flex-col md:flex-row items-center py-8 px-6 justify-between">
          <SelectDestination
            setDestination={setDestination}
            destination={destination}
          />

          <Filter setFilter={setFilter} />

          <button
            type="button"
            className="group flex items-center gap-2 bg-gray-400/20 px-4 py-2 mt-4 rounded-lg transition-colors hover:bg-gray-400/30"
          >
            <span className="font-PeydaLight">شروع جستجو</span>

            <ArrowLongLeftIcon className="w-5 transition-transform group-hover:-translate-x-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;


function SelectDestination({
  destination,
  setDestination,
}: SelectDestinationProps) {
  const provinces = getAllProvinces();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<
    string | undefined
  >();

  const cities = selectedProvince
    ? getCitiesByProvinceName(selectedProvince)
    : [];

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectCity = (cityName: string) => {
    if (!selectedProvince) return;

    setDestination([cityName, selectedProvince]);
    setSelectedProvince(undefined);
    closeModal();
  };

  return (
    <div className="md:relative mx-10 flex-auto">
      <p className="text-sm lg:text-base dark:text-white font-PeydaMed">
        انتخاب شهر:
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-gray-400/10 transition-colors p-2 rounded-lg flex items-center gap-1 justify-center mt-1 w-full dark:text-white hover:bg-gray-400/20"
      >
        <MapPinIcon className="w-6" />

        {destination.length > 0 ? (
          <span className="text-xs pl-3">
            {destination[1]}، {destination[0]}
          </span>
        ) : (
          <span className="pl-3">انتخاب شهر</span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-modal-title"
            dir="rtl"
            className="w-full max-w-md bg-[#18181b] text-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                {selectedProvince && (
                  <button
                    type="button"
                    onClick={() => setSelectedProvince(undefined)}
                    aria-label="بازگشت به استان ها"
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ArrowUturnRightIcon className="w-5" />
                  </button>
                )}

                <h3
                  id="destination-modal-title"
                  className="font-PeydaMed text-lg"
                >
                  {selectedProvince ? "انتخاب شهر" : "انتخاب استان"}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="بستن"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <XMarkIcon className="w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="cus-scroll overflow-y-auto h-72 p-3">
              {selectedProvince ? (
                <ul className="space-y-1">
                  {cities.map((city) => (
                    <li key={city.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectCity(city.name)}
                        className="w-full text-right px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {city.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  {provinces.map((province) => (
                    <li key={province.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProvince(province.name)
                        }
                        className="w-full text-right px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {province.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-white/10">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition-colors"
              >
                بستن
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Filter({ setFilter }: FilterProps) {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("new");

  const handleFilterChange = (value: FilterType) => {
    setSelectedFilter(value);
    setFilter(value);
  };

  return (
    <div className="md:relative flex-auto items-center mx-10">
      <p className="text-sm lg:text-base dark:text-white font-PeydaMed pb-2">
        فیلتر بر اساس:
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleFilterChange(filter.value)}
              className={`
                px-4 py-2 rounded-lg text-sm transition-colors
                ${
                  isSelected
                    ? "bg-purple-600 text-white"
                    : "bg-gray-400/20 text-white hover:bg-gray-400/30"
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
