import type { RoomType, UpdateRoomTypePayload } from '../types/rooms.types';

import juniorImg from '../../../assets/rooms/junior.jpg';
import standardImg from '../../../assets/rooms/standard.jpg';
import premiumImg from '../../../assets/rooms/premium.jpg';

const MOCK_ROOM_TYPES: RoomType[] = [
  {
    id: 1,
    name: 'Junior',
    description:
      'Comfortable room with modern amenities, perfect for short stays. Includes free WiFi, ocean view, and a king-size bed.',
    daily_rate: 300,
    image_url: juniorImg,
    updated_at: '2026-03-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'Standart',
    description:
      'Spacious room with elegant decor, two beds, free WiFi, and a private balcony overlooking the garden.',
    daily_rate: 450,
    image_url: standardImg,
    updated_at: '2026-03-15T10:00:00Z',
  },
  {
    id: 3,
    name: 'Premiun',
    description:
      'Luxurious suite with private pool, panoramic ocean view, king-size bed, and exclusive amenities for a premium experience.',
    daily_rate: 700,
    image_url: premiumImg,
    updated_at: '2026-03-15T10:00:00Z',
  },
];

export const fetchRoomTypes = async (): Promise<RoomType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_ROOM_TYPES]), 400);
  });
};

export const updateRoomType = async (
  id: number,
  payload: UpdateRoomTypePayload
): Promise<RoomType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_ROOM_TYPES.findIndex((rt) => rt.id === id);
      if (index === -1) {
        reject(new Error(`Room type with id ${id} not found`));
        return;
      }
      MOCK_ROOM_TYPES[index] = { ...MOCK_ROOM_TYPES[index], ...payload };
      resolve({ ...MOCK_ROOM_TYPES[index] });
    }, 400);
  });
};
