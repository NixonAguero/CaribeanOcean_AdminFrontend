export interface RoomType {
  id: number;
  name: string;
  description: string;
  daily_rate: number;
  image_url: string;
  updated_at: string;
}

export interface UpdateRoomTypePayload {
  name?: string;
  description?: string;
  daily_rate?: number;
  image_url?: string;
}
