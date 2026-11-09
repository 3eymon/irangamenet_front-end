import { Link, useParams } from "react-router-dom";
import NotFound from "../../../components/NotFound";
import { isEnumValue } from "../../../utils/isEnumValue";
import Input from "../../../components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  GameFilterOptions,
  NewsFilterOptions,
} from "../../../types/common.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllNews } from "../../../services/news";
import { ReactNode, useMemo } from "react";
import { isNotFoundError } from "../../../utils/isNotFoundErr";
import ErrorState from "../../../components/ErrorState";
import Card from "../../../components/ui/Card";
import { sliderCardsType } from "../../../types/card.types";
import CardSkeleton from "../../../components/ui/CardSkeleton";
import { SearchFailedIllustration } from "../../../components/StateIllustrations";
import { useSearchQueryParam } from "../../../hooks/useSearchQueryParam";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../components/ui/Button";
const LIMIT = 12;
function NewsDiscovery() {
  const { filter } = useParams<{ filter: NewsFilterOptions }>();
  const { query, value, onChange, submit, clear } = useSearchQueryParam();
  const isValid = isEnumValue(NewsFilterOptions, filter);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["news", filter, query],

    queryFn: ({ pageParam }) =>
      getAllNews({
        page: pageParam,
        limit: LIMIT,
        filter,
        search: query,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    enabled: isValid,
    staleTime: 2 * 60_000,
  });
  const lastElementRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  const flattenedData = useMemo(
    () => (data ? data?.pages.flatMap((page) => page.results) : []),
    [data],
  );

  if (!isValid) return <NotFound />;
  const render = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: LIMIT }).map((_, index) => (
        <CardSkeleton key={index} />
      ));
    }
    if (isError && !isNotFoundError(error)) {
      return (
        <ErrorState
          className="col-span-full"
          title="خطا در دریافت لیست خبر ها"
          description={
            error instanceof Error ? error.message : "مشکلی پیش آمده است."
          }
          retry={{
            fn: refetch,
            label: isFetching ? "در حال تلاش مجدد..." : "تلاش دوباره",
            isLoading: isFetching,
          }}
        />
      );
    } else if (isError && isNotFoundError(error)) {
      return (
        <NotFound
          backTo="/news"
          className="col-span-full"
          backLabel="برگشت به بخش خبر ها"
          title="خبر برای نمایش پیدا نشد !"
          description="موردی برای نمایش وجود ندارد. آدرس صفحه را بررسی کنید یا از بخش خبرها دوباره شروع کنید."
        />
      );
    }
    if (flattenedData.length > 0) {
      return flattenedData.map((item, index) => (
        <Card
          key={item.id}
          ref={flattenedData.length === index + 1 ? lastElementRef : null}
          data={item}
          type={sliderCardsType.News}
        />
      ));
    } else {
      return (
        <NotFound
          className="col-span-full"
          backTo={query ? `/news/discover/${filter}` : "/news"}
          illustration={<SearchFailedIllustration />}
          backLabel={query ? "پاک کردن متن جستجو" : "برگشت به خبر ها"}
          title="خبری ای پیدا نشد !"
          description={
            query
              ? `نتیجه‌ای برای «${query}» پیدا نشد. ...`
              : "فعلاً خبری ای در این بخش وجود ندارد."
          }
        />
      );
    }
  };
  return (
    <div className="space-y-10">
      <div className=" w-full max-w-xl space-y-4 p-5 md:p-1.5">
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-primary-300"
        >
          <ArrowRightIcon className="h-4 w-4" />
          بازگشت به خبرها
        </Link>

        <form
          onSubmit={submit}
          role="search"
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Input
              type="search"
              enterKeyHint="search"
              disabled={isError && !isNotFoundError(error)}
              icon={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 lg:h-6 lg:w-6" />
              }
              className="w-full text-right [&::-webkit-search-cancel-button]:hidden"
              placeholder="جستجو میان خبرها"
              value={value}
              onChange={onChange}
            />
            {value && (
              <button
                type="button"
                onClick={clear}
                aria-label="پاک کردن جستجو"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-primary-800/60 hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            type="submit"
            loading={isFetching}
            icon={<MagnifyingGlassIcon className="h-4 w-4 sm:hidden" />}
          >
            <span className="hidden sm:inline">جستجو</span>
            <span className="sr-only sm:hidden">جستجو</span>
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
        {render()}
        {isFetchingNextPage &&
          Array.from({ length: LIMIT }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

export default NewsDiscovery;
