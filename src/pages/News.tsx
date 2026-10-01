import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import HeaderNews from "../features/News/HeaderNews";
import LatestNews from "../features/News/LatestNews";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fa from "javascript-time-ago/locale/fa";
import { Link } from "react-router-dom";
import MostViewed from "../features/News/MostViewed";
import WeeklyHighlightNews from "../features/News/WeeklyHighlightNews";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fa);
function News() {
  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 ">
      <HeaderNews />
      <LatestNews>
        <SeeAll title="جدیدترین اخبار " link="latest" color="#5254d4" />
      </LatestNews>
      <MostViewed>
        <SeeAll title="بیشترین تعداد خوندن" link="mostRead" color="#34f4c5" />
      </MostViewed>
      <WeeklyHighlightNews>
        <SeeAll title="برترین های هفته" link="weeklyHighlight" color="#fff" />
      </WeeklyHighlightNews>
      <TopCreatorNews />
    </main>
  );
}

export default News;

function TopCreatorNews() {
  return <div></div>;
}
// #34f4c5 , #5254d4 , #fff
export function SeeAll({ title, link, color }) {
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
