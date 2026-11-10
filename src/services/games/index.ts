import { GameFilterOptions, PaginatedResponse } from "../../types/common.types";
import { Tables } from "../../types/database.types";
import { supabase } from "../../utils/supabase";
import { Game, GameQuery } from "./queries";

export const getAllGames = async ({
    filter,
    limit = 10,
    page = 1,
    search,
    category
}: {
    filter?: GameFilterOptions;
    limit?: number;
    page?: number;
    search?: string
    category?: string
} = {}): Promise<PaginatedResponse<Game>> => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    let query = GameQuery();

    switch (filter) {
        case GameFilterOptions.free:
            query = query.eq("is_free", true);
            break;

        case GameFilterOptions.latest:
            query = query.order("created_at", { ascending: false });
            break;
    }
    if (search && search.length > 0) {
        query = query.ilike("title", `%${search}%`)
    }
    if (category) {
        const { data: rows } = await supabase
            .from("game_category_links")
            .select("game_id, game_categories!inner(slug)")
            .eq("game_categories.slug", category);
        const ids = rows?.map((r) => r.game_id) ?? [];
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
export const getGameById = async (id: string) => {
    const res = await supabase.from("games").select(`*,producer:producers(name, logo_path, slug),
    categories:game_categories!game_category_links(slug, title)`).eq("id", id).single()
    return res.data
}

export const getGameCategoryBySlug = async (slug: string): Promise<Tables<"game_categories"> | null> => {
    if (slug.length === 0) return null
    const res = await supabase.from("game_categories").select("*").eq("slug", slug).single()
    return res.data
}