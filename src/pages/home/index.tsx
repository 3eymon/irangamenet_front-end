import FAQs from "./components/FAQs";
import AboutUs from "./components/AboutUs";
import "swiper/css/effect-coverflow";
import "swiper/css";
import HeroSection from "./components/HeroSection";
import DataSliderSection from "../../components/ui/DataSliderSection";
import { sliderCardsType } from "../../components/ui/SliderCards";
import SeeAll from "../../components/ui/SeeAll";
import BestProducers from "./components/BestProducers";
import StreamerCard from "./components/StreamerCard";
import EmptyState from "../../components/ui/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../services/newsService";
import { getAllGameCenters } from "../../services/gameCenterService";
import { getAllProducers } from "../../services/producerService";
import { getAllStreamers } from "../../services/streamerService";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { getAllGames } from "../../services/gameService";
function Main() {
  const popularNewsQuery = useQuery({
    queryKey: ["news", "popular"],
    queryFn: () => getAllNews(),
    staleTime: 5 * 60 * 1000,
  });

  const newestGamesQuery = useQuery({
    queryKey: ["games", "newest"],
    queryFn: () => getAllGames(),
    staleTime: 10 * 60 * 1000,
  });

  const bestGameCentersQuery = useQuery({
    queryKey: ["gameCenters", "best"],
    queryFn: getAllGameCenters,
    staleTime: 5 * 60 * 1000,
  });

  const bestProducersQuery = useQuery({
    queryKey: ["producers", "best"],
    queryFn: getAllProducers,
    staleTime: 10 * 60 * 1000,
  });

  const bestStreamersQuery = useQuery({
    queryKey: ["streamers", "best"],
    queryFn: getAllStreamers,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <main className="pb-10 flex flex-col gap-10">
      <HeroSection
        data={popularNewsQuery.data ?? []}
        isLoading={popularNewsQuery.isLoading}
      />
      <DataSliderSection
        data={newestGamesQuery.data ?? []}
        isLoading={newestGamesQuery.isLoading}
        type={sliderCardsType.Games}
        className="mb-16"
      >
        <SeeAll
          title="جدیدترین بازی ها "
          link="games?sort=newest"
          color="#d42222"
        />
      </DataSliderSection>
      <DataSliderSection
        data={bestGameCentersQuery.data ?? []}
        isLoading={bestGameCentersQuery.isLoading}
        type={sliderCardsType.GameCenters}
        className="mb-16"
      >
        <SeeAll title="برترین گیمنت ها" link="game-centers" color="#22d465" />
      </DataSliderSection>

      <BestProducers
        data={bestProducersQuery.data ?? []}
        isLoading={bestProducersQuery.isLoading}
      />
      <div className="w-full">
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
      </div>
      <FAQs />
      <AboutUs />
    </main>
  );
}

export default Main;
