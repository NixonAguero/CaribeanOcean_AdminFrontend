import analyticsClient from '../../../shared/services/analyticsClient';
import type {
  RevenueKPIs,
  MonthlyRevenue,
  RoomTypeRevenue,
  OfferRevenue,
  DateRangeParams,
} from '../types/revenue';

export const revenueService = {
  async getKPIs(params: DateRangeParams): Promise<RevenueKPIs> {
    const response = await analyticsClient.get<RevenueKPIs>('/api/v1/revenue/kpis', { params });
    console.log('KPIs response:', response.data);
    return response.data;
  },

  async getByMonth(params: DateRangeParams): Promise<MonthlyRevenue[]> {
    const response = await analyticsClient.get<MonthlyRevenue[]>('/api/v1/revenue/by-month', { params });
    console.log('Monthly revenue response:', response.data);  
    return response.data;
  },

  async getByRoomType(params: DateRangeParams): Promise<RoomTypeRevenue[]> {
    const response = await analyticsClient.get<RoomTypeRevenue[]>('/api/v1/revenue/by-room-type', { params });
    console.log('Room type revenue response:', response.data);
    return response.data;
  },

  async getByOffer(params: DateRangeParams): Promise<OfferRevenue[]> {
    const response = await analyticsClient.get<OfferRevenue[]>('/api/v1/revenue/by-offer', { params });
    console.log('Offer revenue response:', response.data);
    return response.data;
  },
};