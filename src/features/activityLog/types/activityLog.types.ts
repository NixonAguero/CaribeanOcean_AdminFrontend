export interface ActivityLog {
  id: number;
  username: string;
  actionCode: number;
  actionName: string;
  category: string;
  screen: string;
  detail: string | null;
  ipAddress: string;
  createdAt: string;
}

export interface ActivityLogFilters {
  id?: number | string;
  username?: string;
  dateFrom?: string;
  dateTo?: string;
  actionCode?: number | string;
}
