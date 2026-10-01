import { useState } from "react";
import Header from "./Header";
import Main from "./Main";

function GameNetsContainer() {
  const [destination, setDestination] = useState([]);
  const [filter, setFilter] = useState("");
  return (
    <div className="flex flex-col gap-7">
      <Header
        setFilter={setFilter}
        setDestination={setDestination}
        destination={destination}
      />
      <Main />
    </div>
  );
}

export default GameNetsContainer;
