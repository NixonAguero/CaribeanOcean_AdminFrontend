// src/features/booking/components/ReservationFormModal.tsx

import React from 'react';
import { type  Reservation } from '../types/reservation.types';
import styles from '../styles/modals.module.css';

interface ReservationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation | null; // If null, we are creating. If populated, we are updating.
}

const ReservationFormModal: React.FC<ReservationFormModalProps> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  if (!isOpen) return null;

  const isUpdating = !!reservation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    // TODO: Connect API call here
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isUpdating ? `Update Reservation ${reservation?.code}` : 'Add Reservation'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGrid}>
               {/* Client Name */}
               <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input required className={styles.input} type="text" defaultValue={reservation?.clientName} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input required className={styles.input} type="text" defaultValue={reservation?.clientLastname} />
              </div>

              {/* Dates */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Check In</label>
                <input required className={styles.input} type="date" 
                  defaultValue={reservation ? new Date(reservation.checkIn).toISOString().split('T')[0] : ''} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Check Out</label>
                <input required className={styles.input} type="date" 
                   defaultValue={reservation ? new Date(reservation.checkOut).toISOString().split('T')[0] : ''} />
              </div>

              {/* Selections */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Room Type</label>
                <select className={styles.input} defaultValue={reservation?.roomTypeId}>
                  <option value="">Select Room Type...</option>
                  <option value="1">Standard Room</option>
                  <option value="2">Ocean View Suite</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Season</label>
                <select className={styles.input} defaultValue={reservation?.seasonId}>
                  <option value="1">High Season</option>
                  <option value="2">Low Season</option>
                </select>
              </div>

              {/* Payment Info */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Credit Card Number</label>
                <input required className={styles.input} type="text" placeholder="****-****-****-****" 
                       defaultValue={isUpdating ? reservation?.creditCardMasked : ''} 
                       disabled={isUpdating} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Total Amount ($)</label>
                <input required className={styles.input} type="number" step="0.01" defaultValue={reservation?.totalAmount} />
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isUpdating ? 'Save Changes' : 'Create Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationFormModal;
