import { useState } from "react";
import Header from "./components/Header";
import Main from "../home";
export type Destination = string[];

function GameCenters() {
  const [destination, setDestination] = useState<Destination>([]);
  const [filter, setFilter] = useState("");
  return (
    <div className="px-1 mt-0 md:mt-5 z-10">
      <div className="flex flex-col gap-7">
        <Header
          setFilter={setFilter}
          setDestination={setDestination}
          destination={destination}
        />
        <Main />
      </div>
    </div>
  );
}

export default GameCenters;
