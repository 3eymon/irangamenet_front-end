import { platform, categories } from "../../../../data/sortData";
import Platform from "./Platform";
import Categorie from "./Categorie";
import { useStoreContext } from "../context/StoreProvider";
import PriceFilter from "./PriceFilter";
import { Input } from "@nextui-org/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
function FillterCard() {
  window.addEventListener("scroll", () => {
    return true;
  });

  // hook
  const { hanleFilterCategories, hanleFilterPlatform } = useStoreContext();
  return (
    <div className="">
      <div className="p-2 rounded-lg bg-white/5 backdrop-blur hidden lg:inline-block !sticky top-7 transition-all ease-linear animate-fade">
        <h2 className="text-lg pb-1 font-semibold ">جستجو </h2>

        <Input
          className="pl-5"
          size="sm"
          isClearable
          classNames={{
            input: [
              "bg-transparent ",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],

            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-default-200/50",
              "dark:bg-default/5",
              "backdrop-blur-xl",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/50",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="نام بازی یا محصول ..."
          startContent={<MagnifyingGlassIcon className="w-5 text-gray-300" />}
        />
        <h2 className="text-lg py-3 font-semibold ">دسته بندی ( ژانر )</h2>
        <Categorie
          categories={categories}
          hanleFilter={hanleFilterCategories}
        />
        <h2 className="text-lg py-3 font-bold">پلتفرم</h2>
        <Platform hanleFilter={hanleFilterPlatform} platform={platform} />
        <h2 className="text-lg py-3 font-bold">قیمت</h2>
        <PriceFilter />
      </div>
    </div>
  );
}

export default FillterCard;
