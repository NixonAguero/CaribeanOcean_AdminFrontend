import type { DateRangeParams } from './revenue';

export interface OccupancyDashboardParams extends DateRangeParams {
  forecast_days: number;
}

export interface HistoricalOccupancyPoint {
  date: string;
  occupancy_rate: number;
}

export interface ForecastOccupancyPoint {
  date: string;
  predicted_occupancy_rate: number;
  confidence: number | null;
}

export interface OccupancyDashboardData {
  historical: HistoricalOccupancyPoint[];
  forecast: ForecastOccupancyPoint[];
  avg_predicted_occupancy_rate: number;
  peak_predicted_date: string;
  peak_predicted_occupancy_rate: number;
}
