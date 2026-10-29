import { useEffect, useState } from "react";
import http from "../services/httpService";

export default function useServer<T>(
  url: string,
  initialValue?: T,
): [T, boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<T>(initialValue || null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await http.get<T>(url);
        setValue(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [value, isLoading];
}
