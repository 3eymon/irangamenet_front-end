import { Loader } from "../../../components/ui/SliderCards";
import "./style.css";
import BestIGNGameCenters from "./BestIGNGameCenters";
import GameCenters from "./GameCenters";
import type { GameCenter } from "../../../types/game.types";
import { useQuery } from "@tanstack/react-query";
import { getAllGameCenters } from "../../../services/gameCenterService";
import EmptyState from "../../../components/EmptyState";
function Main() {
  const {
    data: gameCenters = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gameCenters"],
    queryFn: getAllGameCenters,
  });
  return (
    <div className="z-10">
      <h2 className="text-2xl font-PeydaBlack">برترین های IGN</h2>
      <BestIGNGameCenters gameCenters={gameCenters} isLoading={isLoading} />
      <br />
      <br />
      {isError ? (
        <EmptyState title="خطا در گرفتن اطلاعات گیم نت ها" />
      ) : isLoading ? (
        <Loader />
      ) : (
        <GameCenters gameCenters={gameCenters} />
      )}
    </div>
  );
}

export default Main;
