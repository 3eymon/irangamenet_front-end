import { useSearchParams } from "react-router-dom";

function useSearchSort(key, key2) {
  const [searchParam, setSearchParam] = useSearchParams();
  function value(value, e) {
    if (e.target.checked) {
      if (searchParam.get(key)) {
        if (searchParam.get(key2)) {
          setSearchParam({
            [key2]: searchParam.get(key2),
            [key]: searchParam.get(key) + "," + value,
          });
        } else {
          setSearchParam({ [key]: searchParam.get(key) + "," + value });
        }
      } else {
        if (searchParam.get(key2)) {
          setSearchParam({ [key2]: searchParam.get(key2), [key]: value });
        } else {
          setSearchParam({ [key]: value });
        }
      }
    } else {
      const searchP = searchParam.get(key)?.split(",");
      const deleted = searchP?.filter((s) => s !== value);
      if (deleted?.length > 0) {
        if (searchParam.get(key2)) {
          setSearchParam({
            [key2]: searchParam.get(key2),
            [key]: deleted.toString(),
          });
        } else {
          setSearchParam({ [key]: deleted.toString() });
        }
      } else {
        if (searchParam.get(key2)) {
          setSearchParam({ [key2]: searchParam.get(key2) });
        } else {
          searchParam.delete(key);
          setSearchParam();
        }
      }
    }
  }

  return [value];
}

export default useSearchSort;
