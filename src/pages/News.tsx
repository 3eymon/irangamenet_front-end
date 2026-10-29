import HeaderNews from "./news/components/HeaderNews";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fa from "javascript-time-ago/locale/fa";
import MostViewed from "./news/components/MostViewed";
import DataSliderSection from "../components/ui/DataSliderSection";
import { sliderCardsType } from "../components/ui/SliderCards";
import type { News as NewsItem } from "../types/news.types";
import useServer from "../hooks/useServer";
import SeeAll from "../components/ui/SeeAll";

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
