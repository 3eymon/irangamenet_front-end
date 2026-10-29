import useServer from "../../../hooks/useServer";
import  { Loader } from "../../../components/ui/SliderCards";
import "./style.css";
import BestIGNGameCenters from "./BestIGNGameCenters";
import GameCenters from "./GameCenters";
import type { GameCenter } from "../../../types/game.types";
function Main() {
  const [gameCenters, isLoading] = useServer<GameCenter[]>("GameCenters", []);
  return (
    <div className="z-10">
      <h2 className="text-2xl font-PeydaBlack">برترین های IGN</h2>
      <BestIGNGameCenters gameCenters={gameCenters} isLoading={isLoading} />
      <br />
      <br />
      {isLoading ? <Loader /> : <GameCenters gameCenters={gameCenters} />}
    </div>
  );
}

export default Main;
