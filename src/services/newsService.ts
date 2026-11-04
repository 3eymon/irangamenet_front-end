import http from "./httpService"
import { News } from "../types/news.types"


export const getAllNews = async (sort?: string): Promise<News[]> => {
    const result = await http.get<News[]>("/news")
    return result.data
}
export const getWeeklyHighlightNews = async (): Promise<News[]> => {
    const result = await http.get("/weeklyHighlightNews")
    return result.data
}


export async function getNewsById(
    id: string
): Promise<News | null> {
    const res = await http.get<News>(`/news/${id}`)

    return res.data
}

export async function getRelatedNews(
    news: News
): Promise<News[]> {
    // const res = await http.get<News[]>(`/news/related/${news.id}`)
    const res = await http.get<News[]>(`/news`)
    return res.data
}
