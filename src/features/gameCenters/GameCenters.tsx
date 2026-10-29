import SliderCards from "../../ui/SliderCards";
import { SeeAll } from "../../pages/News";
import { useState } from "react";
import type { GameCenter } from "../../types/game.types";
function GameCenters({ gameCenters }: { gameCenters: GameCenter[] }) {
  const [citySelected, setCitySelected] = useState("همه");
  const topCity = [
    { id: 1, title: "همه" },
    { id: 2, title: "تهران" },
    { id: 3, title: "مشهد" },
    { id: 4, title: "کرج" },
    { id: 5, title: "شیراز" },
  ];
  const active =
    "px-4 py-1.5 bg-white/10 hover:bg-white/5 transition-colors rounded-lg";
  const notActive =
    "px-4 py-1.5  hover:bg-white/10 transition-colors rounded-lg";
  if (citySelected !== "همه") {
    gameCenters = gameCenters.filter((gameCenter) => gameCenter.city === citySelected);
  }
  return (
    <>
      <SeeAll
        title="  گیم نت ها "
        link={`bestGameCenters${citySelected != "همه" ? "/" + citySelected : ""}`}
        color="#d42222"
      />
      <div className="flex items-center gap-5 text-sm p-2">
        {topCity.map((c) => (
          <button
            onClick={() => setCitySelected(c.title)}
            key={c.id}
            className={c.title == citySelected ? active : notActive}
          >
            {c.title}
          </button>
        ))}
      </div>
      <SliderCards type="gameCenter" data={gameCenters.slice(0, 4)} />
    </>
  );
}

export default GameCenters;
