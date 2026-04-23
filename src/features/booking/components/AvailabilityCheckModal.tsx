// src/features/booking/components/AvailabilityCheckModal.tsx

import { useState } from 'react';
import { useRoomType } from '../../roomType/hooks/useRoomType';
import styles from '../styles/modals.module.css';
import type { WizardData } from '../types/reservation.types';
import { Alert } from '../../../shared/components/Alert/Alert';

// Ensure this matches where your C# server is running


interface AvailabilityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  // This callback passes the chosen dates and room to the parent so it can open the main Form Modal
  onRoomSelected: (data: WizardData) => void;
}



const AvailabilityCheckModal = ({ isOpen, onClose, onRoomSelected }: AvailabilityCheckModalProps) => {
  const { availableRooms, loading, error, checkAvailability } = useRoomType();
  const [availabilityFilters, setAvailabilityFilters] = useState({
    checkInDate: '',
    checkOutDate: '',
  });


  const updateAvailabilityField = (field: 'checkInDate' | 'checkOutDate', value: string) => {
    setAvailabilityFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  const handleCheckAvailability = async () => {
    if (!availabilityFilters.checkInDate || !availabilityFilters.checkOutDate) return;
    await checkAvailability(availabilityFilters.checkInDate, availabilityFilters.checkOutDate);

  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Check Availability</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          {/* Step 1: Pick Dates */}
          <div className={`${styles.formGrid} ${styles.wizardDateRow}`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Check In Date</label>
              <input
                className={styles.input}
                type="date"
                value={availabilityFilters.checkInDate}
                onChange={(e) => updateAvailabilityField('checkInDate', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Check Out Date</label>
              <input
                className={styles.input}
                type="date"
                value={availabilityFilters.checkOutDate}
                onChange={(e) => updateAvailabilityField('checkOutDate', e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <button
                className="btn-primary"
                onClick={handleCheckAvailability}
                disabled={!availabilityFilters.checkInDate || !availabilityFilters.checkOutDate || loading}
              >
                {loading ? 'Searching...' : 'Search Available Rooms'}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && <Alert type="error">{error}</Alert>}

          {/* Step 2: Show available rooms if we have searched */}
          {!loading && availableRooms !== null && (
            <div>
              <h3 className={styles.sectionTitle}>Available Options</h3>

              {availableRooms.length === 0 ? (
                <p className="text-body--secondary">No rooms available for these dates.</p>
              ) : (
                <div className={styles.resultsContainer}>
                  {availableRooms.map(room => (
                    <div key={room.id} className={styles.roomCard}>
                      <div>
                        <span className={styles.label} style={{ fontSize: '14px' }}>{room.name}</span>
                        <p className="text-body--secondary" style={{ margin: '4px 0' }}>{room.availableRooms} rooms left • ${room.dailyRate}/night</p>
                      </div>
                      <button
                        className="btn-action"
                        onClick={() => onRoomSelected({
                          checkIn: availabilityFilters.checkInDate,
                          checkOut: availabilityFilters.checkOutDate,
                          roomTypeId: room.id
                        })}
                      >
                        Book This
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCheckModal;
