import { useState } from "react";
import { roomTypeService } from "../services/roomTypeService";
import { type AvailableRoomTypeInfo } from '../../booking/types/reservation.types';
import { useAsyncState } from "../../../shared/hooks/useAsyncState";

export const useRoomType = () => {
    const [availableRooms, setAvailableRooms] = useState<AvailableRoomTypeInfo[] | null>(null);

    const { isLoading, error, withAsync } = useAsyncState();

    const checkAvailability = async (checkInDate: string, checkOutDate: string) => {
        setAvailableRooms(null); // Limpiamos la búsqueda anterior 
        
        await withAsync(async () => {
            const response = await roomTypeService.getAllAvailableRoomTypes(checkInDate, checkOutDate);
            setAvailableRooms(response);
        });
    };

    return {
        availableRooms,
        loading: isLoading,
        error,
        checkAvailability
    };
};
