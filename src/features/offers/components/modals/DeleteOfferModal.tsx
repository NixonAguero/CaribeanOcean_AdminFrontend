import { useState } from 'react';
import type { Offer } from '../../types/offers.type';
import styles from '../../styles/Offers.module.css';

interface Props {
    offer: Offer;
    onDelete: (id: number) => Promise<void>;
    onClose: () => void;
}

export default function DeleteOfferModal({ offer, onDelete, onClose }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setIsDeleting(true);
        setError('');
        try {
            await onDelete(offer.id);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to delete offer.');
            setIsDeleting(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Delete Offer</h2>

                {error && <p className={styles.error}>{error}</p>}

                <p>Are you sure you want to delete the offer <strong>"{offer.name}"</strong>? This action cannot be undone.</p>

                <div className={styles.modalActions}>
                    <button className={styles.cancelButton} onClick={onClose} disabled={isDeleting}>
                        Cancel
                    </button>
                    <button className={styles.deleteButton} style={{ padding: '0.75rem 1.5rem', borderRadius: '30px' }} onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}