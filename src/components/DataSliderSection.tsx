import type { ReactNode } from "react";
import EmptyState from "./EmptyState";
import SliderCards, { Loader } from "./ui/SliderCards";
import { CollectionItem, sliderCardsType } from "../types/card.types";

type DataSliderSectionProps<T extends CollectionItem> = {
  data: T[] | null | undefined;
  isLoading: boolean;
  type: sliderCardsType;
  children?: ReactNode;
  className?: string;
  renderItems?: (items: T[]) => ReactNode;
  sliderProps?: Record<string, any>;
};

export default function DataSliderSection<T extends CollectionItem>({
  data,
  isLoading,
  type,
  children,
  className,
  renderItems,
  sliderProps,
}: DataSliderSectionProps<T>) {
  if (isLoading) return <Loader />;

  return (
    <div>
      {children}
      {data && data.length > 0 ? (
        <div className={className}>
          {renderItems ? (
            renderItems(data)
          ) : (
            <SliderCards data={data} type={type} sliderProps={sliderProps} />
          )}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
