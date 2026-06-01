import apiClient from '../../../shared/services/apliClient';
import type { LocationContent } from '../types/Location.types';
import { getUserId } from '../../authentication/services/session.service';

export const locationsService = {
  async getContent(): Promise<LocationContent> {
    const response = await apiClient.get<LocationContent>('/Locations');
    return response.data;
  },

  async updateContent(payload: LocationContent): Promise<void> {
    const userId = getUserId() || 1;
    
    const body = {
      title: payload.title,
      subTitle: payload.subtitle,
      description: payload.description,
      images: payload.images,
      updateBy: userId,
    };
    console.log('Updating Locations with payload:', body);
    await apiClient.put('/Locations', body);
  },
};
