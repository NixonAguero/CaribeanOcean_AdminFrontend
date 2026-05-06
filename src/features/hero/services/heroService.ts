import apiClient from '../../../shared/services/apliClient';
import type { HeroImage } from '../types/hero.types';

export const heroService = {
  async getImages(): Promise<HeroImage[]> {
    const response = await apiClient.get<HeroImage[]>('/Hero/images');
    return response.data;
  },

  async addImage(payload: FormData): Promise<void> {
    await apiClient.post('/Hero/images', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async updateImage(id: number, payload: FormData): Promise<void> {
    await apiClient.put(`/Hero/images/${id}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async deleteImage(id: number): Promise<void> {
    await apiClient.delete(`/Hero/images/${id}`);
  },
};
