export type RoomStatusValue = 'AVAILABLE' | 'OCCUPIED' | 'INACTIVE';

export interface RoomStatus {
  id: number;
  number: number;
  roomType: string;
  status: RoomStatusValue;
}