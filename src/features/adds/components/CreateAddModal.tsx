import { useState } from "react";
import type { createAddModalProps } from "../types/add.props";
import styles from '../styles/Add.module.css';

export default function CreateAddModal({ onCreate, onClose }: createAddModalProps) {
    const [ImageUrl, setImageUrl] = useState('');
    const [TargetUrl, setTargetUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        setIsSubmitting(true);
        try {
            await onCreate({
                ImageUrl,
                TargetUrl,
                UpdatedAt: new Date().toISOString(),
                UpdatedBy: 1,
                Active: true,
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
                        <label>Image URL</label>
                        <input
                            className={styles.formInput}
                            required
                            value={ImageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Target URL</label>
                        <input
                            className={styles.formInput}
                            required
                            value={TargetUrl}
                            onChange={e => setTargetUrl(e.target.value)}
                            placeholder="Enter target URL"
                        />
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