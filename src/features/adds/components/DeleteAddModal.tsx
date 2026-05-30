import { useState } from "react";
import type { Add } from "../types/add.types";
import styles from '../styles/Add.module.css';

interface Props {
    add: Add;
    onDelete: (id: number) => Promise<void>;
    onClose: () => void;
}

export default function DeleteAddModal({ add, onDelete, onClose }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        setIsDeleting(true);
        setError('');
        try {
            await onDelete(add.id);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to delete add.');
            setIsDeleting(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Delete Add</h2>

                {error && <p className={styles.error}>{error}</p>}

                <p>Are you sure you want to delete the add? This action cannot be undone.</p>

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