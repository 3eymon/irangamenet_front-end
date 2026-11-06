import { useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import SeeAll from "../../components/SeeAll";
import Category from "./components/Category";
import ForMore from "./components/ForMore";
import DataSliderSection from "../../components/DataSliderSection";
import { sliderCardsType } from "../../components/ui/SliderCards";
import type { Game } from "../../types/game.types";
import { getAllGames } from "../../services/gameService";
import { useQuery } from "@tanstack/react-query";
function Games() {
  const latestGamesQuery = useQuery({
    queryKey: ["games", "latest"],
    queryFn: () => getAllGames("latest"),
  });

  const freeGamesQuery = useQuery({
    queryKey: ["games", "free"],
    queryFn: () => getAllGames("free"),
  });
  const around = useRef<HTMLDivElement>(null);
  const scroll = () => {
    around.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 z-10">
      <Header scroll={scroll} />
      <Main el={around} />
      <DataSliderSection
        data={latestGamesQuery.data || []}
        isLoading={latestGamesQuery.isLoading}
        type={sliderCardsType.Games}
        className="mb-16"
      >
        <SeeAll title="جدیدترین بازی ها " link="latest" color="#d42222" />
      </DataSliderSection>
      <Category />
      <DataSliderSection
        data={freeGamesQuery.data || []}
        isLoading={freeGamesQuery.isLoading}
        type={sliderCardsType.Games}
        className="mb-16"
      >
        <SeeAll title="بازی های رایگان" link="free" color="#22d465" />
      </DataSliderSection>
      <ForMore />
    </main>
  );
}

export default Games;
