import  apiClient  from "../../../shared/services/apliClient";
import type { AvailableRoomTypeInfo } from "../../booking/types/reservation.types";


export const roomTypeService = {

    async getAllAvailableRoomTypes(checkIn: string, checkOut: string): Promise<AvailableRoomTypeInfo[]> {
        const response = await apiClient.post<AvailableRoomTypeInfo[]>("/RoomType/AvailableCount", {
          checkIn,
          checkOut
        });
        return response.data;
    }

}