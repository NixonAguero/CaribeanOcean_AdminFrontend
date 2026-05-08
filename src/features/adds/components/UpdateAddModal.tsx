import { useState, useEffect, useRef } from 'react';
import type { Add } from '../types/add.types';
import styles from '../styles/Add.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (add: Add) => Promise<void>;
  add: Add;
}

export default function UpdateAddModal({ isOpen, onClose, onUpdate, add }: Props) {
  const [formData, setFormData] = useState<{
    imageUrl: string;
    targetUrl: string;
  }>({
    imageUrl: '',
    targetUrl: '',
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(add?.imageURL || null);
const [imgError, setImgError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (add && isOpen) {
      setFormData({
        imageUrl: add.imageURL,
        targetUrl: add.targetURL,
      });
      setPreviewUrl(add.imageURL);
      setSubmitError(null);
      setImgError(false);
    }
  }, [add, isOpen]);
  

  if (!isOpen || !add) return null;

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'imageUrl') {
      const nextPreviewUrl = String(value).trim();
      setPreviewUrl(nextPreviewUrl || null);
      setImgError(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(add.imageURL);
    }
  };

/*   const handleUploadClick = () => {
    fileInputRef.current?.click();
  }; */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!add) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    const updatedAdd: Add = {
        ...add,   
        imageURL: formData.imageUrl,     
        targetURL: formData.targetUrl,
    };

    const result = await onUpdate(updatedAdd);

    setIsSubmitting(false);

    if (result !== undefined) {
      setSubmitError('An error occurred while updating the add');
    } else {
      onClose();
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
          {submitError && <div style={{ color: '#D85A30', marginBottom: '16px', fontSize: '14px' }}>{submitError}</div>}
          
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Image URL</h3>
            <input 
              className={styles.input}
              style={{ background: '#FDFCFA', border: '1px solid #E5E7EB', height: '36px', borderRadius: '6px' }}
              type="text" 
              value={formData.imageUrl || ''} 
              onChange={e => handleChange('imageUrl', e.target.value)}
              required
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field.')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Target URL</h3>
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <textarea 
              className={styles.input}
              value={formData.targetUrl || ''} 
              onChange={e => handleChange('targetUrl', e.target.value)}
              style={{ minHeight: '80px', resize: 'vertical', background: '#FDFCFA', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 16px' }}
              required
              onInvalid={e => (e.target as HTMLTextAreaElement).setCustomValidity('Please fill out this field.')}
              onInput={e => (e.target as HTMLTextAreaElement).setCustomValidity('')}
            />
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Image preview</h3>
          <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
                {previewUrl && (
                <>
                    {!imgError ? (
                    <img
                        src={previewUrl.trim()}
                        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB', marginBottom: '12px' }}
                        onError={() => setImgError(true)}
                    />
                    ) : (
                    <div style={{ color: '#D85A30', fontSize: '14px', marginBottom: '12px' }}>
                        Could not load image from the provided URL.
                    </div>
                    )}
                </>
               )}
             <input
               type="file"
               accept="image/jpeg, image/png, image/webp"
               onChange={handleImageChange}
               style={{ display: 'none' }}
               ref={fileInputRef}
             />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '16px', borderTop: 'none', padding: '0' }}>
            <button type="submit" disabled={isSubmitting} style={{ padding: '8px 16px', background: '#E5E7EB', color: '#1A1A1A', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '14px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
