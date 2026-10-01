import axios from "axios";
import { useEffect, useState } from "react";

export default function useServer<T = any>(url: string): [T[], boolean] {
  const URL = `http://localhost:8000/${url}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<T[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get<T[]>(URL);
        setValue(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [URL]);

  return [value, isLoading];
}
