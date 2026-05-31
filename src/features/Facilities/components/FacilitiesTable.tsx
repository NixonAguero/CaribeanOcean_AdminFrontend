import type { Facility } from "../types/facility";
import styles from "../styles/facilities.module.css";

interface FacilitiesTableProps {
  facilities: Facility[];
  onUpdate: (facility: Facility) => void;
  onDelete: (facility: Facility) => void;
}

export default function FacilitiesTable({
  facilities,
  onUpdate,
  onDelete,
}: FacilitiesTableProps) {
  if (facilities.length === 0) {
    return (
      <div className={`${styles.tableContainer} ${styles.emptyState}`}>
        <p className="text-body--secondary">
          No facilities found. Click "Add facility" to start.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.imageCell}>Preview</th>
            <th>Name</th>
            <th>Description</th>
            <th>Features</th>
            <th>Display Order</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map((fac) => {
            const featureTags = Array.isArray(fac.features) ? fac.features : [];

            return (
              <tr key={fac.id} className={styles.tableRow}>
                <td>
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className={styles.thumbnail}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/80x52?text=No+img";
                    }}
                  />
                </td>
                <td className={styles.nameHighlight}>{fac.name}</td>
                <td>
                  <div className={styles.descriptionText} title={fac.description}>
                    {fac.description || <span className="text-body--secondary">—</span>}
                  </div>
                </td>
                <td>
                  <div className={styles.featuresList}>
                    {featureTags.length > 0 ? (
                      featureTags.map((tag, idx) => (
                        <span key={idx} className={styles.featureTag}>
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-body--secondary">—</span>
                    )}
                  </div>
                </td>
                <td className={styles.orderHighlight}>{fac.displayOrder}</td>
                <td>
                  {fac.active ? (
                    <span className={styles.badgeActive}>Active</span>
                  ) : (
                    <span className={styles.badgeInactive}>Inactive</span>
                  )}
                </td>
                <td>
                  <div className={styles.actionsCell}>
                    <button className="btn-action" onClick={() => onUpdate(fac)}>
                      Update
                    </button>
                    <button
                      className="btn-action btn-action--delete"
                      onClick={() => onDelete(fac)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
