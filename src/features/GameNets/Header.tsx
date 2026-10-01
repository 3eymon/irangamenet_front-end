import { getAllProvinces, getCitiesByProvinceName } from "../..";
import {
  ArrowLongLeftIcon,
  ArrowUturnRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {
  ButtonBase,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

function Header({ setFilter, destination, setDestination }) {
  return (
    <div className="relative 2xl:h-[40rem] xl:h-[32rem]  sm:h-[30rem] h-72  rounded-2xl overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src="/images/gamenets/cover.jpg"
        alt="گیم نت های ایران / ایران گیم نت"
      />
      <div className=" absolute w-full bottom-10 left-0 righ-0 px-5">
        <h2 className="text-2xl font-PeydaBlack pr-5 pb-3">
          پیدا کردن بهترین گیم نت{" "}
        </h2>
        <div className=" bg-[#18181b] w-full h-full rounded-lg flex flex-col md:flex-row items-center py-8 px-6 justify-between">
          <SelectDestination
            setDestination={setDestination}
            destination={destination}
          />
          <Filter setFilter={setFilter} />
          <LoadingButton
            className="group !bg-gray-400/20 !px-4 !py-2 !mt-4 !rounded-lg !shadow-none"
            loading={false}
            endIcon={
              <ArrowLongLeftIcon className="w-4 mt-0.5  group-hover:-translate-x-4 -translate-x-3 transition-transform ease-in-out" />
            }
            variant="contained"
          >
            <span className=" font-PeydaLight">شروع جستجو</span>
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
function SelectDestination({ setDestination, destination }) {
  const provinces = getAllProvinces();
  const [provincesSelect, setProvincesSelect] = useState<string | undefined>(undefined);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="md:relative mx-10 flex-auto">
      <p className="text-sm lg:text-base dark:text-white font-PeydaMed">
        انتخاب شهر :{" "}
      </p>
      <ButtonBase
        type="button"
        className="!bg-gray-400/10  !items-center  transition-colors !p-2 !rounded-lg !flex gap-1 justify-center mt-1 w-full dark:text-white"
        onClick={onOpen}
      >
        <MapPinIcon className="w-6" />
        {destination.length > 0 ? (
          <p className="text-xs pl-3">
            {destination[1]} ,{destination[0]}
          </p>
        ) : (
          <p className="pl-3">انتخاب شهر</p>
        )}
      </ButtonBase>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {provincesSelect ? "شهر" : "استان"}
              </ModalHeader>
              <ModalBody>
                <div className="cus-scroll overflow-auto h-72">
                  {provincesSelect ? (
                    <div className="pr-3 md:pr-0 pt-5 md:pt-0">
                      <div className="w-full flex items-center justify-between">
                        <button
                          className="flex"
                          onClick={() => setProvincesSelect(undefined)}
                        >
                          <ArrowUturnRightIcon className="w-4" />
                        </button>
                      </div>
                      <ul className="pt-1">
                        {getCitiesByProvinceName(provincesSelect).map((c) => (
                          <li
                            onClick={() => {
                              setDestination([]);
                              setDestination((prev) => [...prev, c.name]);
                              setDestination((prev) => [
                                ...prev,
                                provincesSelect,
                              ]);
                              setProvincesSelect(undefined);
                              onClose();
                              document.body.style.overflow = "auto";
                            }}
                            key={c.id}
                            className="px-2 py-2 hover:bg-white/50 rounded-lg cursor-pointer ml-3"
                          >
                            {c.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="pr-3 md:pr-0 pt-5 md:pt-0">
                      <ul className="pt-1">
                        {provinces.map((p) => (
                          <li
                            onClick={() => setProvincesSelect(p.name)}
                            key={p.id}
                            className="px-2 py-2 hover:bg-white/50 rounded-lg cursor-pointer ml-3"
                          >
                            {p.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter dir="ltr">
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button color="primary" onPress={onClose}>
                  ثبت
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function Filter({ setFilter }) {
  return (
    <div className="md:relative flex-auto  items-center mx-10">
      <p className="text-sm lg:text-base dark:text-white font-PeydaMed pb-1">
        فیلتر بر اساس :{" "}
      </p>
      <div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={(e) => setFilter(e.target.value)}
            name="radio-buttons-group"
            className="!flex-row gap-1"
          >
            <FormControlLabel
              className="bg-gray-400/20 pl-4 rounded-lg"
              value="new"
              control={<Radio />}
              label="جدیدترین ها"
            />
            <FormControlLabel
              className="bg-gray-400/20 pl-4 rounded-lg"
              value="bestOfWeek"
              control={<Radio />}
              label="بهترین های هفته"
            />
            <FormControlLabel
              className="bg-gray-400/20 pl-4 rounded-lg"
              value="mostScore"
              control={<Radio />}
              label="بیشترین امتیاز"
            />
            <FormControlLabel
              className="bg-gray-400/20 pl-4 rounded-lg"
              value="bestByIGN"
              control={<Radio />}
              label="برترین از نظر IGN"
            />
          </RadioGroup>
        </FormControl>{" "}
      </div>
    </div>
  );
}
