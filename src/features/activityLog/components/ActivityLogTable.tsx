import type { ActivityLog } from "../types/activityLog.types";

interface ActivityLogTableProps {
  logs: ActivityLog[];
  isLoading: boolean;
}

/** Badge del action code según rango */
function getActionBadgeClass(code: number): string {
  if (code >= 100 && code < 200) return "al-badge al-badge--info";     // Auth
  if (code >= 200 && code < 300) return "al-badge al-badge--success";  // Rooms / Content
  if (code >= 300 && code < 400) return "al-badge al-badge--teal";     // Bookings
  if (code >= 400 && code < 500) return "al-badge al-badge--warning";  // Warnings
  if (code >= 500) return "al-badge al-badge--danger";                 // Errors
  return "al-badge al-badge--neutral";
}

/** Badge de categoría con colores semánticos */
function getCategoryBadgeClass(category: string): string {
  switch (category.toLowerCase()) {
    case "authentication": return "al-cat al-cat--auth";
    case "rooms":          return "al-cat al-cat--rooms";
    case "booking":
    case "reservations":   return "al-cat al-cat--booking";
    case "content":        return "al-cat al-cat--content";
    case "marketing":      return "al-cat al-cat--marketing";
    default:               return "al-cat al-cat--default";
  }
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export default function ActivityLogTable({ logs, isLoading }: ActivityLogTableProps) {

  if (isLoading) {
    return (
      <div className="al-loading">
        <div className="al-spinner" />
        <p>Loading activity logs…</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="al-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="12" y2="17" />
        </svg>
        <p>No activity logs found for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="al-table-wrapper">
      <div className="al-table-container">
        <div className="al-table-meta">
          <span className="al-record-count">
            {logs.length} record{logs.length !== 1 ? "s" : ""} found
          </span>
        </div>

      <table className="al-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date &amp; Time</th>
            <th>Username</th>
            <th>Action</th>
            <th>Category</th>
            <th>Screen</th>
            <th>Detail</th>
            <th>IP Address</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>

              {/* ID */}
              <td>
                <span className="al-id">#{log.id}</span>
              </td>

              {/* Fecha */}
              <td>
                <span className="al-timestamp">{formatDate(log.createdAt)}</span>
              </td>

              {/* Username */}
              <td>
                <span className="al-username">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {log.username}
                </span>
              </td>

              {/* Action: código + nombre */}
              <td>
                <div className="al-action-cell">
                  <span className={getActionBadgeClass(log.actionCode)}>
                    {log.actionCode}
                  </span>
                  <span className="al-action-name">{log.actionName}</span>
                </div>
              </td>

              {/* Category */}
              <td>
                <span className={getCategoryBadgeClass(log.category)}>
                  {log.category}
                </span>
              </td>

              {/* Screen */}
              <td>
                <span className="al-screen">{log.screen}</span>
              </td>

              {/* Detail */}
              <td>
                {log.detail ? (
                  <span className="al-details">
                    {log.detail}
                  </span>
                ) : (
                  <span className="al-no-details">—</span>
                )}
              </td>

              {/* IP */}
              <td>
                <span className="al-ip">{log.ipAddress}</span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
