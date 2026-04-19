export interface RoomType {
  id: number;
  name: string;
  description: string;
  dailyRate: number;
  imageUrl: string;
  updatedAt: string;
}

export interface UpdateRoomTypePayload {
  name?: string;
  description?: string;
  dailyRate?: number;
  imageUrl?: string;
}
