import analyticsClient from '../../../shared/services/analyticsClient';
import type { OccupancyDashboardData, OccupancyDashboardParams } from '../types/occupancy';

export const occupancyService = {
  async getDashboard(params: OccupancyDashboardParams): Promise<OccupancyDashboardData> {
    const response = await analyticsClient.get<OccupancyDashboardData>(
      '/api/v1/occupancy/dashboard',
      { params },
    );

    return response.data;
  },
};
