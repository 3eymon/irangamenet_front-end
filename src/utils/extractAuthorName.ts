import { News } from "../services/news/queries";

export const extractAuthorName = (data: News): string => {
  const { display_name, username } = data.author ?? {};

  return display_name?.trim() || (username ? `@${username}` : "ناشناس");
};