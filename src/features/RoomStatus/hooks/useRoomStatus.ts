import { useEffect, useState } from "react";
import { getRoomStatusToday } from "../services/roomStatus.service";
import type { RoomStatus } from "../types/roomStatus.types";

export const useRoomStatus = () => {
  const [rooms, setRooms] = useState<RoomStatus[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getRoomStatusToday(selectedRoomType ?? undefined)
      .then(setRooms)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedRoomType]);

  return {
    rooms,
    loading,
    selectedRoomType,
    setSelectedRoomType
  };
};