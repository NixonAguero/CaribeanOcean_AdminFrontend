import apiClient from "../../../shared/services/apliClient";
import type { RoomType } from "../types/rooms.types";
import type { AvailableRoomTypeInfo } from "../../booking/types/reservation.types";

export const roomTypeService = {
    async getAll(): Promise<RoomType[]> {
        const response = await apiClient.get<RoomType[]>("/RoomType");
        return response.data;
    },

    async update(id: number, payload: FormData): Promise<boolean> {
        await apiClient.put(`/RoomType/${id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return true;
    },

    async create(payload: FormData): Promise<boolean> {
        await apiClient.post("/RoomType", payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return true;
    },

    async delete(id: number): Promise<boolean> {
        await apiClient.delete(`/RoomType/${id}`);
        return true;
    },

    async getAllAvailableRoomTypes(checkIn: string, checkOut: string): Promise<AvailableRoomTypeInfo[]> {
        const response = await apiClient.post<AvailableRoomTypeInfo[]>("/RoomType/AvailableCount", {
            checkIn,
            checkOut,
        });
        return response.data;
    },
};