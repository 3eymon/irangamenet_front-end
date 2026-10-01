import { useSearchParams } from "react-router-dom";
import { platform, categories } from "../../data/sortData";
export default function useCheckToBe() {
  const [searchParams] = useSearchParams();

  platform.map((p) => {
    searchParams
      .get("platform")
      ?.split(",")
      .map((s) => {
        if (p.val === s) {
          p.chek = !p.chek;
        }
      });
  });
  categories.map((p) => {
    searchParams
      .get("categ")
      ?.split(",")
      .map((s) => {
        if (p.val === s) {
          p.chek = !p.chek;
        }
      });
  });
}
