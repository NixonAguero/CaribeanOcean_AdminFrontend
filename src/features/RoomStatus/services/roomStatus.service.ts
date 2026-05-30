import type { RoomStatus } from "../types/roomStatus.types";

const API_URL = 'http://localhost:5287/api/Room/status-today';

export const getRoomStatusToday = async (roomTypeId?: number): Promise<RoomStatus[]> => {
  const query = roomTypeId ? `?roomTypeId=${roomTypeId}` : "";

  const response = await fetch(`${API_URL}${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch room status");
  }

  return response.json();
};