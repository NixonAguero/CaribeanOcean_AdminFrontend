import { useEffect, useState, useCallback } from 'react';
import type { RoomType } from '../types/rooms.types';
import { fetchRoomTypes } from '../services/rooms.service';

interface UseRoomsReturn {
  roomTypes: RoomType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRooms = (): UseRoomsReturn => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRoomTypes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRoomTypes();
      setRoomTypes(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error loading room types';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoomTypes();
  }, [loadRoomTypes]);

  return {
    roomTypes,
    loading,
    error,
    refetch: loadRoomTypes,
  };
};
