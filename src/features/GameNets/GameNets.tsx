import SliderCards from "../../ui/SliderCards";
import { SeeAll } from "../../pages/News";
import { useState } from "react";
function GameNets({ gameNets }) {
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
    gameNets = gameNets.filter((gn) => gn.city === citySelected);
  }
  return (
    <>
      <SeeAll
        title="  گیم نت ها "
        link={`bestGameNets${citySelected != "همه" ? "/" + citySelected : ""}`}
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
      <SliderCards type="gamenet" arr={gameNets.slice(0, 4)} categ="عکس" />
    </>
  );
}

export default GameNets;
