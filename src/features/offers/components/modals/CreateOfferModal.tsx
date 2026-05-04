import { useState, useEffect } from 'react';
import type { AddOfferProps } from '../../types/offers.props';
import { useRoomTypes } from '../../../roomType/hooks/useRoomTypes';
import styles from '../../styles/Offers.module.css';

interface Props extends AddOfferProps {
    onClose: () => void;
}

export default function CreateOfferModal({ onAdd, onClose }: Props) {
    const { roomTypes, fetchRoomTypes } = useRoomTypes();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [roomTypeId, setRoomTypeId] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        fetchRoomTypes();
    }, [fetchRoomTypes]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (new Date(startDate) > new Date(endDate)) {
            setLocalError('End date must be after start date.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onAdd({
                name,
                description,
                discount,
                startDate,
                endDate,
                roomTypeId,
                roomType: roomTypes.find(rt => rt.id === Number(roomTypeId))?.name || '',
                updatedBy: 1
            });
            onClose();
        } catch (error: any) {
            setLocalError(error.message || 'Failed to create offer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className={styles.modalTitle}>Create New Offer</h2>
                {localError && <p className={styles.error}>{localError}</p>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input className={styles.formInput} required value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Discount (%)</label>
                        <input type="number" min="1" max="100" className={styles.formInput} required value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Start Date</label>
                        <input type="date" className={styles.formInput} required value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>End Date</label>
                        <input type="date" className={styles.formInput} required value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Room Type</label>
                        <select className={styles.formInput} required value={roomTypeId} onChange={e => setRoomTypeId(Number(e.target.value))}>
                            <option value={0} disabled>Select a room type</option>
                            {roomTypes.map(rt => (
                                <option key={rt.id} value={rt.id}>{rt.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea className={styles.formInput} required value={description} onChange={e => setDescription(e.target.value)} rows={3} />
                    </div>

                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isSubmitting}>Cancel</button>
                        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Offer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}