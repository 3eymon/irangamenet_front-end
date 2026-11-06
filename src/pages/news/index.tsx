import HeaderNews from "./components/HeaderNews";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fa from "javascript-time-ago/locale/fa";
import MostViewed from "./components/MostViewed";
import DataSliderSection from "../../components/DataSliderSection";
import { sliderCardsType } from "../../components/ui/SliderCards";
import SeeAll from "../../components/SeeAll";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../services/newsService";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fa);
function News() {
  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => getAllNews(),
  });
  const { data: weeklyHighlightNews = [], isLoading: weeklyLoading } = useQuery(
    {
      queryKey: ["weeklyHighlightNews"],
      queryFn: () => getAllNews(),
    },
  );
  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 ">
      <HeaderNews
        isLoading={newsLoading}
        data={{
          featured: news.slice(0, 6),
          secondary: news.slice(6, 10),
        }}
      />
      <DataSliderSection
        data={news}
        isLoading={newsLoading}
        type={sliderCardsType.News}
      >
        <SeeAll title="جدیدترین اخبار " link="browse/latest" color="#5254d4" />
      </DataSliderSection>
      <DataSliderSection
        data={news}
        isLoading={newsLoading}
        type={sliderCardsType.News}
        renderItems={(news) => <MostViewed news={news} />}
      >
        <SeeAll title="بیشترین تعداد خوندن" link="browse/most-read" color="#34f4c5" />
      </DataSliderSection>
      <DataSliderSection
        data={weeklyHighlightNews}
        isLoading={weeklyLoading}
        type={sliderCardsType.News}
      >
        <SeeAll title="برترین های هفته" link="browse/weekly-highlight" color="#fff" />
      </DataSliderSection>
      <TopCreatorNews />
    </main>
  );
}

export default News;

function TopCreatorNews() {
  return <div></div>;
}
