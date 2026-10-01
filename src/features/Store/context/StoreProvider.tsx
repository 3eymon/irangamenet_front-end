import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import useSearchSort from "../../../hook/useSearchSort";
import useCheckToBe from "../../../hook/useCheckToBe";

type StoreContextValue = {
  hanleFilterCategories: (value: string, e: { target: { checked: boolean } }) => void;
  hanleFilterPlatform: (value: string, e: { target: { checked: boolean } }) => void;
  price: number[];
  setPrice: Dispatch<SetStateAction<number[]>>;
  maxPrice: number;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);
export default function StoreProvider({ children }: { children: ReactNode }) {
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
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within StoreProvider");
  }
  return context;
}
