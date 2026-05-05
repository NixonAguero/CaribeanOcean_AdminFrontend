import { useState, useEffect, useRef } from 'react';
import type { HeroImage } from '../types/hero.types';
import styles from '../../roomType/styles/modals.module.css';

interface EditHeroImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, payload: FormData) => Promise<{ data: unknown; hasError: boolean } | undefined>;
  image: HeroImage | null;
}

export default function EditHeroImageModal({ isOpen, onClose, onUpdate, image }: EditHeroImageModalProps) {
  const [alt, setAlt] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image && isOpen) {
      setAlt(image.alt);
      setNewImage(null);
      setPreviewUrl(image.url);
      setSubmitError(null);
    }
  }, [image, isOpen]);

  if (!isOpen || !image) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setNewImage(null);
    setSubmitError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = new FormData();
    payload.append('alt', alt);
    if (newImage) {
      payload.append('image', newImage);
    }

    const result = await onUpdate(image.id, payload);
    setIsSubmitting(false);

    if (result?.hasError) {
      setSubmitError('Error updating the image. Please try again.');
    } else {
      handleClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '440px' }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Image #{image.id}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Discard changes and close"
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
              id={`edit-hero-alt-${image.id}`}
              className={styles.input}
              type="text"
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
                alt={alt || 'Hero image preview'}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--color-golden-sand)', marginBottom: '12px' }}
              />
            )}
            <input
              id={`edit-hero-image-file-${image.id}`}
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{ width: '160px', padding: '8px 12px', background: 'var(--color-sand-white)', color: 'var(--color-text-primary)', border: '1px solid var(--color-golden-sand)', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer' }}
            >
              {newImage ? 'Change image' : 'Upload new image'}
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
              {isSubmitting ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
