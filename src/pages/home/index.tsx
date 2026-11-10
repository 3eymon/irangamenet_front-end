import FAQs from "./components/FAQs";
import AboutUs from "./components/AboutUs";
import HeroSection from "./components/HeroSection";
import DataSliderSection from "../../components/DataSliderSection";
import SeeAll from "../../components/SeeAll";
import BestProducers from "./components/BestProducers";
// import StreamerCard from "./components/StreamerCard";
// import EmptyState from "../../components/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../services/news";
// import { getAllGameCenters } from "../../services/gameCenters";
import { getAllProducers } from "../../services/producers";
// import { Swiper, SwiperSlide } from "swiper/react";

import { getAllGames } from "../../services/games";
import { sliderCardsType } from "../../types/card.types";
import { GameFilterOptions, NewsFilterOptions } from "../../types/common.types";
import { useMemo } from "react";
const CARD_LIMIT = 7;
function Home() {
  const popularNewsQuery = useQuery({
    queryKey: ["news", "popular"],
    queryFn: () =>
      getAllNews({
        limit: CARD_LIMIT,
        page: 1,
        filter: NewsFilterOptions.popular,
      }),
    staleTime: 5 * 60 * 1000,
  });
  const latestGamesQuery = useQuery({
    queryKey: ["games", "latest"],
    queryFn: () =>
      getAllGames({
        limit: CARD_LIMIT,
        page: 1,
        filter: GameFilterOptions.latest,
      }),
    staleTime: 10 * 60 * 1000,
  });

  // const bestGameCentersQuery = useQuery({
  //   queryKey: ["gameCenters", "best"],
  //   queryFn: getAllGameCenters,
  //   staleTime: 5 * 60 * 1000,
  // });

  const bestProducersQuery = useQuery({
    queryKey: ["producers", "best"],
    queryFn: () => getAllProducers({ limit: 10 }),
    staleTime: 10 * 60 * 1000,
  });

  // const bestStreamersQuery = useQuery({
  //   queryKey: ["streamers", "best"],
  //   queryFn: getAllStreamers,
  //   staleTime: 5 * 60 * 1000,
  // });
  const triplicatedData = useMemo(() => {
  const results = popularNewsQuery.data?.results;
  if (!results) return results;

  return [0, 1, 2].flatMap((copyIndex) =>
    results.map((item) => ({
      ...item,
      id: `${item.id}-copy-${copyIndex}`,
    }))
  );
}, [popularNewsQuery.data?.results]);
  return (
    <main className="pb-10 flex flex-col gap-10">
      <HeroSection
        data={triplicatedData}
        isLoading={popularNewsQuery.isLoading}
      />
      <DataSliderSection
        data={latestGamesQuery.data?.results}
        isLoading={latestGamesQuery.isLoading}
        type={sliderCardsType.Games}
        className="mb-16"
      >
        <SeeAll
          id="latest-games"
          title="جدیدترین بازی ها "
          link="games/discover/latest"
          color="#d42222"
        />
      </DataSliderSection>
      {/* <DataSliderSection
        data={bestGameCentersQuery.data}
        isLoading={bestGameCentersQuery.isLoading}
        type={sliderCardsType.GameCenters}
        className="mb-16"
      >
        <SeeAll title="برترین گیمنت ها" link="game-centers" color="#22d465" />
      </DataSliderSection> */}

      <BestProducers
        data={
          Array.isArray(bestProducersQuery.data) ? bestProducersQuery.data : []
        }
        isLoading={bestProducersQuery.isLoading}
      />
      {/* <div className="w-full">
        <SeeAll title="برترین استریمرها" link="streamers" color="#a855f7" />

        {bestStreamersQuery.isLoading ? (
          <>در حال بارگذاری</>
        ) : bestStreamersQuery.data && bestStreamersQuery.data.length > 0 ? (
          <Swiper
            slidesPerView={2.4}
            spaceBetween={5}
            breakpoints={{
              480: {
                slidesPerView: 3.4,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3.5,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 4.4,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 5.4,
                spaceBetween: 18,
              },
              1280: {
                slidesPerView: 6.4,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 7.4,
                spaceBetween: 20,
              },
              1768: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
            className="streamers-swiper !pt-6 !px-3 lg:!px-5 !pb-4 rounded-2xl overflow-hidden"
          >
            {bestStreamersQuery.data.slice(0, 8).map((s) => (
              <SwiperSlide key={s.id}>
                <StreamerCard s={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <EmptyState />
        )}
      </div> */}
      <FAQs />
      <AboutUs />
    </main>
  );
}

export default Home;
