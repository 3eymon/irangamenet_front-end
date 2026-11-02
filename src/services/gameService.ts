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