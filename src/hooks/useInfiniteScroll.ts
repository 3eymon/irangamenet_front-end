import { useCallback, useRef } from "react";

type Options = {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
};

export function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
}: Options) {
    const observer = useRef<IntersectionObserver | null>(null);

    return useCallback(
        (node: HTMLElement | null) => {
            observer.current?.disconnect();
            if (!node) return;

            observer.current = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                },
                { rootMargin: "300px" },
            );
            observer.current.observe(node);
        },
        [hasNextPage, isFetchingNextPage, fetchNextPage],
    );
}