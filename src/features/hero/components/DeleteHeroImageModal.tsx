import type { HeroImage } from '../types/hero.types';
import styles from '../../roomType/styles/modals.module.css';

interface DeleteHeroImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  image: HeroImage | null;
  isDeleting: boolean;
}

export default function DeleteHeroImageModal({ isOpen, onClose, onConfirm, image, isDeleting }: DeleteHeroImageModalProps) {
  if (!isOpen || !image) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '400px' }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Delete Image</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
            disabled={isDeleting}
          >
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {image.url && (
            <img
              src={image.url}
              alt={image.alt}
              style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--color-golden-sand)', marginBottom: '16px' }}
            />
          )}

          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Are you sure you want to delete this image?
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', margin: 0 }}>
            Alt: <span style={{ color: 'var(--color-text-primary)' }}>{image.alt}</span>
          </p>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '13px', color: 'var(--color-coral-sunset)', marginTop: '12px', marginBottom: 0 }}>
            This action cannot be undone.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            style={{ padding: '8px 20px', background: 'transparent', color: 'var(--color-text-secondary)', border: '1px solid var(--admin-topbar-border)', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', cursor: isDeleting ? 'not-allowed' : 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            id={`confirm-delete-hero-image-btn-${image.id}`}
            style={{ padding: '8px 20px', background: 'var(--color-coral-sunset)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, cursor: isDeleting ? 'not-allowed' : 'pointer', opacity: isDeleting ? 0.7 : 1 }}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
