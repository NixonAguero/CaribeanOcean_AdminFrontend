export interface RevenueKPIs {
  total_revenue: number;
  avg_night_price: number;
  total_reservations: number;
  avg_revenue_per_reservation: number;
  date_from: string;
  date_to: string;
}

export interface MonthlyRevenue {
  year: number;
  month: number;
  month_label: string;
  total: number;
}

export interface RoomTypeRevenue {
  room_type: string;
  total: number;
}

export interface OfferRevenue {
  offer_name: string;
  total: number;
  reservations_count: number;
}

export interface DateRangeParams {
  date_from: string;
  date_to: string;
}