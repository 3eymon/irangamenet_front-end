import Slider from "@mui/material/Slider";
import "./price.css";
import { useStoreContext } from "../context/StoreProvider";
const minDistance = 1000000;
export default function PriceFilter() {
  const { price, setPrice , maxPrice } = useStoreContext();
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };
  const valueLabelFormat = (s) => {
    return <p className="font-Peyda">{s.toLocaleString()} تومان</p>;
  };

  return (
    <div className="w-full lg:w-60 px-5">
      <Slider
        size="small"
        getAriaLabel={() => "Minimum distance"}
        value={price}
        onChange={handleChange}
        valueLabelDisplay="off"
        valueLabelFormat={valueLabelFormat}
        disableSwap
        max={maxPrice}
        color="secondary"
        className="font-Peyda w-full"
      />
      <div className="text-xs flex justify-between">
        <p>{price[1].toLocaleString()} تومان</p>

        <p>{price[0].toLocaleString()} تومان</p>
      </div>
    </div>
  );
}
