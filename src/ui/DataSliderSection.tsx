import type { ReactNode } from "react";
import type { Game, GameCenter } from "../types/game.types";
import type { News } from "../types/news.types";
import EmptyState from "./EmptyState";
import SliderCards, { Loader, sliderCardsType } from "./SliderCards";

type CollectionItem = Game | GameCenter | News;

type DataSliderSectionProps<T extends CollectionItem> = {
  data: T[];
  isLoading: boolean;
  type: sliderCardsType;
  children: ReactNode;
  className?: string;
  renderItems?: (items: T[]) => ReactNode;
};

export default function DataSliderSection<T extends CollectionItem>({
  data,
  isLoading,
  type,
  children,
  className,
  renderItems,
}: DataSliderSectionProps<T>) {
  if (isLoading) return <Loader />;

  return (
    <div>
      {children}
      {data.length > 0 ? (
        <div className={className}>
          {renderItems ? (
            renderItems(data)
          ) : (
            <SliderCards data={data} type={type} />
          )}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
