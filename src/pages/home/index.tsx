import FAQs from "./components/FAQs";
import AboutUs from "./components/AboutUs";
import useServer from "../../hooks/useServer";
import { News } from "../../types/news.types";
import type { Game, GameCenter } from "../../types/game.types";
import "swiper/css/effect-coverflow";
import "swiper/css";
import HeroSection from "./components/HeroSection";
import DataSliderSection from "../../components/ui/DataSliderSection";
import { sliderCardsType } from "../../components/ui/SliderCards";
import SeeAll from "../../components/ui/SeeAll";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Producer } from "../../types/ producer.types";
import BestProducers from "./components/BestProducers";
type Home = {
  popularNews: News[];
  bestGameCenters: GameCenter[];
  newestGames: Game[];
  producers: Producer[];
  bestStreamers: any[];
  streamers: Streamer[];
};
import StreamerCard from "./components/StreamerCard";
import { Streamer } from "../../types/streamer.types";

function Main() {
  const [homeData, isLoading] = useServer<Home>("home", {
    popularNews: [],
    bestGameCenters: [],
    newestGames: [],
    producers: [],
    bestStreamers: [],
    streamers: [],
  });
  return (
    <main className="pb-10 flex flex-col gap-10">
      <HeroSection data={homeData?.popularNews ?? []} isLoading={isLoading} />
      <DataSliderSection
        data={homeData?.newestGames ?? []}
        isLoading={isLoading}
        type={sliderCardsType.Games}
        className="mb-16"
      >
        <SeeAll title="جدیدترین بازی ها " link="games?sort=newest" color="#d42222" />
      </DataSliderSection>
      <DataSliderSection
        data={homeData?.bestGameCenters ?? []}
        isLoading={isLoading}
        type={sliderCardsType.GameCenters}
        className="mb-16"
      >
        <SeeAll
          title="برترین گیمنت ها"
          link="game-centers"
          color="#22d465"
        />
      </DataSliderSection>

      <BestProducers data={homeData.producers} isLoading={isLoading} />
      <div className="w-full">
        <SeeAll
          title="برترین استریمرها"
          link="streamers"
          color="#a855f7"
        />

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-y-8 gap-x-3 md:gap-x-6 px-3 lg:px-5 mt-6">
          {homeData?.streamers.map((s) => (
            <StreamerCard key={s.id} s={s} />
          ))}
        </div>
      </div>
      <FAQs />
      <AboutUs />
    </main>
  );
}

export default Main;
