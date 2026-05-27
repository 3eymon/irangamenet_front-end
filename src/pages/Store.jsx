import StoreProvider from "../features/Store/context/StoreProvider";
import FillterCard from "../features/Store/Filter/FillterCard";
import FillterCardMobile from "../features/Store/Filter/FillterCardMobile";
import HeaderImage from "../features/Store/HeaderImage";
import Prodocts from "../features/Store/Prodocts";

function Store() {
  return (
    <main className="pb-10 flex md:flex-row flex-col md:items-stretch  items-center gap-10 mt-5">
      <StoreProvider>
      <FillterCard />
      <div className="flex flex-col gap-3 w-10/12">
        <HeaderImage />
        <FillterCardMobile   />
        <Prodocts />
      </div>
      </StoreProvider>
    </main>
  );
}

export default Store;
