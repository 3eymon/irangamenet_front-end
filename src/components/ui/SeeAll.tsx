import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

type SeeAllProps = {
  title: string;
  link: string;
  color: string;
};

export default function SeeAll({ title, link, color }: SeeAllProps) {
  return (
    <div className="flex justify-between pb-3">
      <div className="relative flex gap-5 mr-5 md:mr-0">
        <h2 className="text-2xl font-PeydaBlack pr-5">{title}</h2>
        <div
          style={{
            boxShadow: `0px 0px 15px 0px ${color}`,
            backgroundColor: color,
          }}
          className="absolute right-0 w-[3.5px] h-9 rounded-l-full"
        ></div>
      </div>
      <Link
        to={link}
        className="group text-[#bb80ff] font-PeydaMed flex items-center  gap-2 pl-3"
      >
        دیدن همه
        <ChevronLeftIcon className="w-5 group-hover:translate-x-0 translate-x-1 transition-all ease-in-out" />
      </Link>
    </div>
  );
}
