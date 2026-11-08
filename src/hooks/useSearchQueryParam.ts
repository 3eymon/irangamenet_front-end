import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchQueryParam(key = "q") {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get(key) ?? "";
    const [value, setValue] = useState(query);

    useEffect(() => setValue(query), [query]);

    const update = useCallback(
        (next: string) => {
            if (next === query) return;
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                if (next) params.set(key, next);
                else params.delete(key);
                return params;
            });
        },
        [key, query, setSearchParams],
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (e.target.value.trim() === "") update("");
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        (document.activeElement as HTMLElement | null)?.blur();
        return update(value.trim())
    };


    const clear = () => {
        setValue("");
        update("");
    };

    return { query, value, onChange, submit, clear };
}