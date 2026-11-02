import http from "./httpService"
import { News } from "../types/news.types"


export const getAllNews = async (sort?): Promise<News[]> => {
    const result = await http.get<News[]>("/news")
    return result.data
}
export const getWeeklyHighlightNews = async (): Promise<News[]> => {
    const result = await http.get("/weeklyHighlightNews")
    return result.data
}