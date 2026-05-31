import { useState, useEffect } from 'react';
import type { Offer } from '../types/offers.type';
import { useRoomTypes } from '../../roomType/hooks/useRoomTypes';
import styles from '../styles/Offers.module.css';

type ModalMode = 'create' | 'edit' | 'delete';

interface Props {
    mode: ModalMode;
    offer?: Offer;
    onAdd: (offer: Omit<Offer, 'id'>) => Promise<void>;
    onUpdate: (offer: Offer) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onClose: () => void;
}

export default function OfferModal({ mode, offer, onAdd, onUpdate, onDelete, onClose }: Props) {
    const { roomTypes, fetchRoomTypes } = useRoomTypes();

    const formatDateForInput = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        } catch {
            return dateStr;
        }
    };

    const [name, setName] = useState(offer?.name ?? '');
    const [description, setDescription] = useState(offer?.description ?? '');
    const [discount, setDiscount] = useState(offer?.discount ?? 0);
    const [startDate, setStartDate] = useState(offer ? formatDateForInput(offer.startDate) : '');
    const [endDate, setEndDate] = useState(offer ? formatDateForInput(offer.endDate) : '');
    const [roomTypeId, setRoomTypeId] = useState<number>(offer?.roomTypeId ?? 0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (mode !== 'delete') {
            fetchRoomTypes();
        }
    }, [fetchRoomTypes, mode]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (new Date(startDate) > new Date(endDate)) {
            setLocalError('End date must be after start date.');
            return;
        }

        setIsSubmitting(true);
        try {
            const roomTypeName = roomTypes.find(rt => rt.id === Number(roomTypeId))?.name || '';

            if (mode === 'create') {
                await onAdd({
                    name,
                    description,
                    discount,
                    startDate,
                    endDate,
                    roomTypeId,
                    roomType: roomTypeName,
                    updatedBy: 1
                });
            } else if (mode === 'edit' && offer) {
                await onUpdate({
                    id: offer.id,
                    name,
                    description,
                    discount,
                    startDate,
                    endDate,
                    roomTypeId,
                    roomType: roomTypeName || offer.roomType,
                    updatedBy: offer.updatedBy
                });
            }
            onClose();
        } catch (error: any) {
            setLocalError(error.message || `Failed to ${mode} offer.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!offer) return;
        setIsSubmitting(true);
        setLocalError('');
        try {
            await onDelete(offer.id);
            onClose();
        } catch (err: any) {
            setLocalError(err.message || 'Failed to delete offer.');
            setIsSubmitting(false);
        }
    };

    const title = mode === 'create' ? 'Create New Offer'
        : mode === 'edit' ? 'Update Offer'
            : 'Delete Offer';

    const submitLabel = mode === 'create' ? 'Save Offer'
        : mode === 'edit' ? 'Update Offer'
            : 'Delete';

    const submittingLabel = mode === 'create' ? 'Saving...'
        : mode === 'edit' ? 'Updating...'
            : 'Deleting...';

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 className={styles.modalTitle}>{title}</h2>
                {localError && <p className={styles.error}>{localError}</p>}

                {mode === 'delete' ? (
                    <>
                        <p>Are you sure you want to delete the offer <strong>"{offer?.name}"</strong>? This action cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelButton} onClick={onClose} disabled={isSubmitting}>
                                Cancel
                            </button>
                            <button
                                className={styles.deleteButton}
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '30px' }}
                                onClick={handleDelete}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? submittingLabel : submitLabel}
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <div className={styles.formGroup}>
                            <label>Name</label>
                            <input className={styles.formInput} required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Discount (%)</label>
                            <input type="number" step="0.01" min="1" max="100" className={styles.formInput} required value={discount} onChange={e => setDiscount(Number(e.target.value))} />
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
                                {isSubmitting ? submittingLabel : submitLabel}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
