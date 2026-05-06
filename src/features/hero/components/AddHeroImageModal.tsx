import { useState, useRef } from 'react';
import styles from '../../roomType/styles/modals.module.css';

interface AddHeroImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: FormData) => Promise<{ data: unknown; hasError: boolean } | undefined>;
}

export default function AddHeroImageModal({ isOpen, onClose, onAdd }: AddHeroImageModalProps) {
  const [alt, setAlt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setAlt('');
    setImage(null);
    setPreviewUrl(null);
    setSubmitError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setSubmitError('Please select an image file.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = new FormData();
    payload.append('alt', alt);
    payload.append('image', image);

    const result = await onAdd(payload);
    setIsSubmitting(false);

    if (result?.hasError) {
      setSubmitError('Error adding the image. Please try again.');
    } else {
      handleClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '440px' }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Hero Image</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {submitError && (
            <div style={{ color: 'var(--color-coral-sunset)', marginBottom: '16px', fontSize: '14px', fontFamily: 'Lato, sans-serif' }}>
              {submitError}
            </div>
          )}

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Alt text</h3>
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <input
              id="add-hero-alt"
              className={styles.input}
              type="text"
              placeholder="Describe the image…"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              required
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Image</h3>
          <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--color-golden-sand)', marginBottom: '12px' }}
              />
            )}
            <input
              id="add-hero-image-file"
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{ width: '140px', padding: '8px 12px', background: 'var(--color-sand-white)', color: 'var(--color-text-primary)', border: '1px solid var(--color-golden-sand)', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer' }}
            >
              {image ? 'Change image' : 'Select image'}
            </button>
          </div>

          <div className={styles.modalFooter} style={{ margin: '0 -24px -24px', borderTop: '1px solid var(--color-sand-white)' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{ padding: '8px 20px', background: 'transparent', color: 'var(--color-text-secondary)', border: '1px solid var(--admin-topbar-border)', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Saving…' : 'Add image'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
