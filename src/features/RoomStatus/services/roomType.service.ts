import apiClient from "../../../shared/services/apliClient";
import type { RoomType } from "../types/roomType.types";

export const getRoomTypes = async (): Promise<RoomType[]> => {
  const { data } = await apiClient.get<RoomType[]>("/RoomType");
  return data;
};