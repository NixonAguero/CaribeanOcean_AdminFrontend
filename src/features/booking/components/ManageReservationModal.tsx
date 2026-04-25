// src/features/booking/components/ManageReservationModal.tsx

import { type Reservation } from '../types/reservation.types';
import styles from '../styles/modals.module.css';

interface ManageReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation | null;
}

const ManageReservationModal = ({
  isOpen,
  onClose,
  reservation,
}: ManageReservationModalProps) => {
  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    console.log("Printing information for:", reservation.code);
    window.print(); // Simple invocation of the browser print dialog
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.manageContent}`}>
        
        <h2 className={`heading-display--sm ${styles.manageTitle}`}>
          Manage Booking
        </h2>
        
        <div className={`text-body--secondary ${styles.manageDetails}`}>
          <p><strong>Code:</strong> {reservation.code}</p>
          <p><strong>Guest:</strong> {reservation.clientName} {reservation.clientLastname}</p>
          <p><strong>Room:</strong> {reservation.roomTypeName}</p>
          <p><strong>Dates:</strong> {new Date(reservation.checkIn).toLocaleDateString()} - {new Date(reservation.checkOut).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${reservation.totalAmount.toFixed(2)}</p>
        </div>

        <div className={styles.btnGroupVertical}>
          <button className={`btn-primary ${styles.btnFull}`} onClick={handlePrint}>
            Print Information
          </button>
          <button className={`btn-secondary ${styles.btnFull}`} onClick={onClose}>
            Return to Administration
          </button>
        </div>

      </div>
    </div>
  );
};

export default ManageReservationModal;
