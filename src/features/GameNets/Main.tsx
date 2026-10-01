import useServer from "../../hook/useServer";
import  { Loader } from "../../ui/SliderCards";
import "./style.css";
import BestIGNGameNets from "./BestIGNGameNets";
import GameNets from "./GameNets";
function Main() {
  const [gameNets, isLoading] = useServer("GameNets");
  return (
    <div className="z-10">
      <h2 className="text-2xl font-PeydaBlack">برترین های IGN</h2>
      <BestIGNGameNets gameNets={gameNets} isLoading={isLoading} />
      <br />
      <br />
      {isLoading ? <Loader /> : <GameNets gameNets={gameNets} />}
    </div>
  );
}

export default Main;
