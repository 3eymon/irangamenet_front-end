import { Game } from "../types/game.types"
import http from "./httpService"

export const getAllGames = async (sort?: string): Promise<Game[]> => {
    const result = await http.get<Game[]>("/games", {
        params: {
            sort,
        }
    })
    return result.data
}
export const getGameById = async (id: string): Promise<Game> => {
    const res = await http.get<Game>(`/games/${id}`)
    return res.data
}