import { Producer } from "../types/producer.types";
import http from "./httpService";

export const getAllProducers = async (): Promise<Producer[]> => {
    const res = await http.get<Producer[]>("/producers")
    return res.data
}