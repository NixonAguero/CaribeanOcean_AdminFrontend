import { useState, useEffect, useRef } from 'react';
import type { RoomType } from '../types/rooms.types';
import { updateRoomType } from '../services/rooms.service';
import styles from '../styles/modals.module.css';


interface UpdateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  roomType: RoomType | null;
}

export default function UpdateRoomModal({ isOpen, onClose, onSuccess, roomType }: UpdateRoomModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    dailyRate: number | string;
    image: File | null;
  }>({
    name: '',
    description: '',
    dailyRate: 0,
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (roomType && isOpen) {
      setFormData({
        name: roomType.name,
        description: roomType.description,
        dailyRate: roomType.dailyRate,
        image: null,
      });
      setPreviewUrl(roomType.imageUrl);
      setError(null);
    }
  }, [roomType, isOpen]);

  if (!isOpen || !roomType) return null;



  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomType) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('dailyRate', (formData.dailyRate || 0).toString());
      if (formData.image) {
        payload.append('image', formData.image);
      }

      await updateRoomType(roomType.id, payload);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error updating room');
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
            <h2 className={styles.sectionLabel} style={{ fontSize: '20px' }}>{roomType.name}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Discard changes and close">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalBody} style={{ padding: '0' }}>
          {error && <div style={{ color: '#D85A30', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
          
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <input 
              className={styles.input}
              style={{ background: '#FDFCFA', border: '1px solid #E5E7EB', height: '36px', borderRadius: '6px' }}
              type="text" 
              value={formData.name || ''} 
              onChange={e => handleChange('name', e.target.value)}
              required
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field.')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Description</h3>
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <textarea 
              className={styles.input}
              value={formData.description || ''} 
              onChange={e => handleChange('description', e.target.value)}
              style={{ minHeight: '80px', resize: 'vertical', background: '#FDFCFA', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 16px' }}
              required
              onInvalid={e => (e.target as HTMLTextAreaElement).setCustomValidity('Please fill out this field.')}
              onInput={e => (e.target as HTMLTextAreaElement).setCustomValidity('')}
            />
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Fee</h3>
          <div className={styles.formGroup} style={{ marginBottom: '20px', width: '50%' }}>
            <input 
              className={styles.input}
              style={{ background: '#FDFCFA', border: '1px solid #E5E7EB', height: '36px', borderRadius: '6px' }}
              type="text" 
              inputMode="decimal"
              value={formData.dailyRate === 0 && formData.dailyRate.toString() !== '0' ? '' : formData.dailyRate} 
              onChange={e => {
                const val = e.target.value;
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  handleChange('dailyRate', val);
                }
              }}
              required
              onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field.')}
              onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Image</h3>
          <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
             {previewUrl && <img src={previewUrl} alt="Room" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB', marginBottom: '12px' }} />}
             <input
               type="file"
               accept="image/jpeg, image/png, image/webp"
               onChange={handleImageChange}
               style={{ display: 'none' }}
               ref={fileInputRef}
             />
             <button type="button" onClick={handleUploadClick} style={{ width: '120px', padding: '6px 12px', background: '#E5E7EB', color: '#374151', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' }}>Upload new image</button>
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
