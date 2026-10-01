import { useRef } from "react";
import Header from "../features/Games/Header";
import Main from "../features/Games/Main";
import LatestGames from "../features/Games/LatestGames";
import { SeeAll } from "../pages/News";
import Category from "../features/Games/Category";
import FreeGames from "../features/Games/FreeGames";
import ForMore from "../features/Games/ForMore";
function Games() {
  const around = useRef(null);
  const scroll = () => {
    around?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main className="flex flex-col justify-center gap-14 w-full mt-0 md:mt-5 z-10">
      <Header scroll={scroll} />
      <Main el={around} />
      <LatestGames>
        <SeeAll title="جدیدترین بازی ها " link="latest" color="#d42222" />
      </LatestGames>
      <Category />
      <FreeGames>
        <SeeAll title="بازی های رایگان" link="free" color="#22d465" />
      </FreeGames>
      <ForMore />
    </main>
  );
}

export default Games;
