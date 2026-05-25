import { useState, useEffect, useRef } from 'react';
import styles from '../styles/modals.module.css';

interface CreateRoomTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: FormData) => Promise<{ data: unknown; hasError: boolean } | undefined>;
}



export default function CreateRoomTypeModal({ isOpen, onClose, onCreate }: CreateRoomTypeModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    dailyRate: number | string;
    image: File | null;
  }>({
    name: '',
    description: '',
    dailyRate: '',
    image: null,
  });
  const [featuresInput, setFeaturesInput] = useState<[string, string, string]>(['', '', '']);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        description: '',
        dailyRate: '',
        image: null,
      });
      setFeaturesInput(['', '', '']);
      setPreviewUrl(null);
      setSubmitError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
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
    
    setIsSubmitting(true);
    setSubmitError(null);

    const features = featuresInput.filter(f => f.trim() !== '');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    payload.append('dailyRate', (formData.dailyRate || 0).toString());
    payload.append('features', JSON.stringify(features));
    if (formData.image) {
      payload.append('image', formData.image);
    }

    const result = await onCreate(payload);

    setIsSubmitting(false);

    if (result?.hasError) {
      setSubmitError('Error al crear el tipo de habitación. Por favor, intente de nuevo.');
    } else {
      onClose();
    }
  };

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
              width: '24px', height: '24px', borderRadius: '50%', background: '#FDFCFA', border: '2px solid #1A1A1A',
              color: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '14px', fontWeight: 'bold' 
            }}>+</span>
            <h2 className={styles.sectionLabel} style={{ fontSize: '20px' }}>Add Room Type</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Discard changes and close">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalBody} style={{ padding: '0' }}>
          {submitError && <div style={{ color: '#D85A30', marginBottom: '16px', fontSize: '14px' }}>{submitError}</div>}
          
          <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
            <input 
              className={styles.input}
              placeholder="Room Type Name"
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
              placeholder="Describe the room features, beds, views..."
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
              placeholder="0.00"
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

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Features</h3>
          <div className={styles.formGroup} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {([0, 1, 2] as const).map((idx) => (
              <input
                key={idx}
                className={styles.input}
                type="text"
                placeholder={`Feature ${idx + 1} (optional)`}
                value={featuresInput[idx]}
                onChange={e => {
                  const updated: [string, string, string] = [...featuresInput] as [string, string, string];
                  updated[idx] = e.target.value;
                  setFeaturesInput(updated);
                }}
                style={{ background: '#FDFCFA', border: '1px solid #E5E7EB', height: '36px', borderRadius: '6px' }}
              />
            ))}
          </div>

          <h3 className={styles.sectionLabel} style={{ marginBottom: '8px' }}>Image</h3>
          <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
             {previewUrl ? (
               <img src={previewUrl} alt="Room" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB', marginBottom: '12px' }} />
             ) : (
               <div style={{ 
                 width: '100%', height: '140px', background: '#F5F0E8', border: '1px dashed #C9B878', 
                 borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                 justifyContent: 'center', color: '#6B6B6B', marginBottom: '12px', fontSize: '13px'
               }}>
                 <span style={{ fontSize: '24px', marginBottom: '4px' }}>🖼️</span>
                 No image uploaded yet
               </div>
             )}
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
              {isSubmitting ? 'Creating...' : 'Create Room Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
