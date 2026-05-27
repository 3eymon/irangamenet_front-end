import { createContext, useContext, useState } from "react";
import useSearchSort from "../../../hook/useSearchSort";
import useCheckToBe from "../../../hook/useCheckToBe";

const StoreContext = createContext();
export default function StoreProvider({ children }) {
  const [hanleFilterPlatform] = useSearchSort("platform", "categ");
  const [hanleFilterCategories] = useSearchSort("categ", "platform");
  const maxPrice = 20_000_000;
  const [price, setPrice] = useState([0, maxPrice]);
  useCheckToBe();
  return (
    <StoreContext.Provider
      value={{
        hanleFilterCategories,
        hanleFilterPlatform,
        price,
        setPrice,
        maxPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function useStoreContext() {
  return useContext(StoreContext);
}
