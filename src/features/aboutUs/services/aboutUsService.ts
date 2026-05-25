import apiClient from '../../../shared/services/apliClient';
import type { AboutUsContent } from '../types/aboutUs.types';
import { getUserId } from '../../authentication/services/session.service';

export const aboutUsService = {
  async getContent(): Promise<AboutUsContent> {
    const response = await apiClient.get<AboutUsContent>('/AboutUs');
    return response.data;
  },

  async updateContent(payload: AboutUsContent): Promise<void> {
    const userId = getUserId() || 1;
    
    const body = {
      id: 1,
      title: payload.title,
      subTitle: payload.subtitle,
      description: payload.description,
      updateBy: userId,
    };

    await apiClient.put('/AboutUs', body);
  },
};
