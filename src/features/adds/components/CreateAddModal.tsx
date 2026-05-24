import { useState, useRef } from "react";
import type { createAddModalProps } from "../types/add.props";
import styles from '../styles/Add.module.css';

export default function CreateAddModal({ onCreate, onClose }: createAddModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [TargetUrl, setTargetUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
        setLocalError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (!file) {
            setLocalError('Please select an image.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onCreate(file, TargetUrl);
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
                    {/* Imagen — reemplaza el campo de texto por file picker */}
                    <div className={styles.formGroup}>
                        <label>Ad Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                height: '160px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                background: '#fafafa',
                                marginBottom: '8px',
                            }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <span style={{ color: '#aaa', fontSize: '14px' }}>
                                    Click to select an image
                                </span>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            className={styles.submitButton}
                            style={{ width: '100%' }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {file ? 'Change image' : 'Upload image'}
                        </button>
                        {file && (
                            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                {file.name}
                            </p>
                        )}
                    </div>

                    {/* Target URL — igual que antes */}
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
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting || !file}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Offer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
