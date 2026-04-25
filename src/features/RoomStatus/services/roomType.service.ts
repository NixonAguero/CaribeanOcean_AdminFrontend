import type { RoomType } from "../types/roomType.types";

const API_URL = "http://localhost:5000/api/RoomType";

export const getRoomTypes = async (): Promise<RoomType[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch room types");
  }

  return response.json();
};