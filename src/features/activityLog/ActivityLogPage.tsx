import "./styles/ActivityLog.css";
import { useActivityLog } from "./hooks/useActivityLog";
import ActivityLogFilterPanel from "./components/ActivityLogFilterPanel";
import ActivityLogTable from "./components/ActivityLogTable";

const ActivityLogPage = () => {
  const { logs, isLoading, filters, applyFilters, clearFilters } =
    useActivityLog();

  return (
    <div className="al-page">
      <div className="al-header">
        <div>
          <h1 className="al-page-title">Activity Log</h1>
          <p className="al-subtitle">
            Audit trail of all administrative actions in the system
          </p>
        </div>
      </div>

      <ActivityLogFilterPanel
        filters={filters}
        onApply={applyFilters}
        onClear={clearFilters}
        isLoading={isLoading}
      />

      <ActivityLogTable logs={logs} isLoading={isLoading} />
    </div>
  );
};

export default ActivityLogPage;
