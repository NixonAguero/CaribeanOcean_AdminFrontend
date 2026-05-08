import { useEffect, useState } from "react";
import { getRoomStatusToday } from "../services/roomStatus.service";
import type { RoomStatus } from "../types/roomStatus.types";

export const useRoomStatus = () => {
  const [rooms, setRooms] = useState<RoomStatus[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  console.log("🔄 useRoomStatus effect fired");
  console.log("➡️ selectedRoomType:", selectedRoomType);

  setLoading(true);

  getRoomStatusToday(selectedRoomType ?? undefined)
    .then((data) => {
      console.log("✅ rooms from API:", data);
      setRooms(data);
    })
    .catch((err) => {
      console.error("❌ API error:", err);
    })
    .finally(() => setLoading(false));
}, [selectedRoomType]);

  return {
    rooms,
    loading,
    selectedRoomType,
    setSelectedRoomType
  };
};