// src/features/booking/components/ReservationFormModal.tsx

import React, { useState, useEffect } from 'react';

import styles from '../styles/modals.module.css';
import { buildCreatePayload, buildUpdatePayload, buildFormDataFromReservation, buildFormDataFromWizard } from '../utils/ReservationFormUtils';
import { type ReservationFormData, type Reservation, type WizardData } from '../types/reservation.types';
import { useDateVerification } from '../hooks/useDateVerification';
import { Alert } from '../../../shared/components/Alert/Alert';
import { Spinner } from '../../../shared/components/Spinner/Spinner';

interface ReservationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation | null;
  wizardData?: WizardData | null;
  // NEW: Add this callback
  onSubmit: (data: any) => Promise<{ hasError: boolean; errorMessage?: string }>;
}



const ReservationFormModal = ({
  isOpen,
  onClose,
  reservation,
  wizardData,
  onSubmit,
}: ReservationFormModalProps) => {
  const isUpdating = !!reservation;


  // 👇 Añadimos manejadores exclusivos para la confirmación de este form
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORM STATE ---
  const [formData, setFormData] = useState<ReservationFormData>({
    clientName: "",
    clientLastname: "",
    checkIn: "",
    checkOut: "",
    roomTypeId: 0,
    seasonId: 1,
    cardNumber: "",
    totalAmount: 0,
  });

  const INITIAL_FORM_DATA = {
    clientName: '',
    clientLastname: '',
    checkIn: '',
    checkOut: '',
    roomTypeId: 0,
    seasonId: 1,
    cardNumber: '',
    totalAmount: 0,
  };


  const verificationFlow = useDateVerification();
  // When the modal opens, reset the form state based on what was passed in
  useEffect(() => {
    if (!isOpen) return;

    if (isUpdating && reservation) {
      setFormData(buildFormDataFromReservation((reservation)))
      return;
    }

    if (wizardData) {
      setFormData(buildFormDataFromWizard((wizardData)))
      return;
    }

    setFormData(INITIAL_FORM_DATA);
  }, [isOpen, isUpdating, reservation, wizardData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null); // Borramos error previo
    setIsSubmitting(true); // Encendemos la rueda propia de la creación
    const payload = isUpdating ? buildUpdatePayload(formData, reservation?.id) : buildCreatePayload(formData);

    // Result ahora trae lo que escupe nuestra envoltura: { data, hasError, errorMessage }
    const result = await onSubmit(payload);

    setIsSubmitting(false);
    if (result.hasError) {
      //  ¡Atrapamos el error aquí mismo dentro del formulario! No cerramos el modal.
      setSubmitError(result.errorMessage || 'Ocurrió un error inesperado al guardar');
    } else {
      // Si todo fue un éxito, procedemos a cerrarlo.
      onClose();
    }
  };

  const updateFormField = <K extends keyof ReservationFormData>(
    field: K,
    value: ReservationFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isUpdating ? `Update Reservation ${reservation?.code}` : 'Complete Reservation'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>

            {/* Context Alert when creating */}
            {!isUpdating && (
              <div style={{ backgroundColor: 'var(--badge-available-bg)', color: 'var(--badge-available-text)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '13px', fontWeight: 600 }}>
                Room availability confirmed. Please complete guest details.
              </div>
            )}

            <div className={styles.formGrid}>
              {/* Client Name */}
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input required className={styles.input} type="text"
                  value={formData.clientName} onChange={(e) => updateFormField('clientName', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input required className={styles.input} type="text"
                  value={formData.clientLastname} onChange={(e) => updateFormField('clientLastname', e.target.value)} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>

                <div className={styles.dateHeader}>
                  <label className={styles.label} style={{ fontSize: '13px', textTransform: 'uppercase', margin: 0 }}>
                    Reservation Dates
                  </label>

                  {isUpdating && !verificationFlow.isEditingDates && (
                    /* Cambié 'btn-action' por un estilo más sutil para que no pelee con el botón principal de guardar */
                    <button type="button" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => verificationFlow.startEditing(formData.checkIn, formData.checkOut)}>
                      Change Dates
                    </button>
                  )}
                </div>

                {!verificationFlow.isEditingDates ? (
                  <div className={styles.dateRow}>
                    {/* 👇 Agregamos styles.formGroup para que recupere su tamaño y márgenes originales 👇 */}
                    <div className={`${styles.formGroup} ${styles.dateCol}`} style={{ margin: 0 }}>
                      <label className={styles.label}>Check In</label>
                      <input required className={styles.input} type="date" value={formData.checkIn} disabled />
                    </div>
                    <div className={`${styles.formGroup} ${styles.dateCol}`} style={{ margin: 0 }}>
                      <label className={styles.label}>Check Out</label>
                      <input required className={styles.input} type="date" value={formData.checkOut} disabled />
                    </div>
                  </div>
                ) : (
                  <div className={styles.verificationBox}>
                    <div className={styles.dateRow} style={{ marginBottom: '1.5rem' }}>
                      {/* 👇 Agregamos styles.formGroup aquí también 👇 */}
                      <div className={`${styles.formGroup} ${styles.dateCol}`} style={{ margin: 0 }}>
                        <label className={styles.label}>New Check In</label>
                        <input required className={styles.input} type="date"
                          value={verificationFlow.tempDates.checkIn}
                          onChange={(e) => verificationFlow.setTempDates({ ...verificationFlow.tempDates, checkIn: e.target.value })} />
                      </div>
                      <div className={`${styles.formGroup} ${styles.dateCol}`} style={{ margin: 0 }}>
                        <label className={styles.label}>New Check Out</label>
                        <input required className={styles.input} type="date"
                          value={verificationFlow.tempDates.checkOut}
                          onChange={(e) => verificationFlow.setTempDates({ ...verificationFlow.tempDates, checkOut: e.target.value })} />
                      </div>
                    </div>

                    {/* Sustituyes el texto rojo feo de antes por la cajita */}
                    {verificationFlow.verificationError && (
                      <Alert type="error">{verificationFlow.verificationError}</Alert>
                    )}

                    <div className={styles.verificationActions}>
                      <button type="button" className="btn-secondary" onClick={verificationFlow.cancelEditing}>
                        Cancel
                      </button>
                      <button type="button" className="btn-primary"
                        onClick={() => verificationFlow.verifyDates(formData.roomTypeId, (newIn, newOut) => {
                          updateFormField('checkIn', newIn);
                          updateFormField('checkOut', newOut);
                        })}
                        disabled={verificationFlow.isVerifying}>
                        {/*  Spinner pequeño DENTRO del botón */}
                        {verificationFlow.isVerifying ? (
                          <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Spinner size="sm" color="white" /> Verificando...
                          </span>
                        ) : 'Verify Availability'}

                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Selections */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Room Type</label>
                <select required className={styles.input}
                  value={formData.roomTypeId} onChange={(e) => updateFormField('roomTypeId', Number(e.target.value))}
                  disabled={true}> {/* Locked! */}
                  <option value={0} disabled>Select Room Type...</option>
                  <option value={1}>Standard Room</option>
                  <option value={2}>Ocean View Suite</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Season</label>
                <select required className={styles.input}
                  value={formData.seasonId} onChange={(e) => updateFormField('seasonId', Number(e.target.value))}>
                  <option value={1}>High Season</option>
                  <option value={2}>Low Season</option>
                </select>
              </div>

              {/* Payment Info */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Credit Card Number</label>
                <input required className={styles.input} type="text" placeholder="****-****-****-****"
                  value={isUpdating ? reservation?.creditCardMasked : formData.cardNumber}
                  onChange={(e) => updateFormField('cardNumber', e.target.value)}
                  disabled={isUpdating} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Total Amount ($)</label>
                <input required className={styles.input} type="number" step="0.01"
                  value={formData.totalAmount || ''} onChange={(e) => updateFormField('totalAmount', Number(e.target.value))} />
              </div>
            </div>

            {submitError && (
              <div style={{ marginTop: '1.5rem' }}>
                <Alert type="error" title="No se pudo guardar la reserva">{submitError}</Alert>
              </div>
            )}


          </div>

          <div className={styles.modalFooter}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={verificationFlow.isEditingDates || isSubmitting}>
              {isSubmitting ? (
                <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Spinner size="sm" color="white" /> Guardando...
                </span>
              ) : (
                isUpdating ? 'Save Changes' : 'Confirm & Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationFormModal;
