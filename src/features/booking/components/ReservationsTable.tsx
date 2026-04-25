// src/features/booking/components/ReservationsTable.tsx

import { type Reservation } from '../types/reservation.types';
import styles from '../styles/reservations.module.css';

interface ReservationsTableProps {
  reservations: Reservation[];
  onManage: (reservation: Reservation) => void;
  onUpdate: (reservation: Reservation) => void;
  onDelete: (reservation: Reservation) => void;
}

const ReservationsTable = ({
  reservations,
  onManage,
  onUpdate,
  onDelete,
}: ReservationsTableProps) => {
  if (reservations.length === 0) {
    return (
      <div className={`${styles.tableContainer} ${styles.emptyState}`}>
        <p className="text-body--secondary">No reservations found. Click "Add reservation" to start.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Guest</th>
            <th>Space</th>
            <th>Check In/Out</th>
            <th>Total Cost</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} className={styles.tableRow}>
              <td className={styles.codeHighlight}>{res.code}</td>
              <td>
                {res.clientName} {res.clientLastname}
              </td>
              <td>{res.roomTypeName}</td>
              <td>
                <span className={`text-body--secondary ${styles.dateCellText}`}>
                  {new Date(res.checkIn).toLocaleDateString()} - <br/>
                  {new Date(res.checkOut).toLocaleDateString()}
                </span>
              </td>
              <td className={styles.priceHighlight}>${res.totalAmount.toFixed(2)}</td>
              <td>
                <div className={styles.actionsCell}>
                  {/* Using the global '.btn-action' class */}
                  <button className="btn-action" onClick={() => onManage(res)}>Manage</button>
                  <button className="btn-action" onClick={() => onUpdate(res)}>Update</button>
                  <button className="btn-action btn-action--delete" onClick={() => onDelete(res)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
