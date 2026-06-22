import apiClient from "../../../shared/services/apliClient";
import type { ActivityLog, ActivityLogFilters } from "../types/activityLog.types";

export const activityLogService = {
  async getAll(filters?: ActivityLogFilters): Promise<ActivityLog[]> {
    const params: Record<string, string | number> = {};

    if (filters?.id !== undefined && filters.id !== "") {
      params.id = filters.id;
    }
    if (filters?.username && filters.username.trim() !== "") {
      params.username = filters.username.trim();
    }
    if (filters?.dateFrom && filters.dateFrom !== "") {
      params.dateFrom = filters.dateFrom;
    }
    if (filters?.dateTo && filters.dateTo !== "") {
      params.dateTo = filters.dateTo;
    }
    if (filters?.actionCode !== undefined && filters.actionCode !== "") {
      params.actionCode = filters.actionCode;
    }

    const response = await apiClient.get<ActivityLog[]>("/ActivityLog", { params });
    return response.data;
  },
};
