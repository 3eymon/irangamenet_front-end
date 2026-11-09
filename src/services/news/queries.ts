import { QueryData } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";


// queries -------------
export const NewsQuery = () =>
  supabase.from("news").select(`
    id,
    slug,
    title,
    excerpt,
    cover_path,
    likes,
    views,
    created_at,
    published_at,
    updated_at,
    categories:news_categories!news_category_links(slug, title,id),
    author:profiles!author_id(*)
  `, { count: "exact" });

// types -------------
export type News = QueryData<
  ReturnType<typeof NewsQuery>
>[number];