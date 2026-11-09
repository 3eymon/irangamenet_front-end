import HeaderNews from "./components/HeaderNews";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fa from "javascript-time-ago/locale/fa";
import MostViewed from "./components/MostViewed";
import DataSliderSection from "../../components/DataSliderSection";
import SeeAll from "../../components/SeeAll";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../services/news";
import { NewsFilterOptions } from "../../types/common.types";
import { sliderCardsType } from "../../types/card.types";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fa);
function News() {
  const latestNewsQ = useQuery({
    queryKey: ["news"],
    queryFn: () => getAllNews({ limit: 7 }),
  });
  const mostReadNewsQ = useQuery({
    queryKey: ["mostRead"],
    queryFn: () => getAllNews({ filter: NewsFilterOptions.mostRead, limit: 7 }),
  });
  const weeklyHighlightNewsQ = useQuery({ 
    queryKey: ["weeklyHighlightNews"],
    queryFn: () =>
      getAllNews({ filter: NewsFilterOptions.weeklyHighlight, limit: 7 }),
  });
  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 ">
      <HeaderNews
        isLoading={latestNewsQ.isLoading}
        data={{
          featured: latestNewsQ.data?.results.slice(0, 6) || [],
          secondary: latestNewsQ.data?.results.slice(6, 10) || [],
        }}
      />
      <DataSliderSection
        data={latestNewsQ.data?.results}
        isLoading={latestNewsQ.isLoading}
        type={sliderCardsType.News}
      >
        <SeeAll
          title="جدیدترین اخبار "
          link="discover/latest"
          color="#5254d4"
        />
      </DataSliderSection>
      <DataSliderSection
        data={mostReadNewsQ.data?.results}
        isLoading={mostReadNewsQ.isLoading}
        type={sliderCardsType.News}
        renderItems={(newsItem) => <MostViewed news={newsItem} />}
      >
        <SeeAll
          title="بیشترین تعداد خوندن"
          link="discover/most-read"
          color="#34f4c5"
        />
      </DataSliderSection>
      <DataSliderSection
        data={weeklyHighlightNewsQ.data?.results}
        isLoading={weeklyHighlightNewsQ.isLoading}
        type={sliderCardsType.News}
      >
        <SeeAll
          title="برترین های هفته"
          link="discover/weekly-highlight"
          color="#fff"
        />
      </DataSliderSection>
      <TopCreatorNews />
    </main>
  );
}

export default News;

function TopCreatorNews() {
  return <div></div>;
}
