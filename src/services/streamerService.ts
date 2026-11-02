import { Streamer } from "../types/streamer.types";
import http from "./httpService";

export const getAllStreamers = async (): Promise<Streamer[]> => {
    const res = await http.get("/streamers")
    return res.data
}