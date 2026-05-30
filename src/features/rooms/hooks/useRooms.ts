import { useState, useCallback } from "react";
import { roomService, type Room } from "../services/roomService";

export const useRooms = (roomTypeId: number) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomService.getAll();
      setRooms(data.filter((r) => r.roomTypeId === roomTypeId));
    } catch {
      setError("Error loading rooms");
    } finally {
      setLoading(false);
    }
  }, [roomTypeId]);

  const createRoom = async (number: number, active: boolean) => {
    await roomService.create({ number, roomTypeId, active });
    await fetchRooms();
  };

  const updateRoom = async (id: number, number: number, active: boolean) => {
    await roomService.update(id, { number, roomTypeId, active });
    await fetchRooms();
  };

  const deleteRoom = async (id: number) => {
    await roomService.delete(id);
    await fetchRooms();
  };

  return { rooms, loading, error, fetchRooms, createRoom, updateRoom, deleteRoom };
};