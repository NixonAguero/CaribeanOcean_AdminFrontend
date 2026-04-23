import type { RoomType } from '../types/rooms.types';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '';

export const fetchRoomTypes = async (): Promise<RoomType[]> => {
  const response = await fetch(`${BASE_URL}/api/RoomType`);
  if (!response.ok) {
    throw new Error(`Failed to fetch room types: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const updateRoomType = async (
  id: number,
  payload: FormData
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/RoomType/${id}`, {
    method: 'PUT',
    body: payload,
  });
  if (!response.ok) {
    throw new Error(`Failed to update room type: ${response.status} ${response.statusText}`);
  }
};
