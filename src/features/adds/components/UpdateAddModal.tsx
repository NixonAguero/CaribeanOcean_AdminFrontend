import { useState, useEffect, useRef } from 'react';
import type { Add } from '../types/add.types';
import styles from '../styles/Add.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (add: Add, newImage: File | null) => Promise<void>;  // ← firma actualizada
  add: Add;
}

export default function UpdateAddModal({ isOpen, onClose, onUpdate, add }: Props) {
  const [targetUrl, setTargetUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (add && isOpen) {
      setTargetUrl(add.targetURL);
      setPreviewUrl(add.imageURL);
      setFile(null);
      setSubmitError(null);
      setImgError(false);
    }
  }, [add, isOpen]);

  if (!isOpen || !add) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setImgError(false);
    } else {
      setFile(null);
      setPreviewUrl(add.imageURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!add) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const updatedAdd: Add = {
        ...add,
        targetURL: targetUrl,
      };
      await onUpdate(updatedAdd, file);
      onClose();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while updating the add');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '420px', padding: '16px' }}>
        
        <div className={styles.modalHeader} style={{ padding: '0 0 16px 0', borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              width: '24px', height: '24px', borderRadius: '50%', background: '#FDFCFA', border: '2px solid #1A1A1A',
              color: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 'bold'
            }}>i</span>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Discard changes and close">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody} style={{ padding: '0' }}>
          {submitError && (
            <div style={{ color: '#D85A30', marginBottom: '16px', fontSize: '14px' }}>
              {submitError}
            </div>
          )}

          {/* Target URL */}
          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Target URL</h3>
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <textarea
              className={styles.input}
              value={targetUrl}
              onChange={e => setTargetUrl(e.target.value)}
              style={{ minHeight: '80px', resize: 'vertical', background: '#FDFCFA', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 16px' }}
              required
              onInvalid={e => (e.target as HTMLTextAreaElement).setCustomValidity('Please fill out this field.')}
              onInput={e => (e.target as HTMLTextAreaElement).setCustomValidity('')}
            />
          </div>

          {/* Image */}
          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Image</h3>
          <div className={styles.formGroup} style={{ marginBottom: '24px' }}>

            {/* Preview clickeable */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%', height: '160px', borderRadius: '6px',
                border: '1px solid #E5E7EB', marginBottom: '8px',
                overflow: 'hidden', cursor: 'pointer', background: '#fafafa',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {previewUrl && !imgError ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span style={{ color: '#aaa', fontSize: '14px' }}>
                  {imgError ? 'Could not load image.' : 'Click to select an image'}
                </span>
              )}
            </div>

            {/* Input oculto */}
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />

            {/* Botón visible */}
            <button
              type="button"
              className={styles.submitButton}
              style={{ width: '100%', marginBottom: '4px' }}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? 'Change image' : 'Upload new image'}
            </button>

            {file && (
              <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {file.name}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '16px', padding: '0' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '8px 16px', background: '#E5E7EB', color: '#1A1A1A',
                border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '14px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
