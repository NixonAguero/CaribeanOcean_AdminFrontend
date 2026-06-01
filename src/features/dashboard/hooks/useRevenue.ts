import { useState, useCallback } from 'react';
import type {
  RevenueKPIs,
  MonthlyRevenue,
  RoomTypeRevenue,
  OfferRevenue,
  DateRangeParams,
} from '../types/revenue';
import { revenueService } from '../services/revenueService';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';

export const useRevenue = () => {
  const [kpis, setKpis] = useState<RevenueKPIs | null>(null);
  const [byMonth, setByMonth] = useState<MonthlyRevenue[]>([]);
  const [byRoomType, setByRoomType] = useState<RoomTypeRevenue[]>([]);
  const [byOffer, setByOffer] = useState<OfferRevenue[]>([]);
  const { isLoading, error, withAsync } = useAsyncState();

  const fetchAll = useCallback(async (params: DateRangeParams) => {
    return await withAsync(async () => {
      const [kpisData, monthData, roomData, offerData] = await Promise.all([
        revenueService.getKPIs(params),
        revenueService.getByMonth(params),
        revenueService.getByRoomType(params),
        revenueService.getByOffer(params),
      ]);

      setKpis(kpisData);
      setByMonth(monthData);
      setByRoomType(roomData);
      setByOffer(offerData);
    });
  }, []);

  return {
    kpis,
    byMonth,
    byRoomType,
    byOffer,
    loading: isLoading,
    error,
    fetchAll,
  };
};