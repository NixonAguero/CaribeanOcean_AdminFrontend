import apiClient from "../../../shared/services/apliClient";
import type { RoomStatus } from "../types/roomStatus.types";

export const getRoomStatusToday = async (roomTypeId?: number): Promise<RoomStatus[]> => {
  const params = roomTypeId ? { roomTypeId } : {};
  const { data } = await apiClient.get<RoomStatus[]>("/Room/status-today", { params });
  return data;
};