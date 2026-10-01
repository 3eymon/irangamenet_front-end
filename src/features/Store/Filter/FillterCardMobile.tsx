import { platform, categories } from "../../../../data/sortData";
import Categorie from "./Categorie";
import Platform from "./Platform";
import PriceFilter from "./PriceFilter";
import "animate.css";
import {
  AdjustmentsVerticalIcon,
  CurrencyDollarIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/16/solid";
import { useStoreContext } from "../context/StoreProvider";
// next ui component
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";

function FillterCardMobile() {
  const { hanleFilterCategories, hanleFilterPlatform } = useStoreContext();

  return (
    <div>
      <div className="flex  items-center gap-4  lg:hidden mb-8 justify-center">
        <FilterModal
          icon={<CurrencyDollarIcon className="sm:w-5 w-4  text-white" />}
          title="قیمت"
          component={<PriceFilter />}
        />
        <FilterModal
          icon={<PuzzlePieceIcon className="sm:w-5 w-4  text-white" />}
          title="ژانر"
          component={
            <Categorie
              categories={categories}
              hanleFilter={hanleFilterCategories}
            />
          }
        />
        <FilterModal
          icon={<AdjustmentsVerticalIcon className="sm:w-5 w-4  text-white" />}
          title="پلتفرم"
          component={
            <Platform platform={platform} hanleFilter={hanleFilterPlatform} />
          }
        />
      </div>
    </div>
  );
}

function FilterModal({ icon, title, component }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>
        {title} {icon}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="pb-5">{component}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default FillterCardMobile;
