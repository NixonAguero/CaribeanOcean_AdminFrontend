import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { activityLogService } from "../services/activityLog.service";
import type { ActivityLog, ActivityLogFilters } from "../types/activityLog.types";

export const useActivityLog = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ActivityLogFilters>({});

  const fetchLogs = useCallback(async (activeFilters?: ActivityLogFilters) => {
    setIsLoading(true);
    try {
      const data = await activityLogService.getAll(activeFilters);
      setLogs(data);
    } catch (error) {
      console.error("Error loading activity logs", error);
      toast.error("Error loading activity logs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLogs();
  }, [fetchLogs]);

  const applyFilters = (newFilters: ActivityLogFilters) => {
    setFilters(newFilters);
    void fetchLogs(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    void fetchLogs({});
  };

  return {
    logs,
    isLoading,
    filters,
    applyFilters,
    clearFilters,
    refetch: () => void fetchLogs(filters),
  };
};
