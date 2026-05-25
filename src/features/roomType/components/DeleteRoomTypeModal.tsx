import type { RoomType } from '../types/rooms.types';
import styles from '../styles/modals.module.css';

interface DeleteRoomTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  roomType: RoomType | null;
  isDeleting?: boolean;
}

export default function DeleteRoomTypeModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  roomType,
  isDeleting = false
}: DeleteRoomTypeModalProps) {
  
  if (!isOpen || !roomType) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        style={{ maxWidth: '420px', padding: '16px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader} style={{ padding: '0 0 16px 0', borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ 
              width: '24px', height: '24px', borderRadius: '50%', background: '#FAECE7', border: '2px solid #D85A30',
              color: '#D85A30', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '14px', fontWeight: 'bold' 
            }}>⚠️</span>
            <h2 className={styles.sectionLabel} style={{ fontSize: '20px', color: '#D85A30' }}>Delete Room Type</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cancel and close">
            &times;
          </button>
        </div>
        
        <div className={styles.modalBody} style={{ padding: '0', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#1A1A1A', lineHeight: '1.6', margin: '0 0 12px 0' }}>
            Are you sure you want to delete the room type <strong>"{roomType.name}"</strong>?
          </p>
          <p style={{ fontSize: '13px', color: '#D85A30', lineHeight: '1.6', margin: '0' }}>
            This action cannot be undone and will permanently remove this room type and its rates from the system.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '16px', borderTop: 'none', padding: '0', gap: '8px' }}>
          <button 
            type="button" 
            onClick={onConfirm} 
            disabled={isDeleting}
            style={{ 
              padding: '8px 16px', 
              background: '#D85A30', 
              color: '#FFFFFF',
              border: '1px solid #D85A30', 
              borderRadius: '4px', 
              fontSize: '14px', 
              cursor: isDeleting ? 'not-allowed' : 'pointer'
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isDeleting}
            style={{ 
              padding: '8px 16px', 
              background: '#E5E7EB', 
              color: '#1A1A1A', 
              border: '1px solid #D1D5DB', 
              borderRadius: '4px', 
              fontSize: '14px', 
              cursor: isDeleting ? 'not-allowed' : 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
