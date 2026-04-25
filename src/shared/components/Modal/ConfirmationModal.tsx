// src/shared/components/Modal/ConfirmationModal.tsx
import  { useState } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Alert } from '../Alert/Alert';
import styles from '../../../features/booking/styles/modals.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<{ hasError: boolean; errorMessage?: string }>;
  title: string;
  message: string;
  confirmText?: string;
}

export const ConfirmationModal = ({
  isOpen, onClose, onConfirm, title, message, confirmText = 'Delete'
}: ConfirmationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    const result = await onConfirm(); 
    
    setIsSubmitting(false);
    if (result.hasError) {
      setSubmitError(result.errorMessage || 'An unexpected error occurred while deleting.');
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      {/* We mix the global modalContent with our new confirmContent size limit */}
      <div className={`${styles.modalContent} ${styles.confirmContent}`}>
         <div className={styles.modalHeader}>
           <h2 className={`${styles.modalTitle} ${styles.dangerTitle}`}>{title}</h2>
           <button className={styles.closeButton} onClick={onClose} disabled={isSubmitting}>&times;</button>
         </div>
         
         <div className={styles.modalBody}>
           <p className={styles.confirmMessage}>{message}</p>
           {submitError && (
             <div className={styles.alertWrapper}>
               <Alert type="error" title="Action failed">{submitError}</Alert>
             </div>
           )}
         </div>

         <div className={styles.modalFooter}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="button" className={styles.btnDanger} onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? (
                 <span className={styles.btnSpinnerWrapper}>
                   <Spinner size="sm" color="white" /> Deleting...
                 </span>
              ) : (
                confirmText
              )}
            </button>
         </div>
      </div>
    </div>
  );
};
