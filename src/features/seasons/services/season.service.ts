import type { SeasonType } from '../types/season.types';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '';

// GET - obtener todas las seasons
export const GetAllSeasons = async (): Promise<SeasonType[]> => {
  const response = await fetch(`${BASE_URL}/api/Season`);

  if (!response.ok) {
    throw new Error(`Failed to fetch seasons: ${response.status} ${response.statusText}`);
  }

  return await response.json(); // 👈 ya viene con fechas como string
};

//  POST - crear season
export const createSeason = async (payload: {
  name: string;
  startDate: Date;
  endDate: Date;
  discountAmount: number;
}): Promise<SeasonType> => {
  const response = await fetch(`${BASE_URL}/api/Season`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      startDate: payload.startDate.toISOString(), 
      endDate: payload.endDate.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create season: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

// 🔹 PUT - actualizar season
export const updateSeason = async (
  id: number,
  payload: {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    discountAmount?: number;
  }
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/Season/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      startDate: payload.startDate?.toISOString(),
      endDate: payload.endDate?.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update season: ${response.status} ${response.statusText}`);
  }
};

// 🔹 DELETE - eliminar season
export const deleteSeason = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/Season/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete season: ${response.status} ${response.statusText}`);
  }
};
