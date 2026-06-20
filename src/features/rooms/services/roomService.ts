// src/features/rooms/services/roomService.ts
import apiClient from "../../../shared/services/apliClient";

export interface Room {
  id: number;
  number: number;
  roomTypeId: number;
  active: boolean;
}

export interface CreateRoomPayload {
  number: number;
  roomTypeId: number;
  active: boolean;
}

export interface UpdateRoomPayload {
  number: number;
  roomTypeId: number;
  active: boolean;
}

export const roomService = {
  getAll: async (): Promise<Room[]> => {
    const { data } = await apiClient.get<Room[]>("/Room");
    return data;
  },

  create: async (payload: CreateRoomPayload): Promise<{ id: number }> => {
    const { data } = await apiClient.post<{ id: number }>("/Room", payload);
    return data;
  },

  update: async (id: number, payload: UpdateRoomPayload): Promise<void> => {
    await apiClient.put(`/Room/${id}`, payload);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Room/${id}`);
  },
};