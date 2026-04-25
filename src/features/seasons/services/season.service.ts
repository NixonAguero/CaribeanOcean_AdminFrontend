import type { SeasonType } from '../types/season.types';

import apiClient from "../../../shared/services/apliClient";

export const GetAllSeasons = async (): Promise<SeasonType[]> => {
  const response = await apiClient.get<SeasonType[]>("/Season");

  return response.data;
};

export const createSeason = async (payload: {
  name: string;
  startDate: Date;
  endDate: Date;
  discountAmount: number;
}): Promise<SeasonType> => {
  const response = await apiClient.post<SeasonType>("/Season", payload);

  return response.data;
};

export const updateSeason = async (
  id: number,
  payload: {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    discountAmount?: number;
  }
): Promise<void> => {
  await apiClient.put(`/Season/${id}`, {
    ...payload,
    startDate: payload.startDate?.toISOString(),
    endDate: payload.endDate?.toISOString(),
  });
};

export const deleteSeason = async (id: number): Promise<void> => {
  await apiClient.delete(`/Season/${id}`);
};
