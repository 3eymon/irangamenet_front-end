import { Game } from "../services/games/queries";
import { News } from "../services/news/queries";

export enum sliderCardsType {
  News = "خبر",
  Games = "بازی",
}

export type CollectionItem = Game | News;