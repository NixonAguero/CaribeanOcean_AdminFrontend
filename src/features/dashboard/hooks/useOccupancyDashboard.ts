import { useCallback, useState } from 'react';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';
import { occupancyService } from '../services/occupancyService';
import type { OccupancyDashboardData, OccupancyDashboardParams } from '../types/occupancy';

export const useOccupancyDashboard = () => {
  const [dashboard, setDashboard] = useState<OccupancyDashboardData | null>(null);
  const { isLoading, error, withAsync } = useAsyncState();

  const fetchDashboard = useCallback(async (params: OccupancyDashboardParams) => {
    return await withAsync(async () => {
      const data = await occupancyService.getDashboard(params);
      setDashboard(data);
    });
  }, [withAsync]);

  return {
    dashboard,
    loading: isLoading,
    error,
    fetchDashboard,
  };
};
