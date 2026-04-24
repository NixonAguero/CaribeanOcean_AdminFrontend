import { useState, useCallback } from "react";
import type { RoomType } from "../types/rooms.types";
import { roomTypeService } from "../services/roomTypeService";
import { useAsyncState } from "../../../shared/hooks/useAsyncState";

export const useRoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const { isLoading, error, withAsync } = useAsyncState();

    const fetchRoomTypes = useCallback(async () => {
        await withAsync(async () => {
            const data = await roomTypeService.getAll();
            setRoomTypes(data);
        });
    }, []);

    const updateRoomType = async (id: number, payload: FormData) => {
        return await withAsync(async () => {
            await roomTypeService.update(id, payload);
            await fetchRoomTypes();
        });
    };

    return {
        roomTypes,
        loading: isLoading,
        error,
        fetchRoomTypes,
        updateRoomType,
    };
};
