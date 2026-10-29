import { useRef } from "react";
import Header from "../features/games/Header";
import Main from "../features/games/Main";
import { SeeAll } from "../pages/News";
import Category from "../features/games/Category";
import ForMore from "../features/games/ForMore";
import DataSliderSection from "../ui/DataSliderSection";
import { sliderCardsType } from "../ui/SliderCards";
import type { Game } from "../types/game.types";
import useServer from "../hook/useServer";
function Games() {
  const [latestGames, latestGamesIsLoading] = useServer<Game[]>(
    "games?releaseDate:desc",
    [],
  );
  const [freeGames, freeGamesIsLoading] = useServer<Game[]>(
    "games?isFree=true",
    [],
  );
  const around = useRef(null);
  const scroll = () => {
    around?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 z-10">
      <Header scroll={scroll} />
      <Main el={around} />
      <DataSliderSection
        data={latestGames}
        isLoading={latestGamesIsLoading}
        type={sliderCardsType.Games}
        className="mb-16"
      >
        <SeeAll title="جدیدترین بازی ها " link="latest" color="#d42222" />
      </DataSliderSection>
      <Category />
      <DataSliderSection
        data={freeGames}
        isLoading={freeGamesIsLoading}
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
