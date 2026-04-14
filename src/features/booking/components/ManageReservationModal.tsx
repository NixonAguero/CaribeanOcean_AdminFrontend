// src/features/booking/components/ManageReservationModal.tsx

import React from 'react';
import { type Reservation } from '../types/reservation.types';
import styles from '../styles/modals.module.css';

interface ManageReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation | null;
}

const ManageReservationModal: React.FC<ManageReservationModalProps> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    console.log("Printing information for:", reservation.code);
    window.print(); // Simple invocation of the browser print dialog
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.manageContent}`}>
        <h2 className="heading-display--sm" style={{ marginBottom: '1rem' }}>
          Manage Booking
        </h2>
        <p className="text-body--secondary" style={{ marginBottom: '2rem' }}>
          Reservation: <strong>{reservation.code}</strong> <br/>
          Guest: {reservation.clientName} {reservation.clientLastname}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn-primary" onClick={handlePrint} style={{ width: '100%' }}>
            Print Information
          </button>
          <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
            Return to Administration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageReservationModal;
