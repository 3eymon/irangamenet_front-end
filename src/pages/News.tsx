import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import HeaderNews from "../features/news/HeaderNews";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fa from "javascript-time-ago/locale/fa";
import { Link } from "react-router-dom";
import MostViewed from "../features/news/MostViewed";
import DataSliderSection from "../ui/DataSliderSection";
import { sliderCardsType } from "../ui/SliderCards";
import type { News as NewsItem } from "../types/news.types";
import useServer from "../hook/useServer";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fa);
function News() {
  const [news, newsIsLoading] = useServer<NewsItem[]>("news", []);
  const [weeklyHighlightNews, weeklyHighlightIsLoading] = useServer<NewsItem[]>(
    "WeeklyHighlightNews",
    [],
  );

  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 ">
      <HeaderNews />
      <DataSliderSection
        data={news}
        isLoading={newsIsLoading}
        type={sliderCardsType.News}
      >
        <SeeAll title="جدیدترین اخبار " link="latest" color="#5254d4" />
      </DataSliderSection>
      <DataSliderSection
        data={news}
        isLoading={newsIsLoading}
        type={sliderCardsType.News}
        renderItems={(news) => <MostViewed news={news} />}
      >
        <SeeAll title="بیشترین تعداد خوندن" link="mostRead" color="#34f4c5" />
      </DataSliderSection>
      <DataSliderSection
        data={weeklyHighlightNews}
        isLoading={weeklyHighlightIsLoading}
        type={sliderCardsType.News}
      >
        <SeeAll title="برترین های هفته" link="weeklyHighlight" color="#fff" />
      </DataSliderSection>
      <TopCreatorNews />
    </main>
  );
}

export default News;

function TopCreatorNews() {
  return <div></div>;
}
type SeeAllProps = {
  title: string;
  link: string;
  color: string;
};

export function SeeAll({ title, link, color }: SeeAllProps) {
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
