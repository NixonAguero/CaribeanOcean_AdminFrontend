import { useState } from "react";
import type { ActivityLogFilters } from "../types/activityLog.types";

interface ActivityLogFilterPanelProps {
  filters: ActivityLogFilters;
  onApply: (filters: ActivityLogFilters) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function ActivityLogFilterPanel({
  filters,
  onApply,
  onClear,
  isLoading,
}: ActivityLogFilterPanelProps) {
  const [local, setLocal] = useState<ActivityLogFilters>(filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocal((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(local);
  };

  const handleClear = () => {
    const empty: ActivityLogFilters = {};
    setLocal(empty);
    onClear();
  };

  const hasActiveFilters =
    Object.values(filters).some((v) => v !== undefined && v !== "");

  return (
    <div className="al-filter-panel">
      <div className="al-filter-header">
        <span className="al-filter-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
        </span>
        {hasActiveFilters && (
          <span className="al-filter-active-badge">Active</span>
        )}
      </div>

      <form className="al-filter-form" onSubmit={handleApply}>
        <div className="al-filter-grid">
          <div className="al-filter-field">
            <label className="al-filter-label" htmlFor="al-filter-id">Log ID</label>
            <input
              id="al-filter-id"
              type="number"
              name="id"
              className="al-filter-input"
              placeholder="e.g. 12"
              value={local.id ?? ""}
              onChange={handleChange}
              min={1}
            />
          </div>

          <div className="al-filter-field">
            <label className="al-filter-label" htmlFor="al-filter-username">Username</label>
            <input
              id="al-filter-username"
              type="text"
              name="username"
              className="al-filter-input"
              placeholder="e.g. admin1"
              value={local.username ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="al-filter-field">
            <label className="al-filter-label" htmlFor="al-filter-actionCode">Action Code</label>
            <input
              id="al-filter-actionCode"
              type="number"
              name="actionCode"
              className="al-filter-input"
              placeholder="e.g. 203"
              value={local.actionCode ?? ""}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="al-filter-field">
            <label className="al-filter-label" htmlFor="al-filter-dateFrom">Date From</label>
            <input
              id="al-filter-dateFrom"
              type="date"
              name="dateFrom"
              className="al-filter-input"
              value={local.dateFrom ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="al-filter-field">
            <label className="al-filter-label" htmlFor="al-filter-dateTo">Date To</label>
            <input
              id="al-filter-dateTo"
              type="date"
              name="dateTo"
              className="al-filter-input"
              value={local.dateTo ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="al-filter-actions">
          <button
            type="submit"
            className="al-btn-apply"
            disabled={isLoading}
          >
            {isLoading ? "Loading…" : "Apply Filters"}
          </button>
          <button
            type="button"
            className="al-btn-clear"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
