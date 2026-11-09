import { useParams } from "react-router-dom";
import NotFound from "../../../components/NotFound";
import Input from "../../../components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllNews, getNewsCategoryBySlug } from "../../../services/news";
import {
  ReactNode,
  useMemo,

} from "react";
import { isNotFoundError } from "../../../utils/isNotFoundErr";
import ErrorState from "../../../components/ErrorState";
import Card from "../../../components/ui/Card";
import CardSkeleton from "../../../components/ui/CardSkeleton";
import { SearchFailedIllustration } from "../../../components/StateIllustrations";
import { useSearchQueryParam } from "../../../hooks/useSearchQueryParam";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../components/ui/Button";
import { sliderCardsType } from "../../../types/card.types";
import { AccentBar } from "../../games/detail";

function NewsCategory() {
  const { slug } = useParams<{ slug: string }>();
  const { query, value, onChange, submit, clear } = useSearchQueryParam();

  const {
    data: newsCategory,
    error: categoryError,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useQuery({
    queryKey: ["NewsCategory", slug],
    queryFn: () => getNewsCategoryBySlug(slug || ""),
    enabled: !!slug,
    staleTime: 30 * 60_000,
    gcTime: 60 * 60_000,
  });
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
    queryKey: ["news", slug, query],

    queryFn: ({ pageParam }) =>
      getAllNews({
        page: pageParam,
        limit: 12,
        category: slug,
        search: query,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    enabled: !!newsCategory,
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

  if (!newsCategory && !categoryIsLoading)
    return (
      <NotFound
        className="col-span-full"
        title="دسته بندی مورد نظر یافت نشد !"
        description="دسته بندی حذف شده یا آدرس اشتباه است"
        backLabel="برگشت به خبر ها"
        backTo="/news"
      />
    );
  const render = (): ReactNode => {
    if (isLoading || categoryIsLoading) {
      return Array.from({ length: 12 }).map((_, index) => (
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
          className="col-span-full"
          backTo="/news"
          backLabel="بازگشت به خبر ها"
          title="این دسته‌بندی پیدا نشد"
          description="ممکنه آدرس را اشتباه وارد کرده باشید یا این دسته‌بندی دیگر وجود نداشته باشد."
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
          backTo={`/news/category/${slug}`}
          illustration={<SearchFailedIllustration />}
          backLabel="بازگشت به دسته‌بندی"
          title="خبر ای پیدا نشد !"
          description={
            query
              ? `نتیجه‌ای برای «${query}» پیدا نشد. ...`
              : "فعلاً خبر ای در این بخش وجود ندارد."
          }
        />
      );
    }
  };
  return (
    <div className="space-y-10">
      <header className="mb-8 flex flex-col gap-5 px-5 md:px-0 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          {categoryIsLoading ? (
            <div
              className="flex flex-col gap-3"
              aria-busy="true"
              aria-label="در حال بارگذاری دسته‌بندی"
            >
              <div className="w-2/3 max-w-xs h-8 md:h-10 bg-neutral-800 animate-pulse rounded-lg"></div>
              <div className="w-16 h-1 bg-neutral-800/70 animate-pulse rounded-full"></div>
              <div className="w-full max-w-2xl pt-1 flex flex-col gap-1.5">
                <div className="w-full h-3 bg-neutral-800/70 animate-pulse rounded-sm"></div>
                <div className="w-5/6 h-3 bg-neutral-800/70 animate-pulse rounded-sm"></div>
                <div className="w-2/3 h-3 bg-neutral-800/70 animate-pulse rounded-sm"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl sm:text-4xl font-PeydaMed font-extrabold leading-tight bg-gradient-to-l from-primary-500 via-primary-500 to-primary-500 bg-clip-text text-transparent">
                {newsCategory?.title}
              </h1>
              <AccentBar />
              <p className="max-w-2xl text-sm sm:text-base leading-7 text-neutral-400">
                {newsCategory?.description}
              </p>
            </div>
          )}
        </div>

        <div className="lg:w-1/2 xl:w-1/3">
          {categoryIsLoading ? (
            <div className="h-11 w-full animate-pulse rounded-xl bg-neutral-800/70" />
          ) : (
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
                  placeholder={`جستجو در خبر های ${newsCategory?.title ?? ""}`}
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
          )}
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {render()}
        {isFetchingNextPage &&
          Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

export default NewsCategory;
