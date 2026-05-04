import { useState, useEffect } from 'react';
import type { Offer } from '../../types/offers.type';
import { useRoomTypes } from '../../../roomType/hooks/useRoomTypes';
import styles from '../../styles/Offers.module.css';

interface Props {
    offer: Offer;
    onUpdate: (offer: Offer) => Promise<void>;
    onClose: () => void;
}

export default function UpdateOfferModal({ offer, onUpdate, onClose }: Props) {
    const { roomTypes, fetchRoomTypes } = useRoomTypes();
    const [name, setName] = useState(offer.name);
    const [description, setDescription] = useState(offer.description);
    const [discount, setDiscount] = useState(offer.discount);

    const formatDateForInput = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;

            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${year}-${month}-${day}`;
        } catch (e) {
            return dateStr;
        }
    };

    const [startDate, setStartDate] = useState(formatDateForInput(offer.startDate));
    const [endDate, setEndDate] = useState(formatDateForInput(offer.endDate));
    const [roomTypeId, setRoomTypeId] = useState<number>(offer.roomTypeId);
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
            await onUpdate({
                id: offer.id,
                name,
                description,
                discount,
                startDate,
                endDate,
                roomTypeId,
                roomType: roomTypes.find(rt => rt.id === Number(roomTypeId))?.name || offer.roomType,
                updatedBy: offer.updatedBy
            });
            onClose();
        } catch (error: any) {
            setLocalError(error.message || 'Failed to update offer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className={styles.modalTitle}>Update Offer</h2>
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
                            {isSubmitting ? 'Updating...' : 'Update Offer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}