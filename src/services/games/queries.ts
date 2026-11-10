import { QueryData } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";


// queries -------------
export const GameQuery = () =>
  supabase.from("games").select(
    `
    id,
    title,
    description,
    cover_path,
    likes,
    saves,
    views,
    created_at,
    producer:producers(name, logo_path, slug),
    categories:game_categories!game_category_links(slug, title)
  `,
    { count: "exact" },
  );

// types -------------
export type Game = QueryData<
  ReturnType<typeof GameQuery>
>[number];