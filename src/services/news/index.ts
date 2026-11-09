import { NewsFilterOptions, PaginatedResponse } from "../../types/common.types";
import { Tables } from "../../types/database.types";
import { supabase } from "../../utils/supabase";
import { News, NewsQuery } from "./queries";

// }
export const getAllNews = async ({
    filter,
    limit = 10,
    page = 1,
    search,
    category
}: {
    filter?: NewsFilterOptions;
    limit?: number;
    page?: number;
    search?: string
    category?: string
} = {}) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    let query = NewsQuery();

    switch (filter) {
        case NewsFilterOptions.popular:
            query = query.order("likes", { ascending: false })
            break;

        case NewsFilterOptions.latest:
            query = query.order("published_at", { ascending: false });
            break;
        case NewsFilterOptions.mostRead:
            query = query.order("views", { ascending: false })
            break;
        case NewsFilterOptions.weeklyHighlight:
            query = query.eq("is_featured", true)
            break
    }
    if (search && search.length > 0) {
        query = query.ilike("title", `%${search}%`)
    }
    if (category) {
        const { data: rows } = await supabase
            .from("news_category_links")
            .select("news_id, news_categories!inner(slug)")
            .eq("news_categories.slug", category);
        const ids = rows?.map((r) => r.news_id) ?? [];
        query = query.in("id", ids);
    }
    const { data, error, count } = await query.range(from, to);

    if (error) throw error;
    const totalPages = Math.ceil((count ?? 0) / limit)
    return {
        results: data,
        pagination: {
            total: count ?? 0,
            page,
            limit,
            totalPages,
            hasNextPage: (page + 1) <= totalPages,
            hasPrevPage: page > 1 && page <= totalPages
        }
    };
};

export const getNewsBySlug = async (slug: string) => {
    const res = await supabase.from("news").select(`* ,categories:news_categories!news_category_links(slug, title,id),
    author:profiles!author_id(*)`).eq("slug", slug).single()
    return res.data
}
export const getNewsCategoryBySlug = async (slug: string): Promise<Tables<"news_categories"> | null> => {
    if (slug.length === 0) return null
    const res = await supabase.from("news_categories").select("*").eq("slug", slug).single()
    return res.data
}

export async function getRelatedNews(
    newsItem: News,
    limit = 6
): Promise<News[]> {
    const categoryIds = newsItem.categories.map((c) => c.id);
    if (categoryIds.length === 0) return [];

    const { data: links, error: linksError } = await supabase
        .from("news_category_links")
        .select("news_id")
        .in("category_id", categoryIds)
        .neq("news_id", newsItem.id);

    if (linksError) throw linksError;

    const ids = [...new Set(links.map((l) => l.news_id))];
    if (ids.length === 0) return [];

    const { data, error } = await NewsQuery().in("id", ids).limit(limit).order("published_at", { ascending: false })

    if (error) throw error;
    return data ?? [];
}