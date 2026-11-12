import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link } from "react-router-dom";

type SeeAllProps = {
  title: string;
  link?: string;
  color: string;
  className?: string;
  id?: string;
};

export default function SeeAll({
  title,
  link,
  color,
  className,
  id,
}: SeeAllProps) {
  return (
    <div className={clsx("flex justify-between pb-3", className)}>
      <div className="relative mr-5 flex gap-5 md:mr-0">
        <h2
          id={id}
          className="font-PeydaBlack pr-3.5 text-lg lg:text-xl xl:pr-5 xl:text-2xl"
        >
          {title}
        </h2>
        <div
          style={{
            boxShadow: `0px 0px 15px 0px ${color}`,
            backgroundColor: color,
          }}
          className="absolute right-0 h-7 w-[3.5px] rounded-l-full lg:h-8 xl:h-9"
        ></div>
      </div>
      {link && (
        <Link
          to={link}
          className="group flex items-center gap-2 pl-3 font-PeydaMed text-[#bb80ff] max-lg:text-sm"
        >
          دیدن همه
          <ChevronLeftIcon className="w-4 translate-x-1 transition-all ease-in-out group-hover:translate-x-0 max-md:w-5" />
        </Link>
      )}
    </div>
  );
}
