import type { RoomStatus } from "../types/roomStatus.types";

const API_URL = 'http://localhost:5000/api/Room/status-today';

export const getRoomStatusToday = async (roomTypeId?: number) => {
  const query = roomTypeId ? `?roomTypeId=${roomTypeId}` : "";

  const response = await fetch(
    `http://localhost:5000/api/Room/status-today${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch room status");
  }

  return response.json();
};