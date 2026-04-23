// src/features/booking/ReservationPage.tsx

import { useEffect, useState } from 'react';
import ReservationsTable from './components/ReservationsTable';
import AvailabilityCheckModal from './components/AvailabilityCheckModal';
import ReservationFormModal from './components/ReservationFormModal';
import ManageReservationModal from './components/ManageReservationModal';

import { useReservations } from './hooks/useReservations'; // IMPORT OUR NEW HOOK!
import styles from './styles/reservations.module.css';
import { useReservationsModals } from './hooks/useReservationModals';
import { Alert } from '../../shared/components/Alert/Alert';
import { Spinner } from '../../shared/components/Spinner/Spinner';
import { ConfirmationModal } from '../../shared/components/Modal/ConfirmationModal';

const ReservationsPage = () => {
  // 1. Pull in our API functions
  const {
    reservations,
    loading,
    error,
    fetchReservations,
    createReservation,
    updateReservation,
    deleteReservation
  } = useReservations();

  const { modals, data, actions } = useReservationsModals();

  // 2. Fetch data when the page first loads
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };


  const handleFormSubmit = async (formData: any) => {
    if (data.selectedRes) {
      const result = await updateReservation(data.selectedRes.id, formData);
      if (!result.hasError) showSuccess("¡Reserva actualizada con éxito!");
      return result
    } else {
      const result = await createReservation(formData);
      if (!result.hasError) showSuccess("¡Reserva creada exitosamente!");
      return result;
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className={`page-header ${styles.headerFlex}`}>
          <div>
            <h1 className="page-header__title">Reservation Admin</h1>
            <p className="page-header__subtitle">
              Manage client bookings, update details, or create new reservations for Caribbean Ocean Resort & Spa.
            </p>
          </div>
          <button className="btn-action" onClick={actions.openAddFlow}>
            Add reservation
          </button>
        </header>
        <hr className="page-header__divider" />
        {/* Usalo para que el spinner ocupe el centro de la pantalla mientras carga */}
        {loading && reservations.length === 0 && (
          <Spinner centered size="lg" message="Cargando reservaciones del sistema..." />
        )}
        {/* Usa el Alert si hubo un colapso en la base de datos de C# */}
        {error && (
          <Alert type="error" title="Fallo de conexión crítico">
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert type="success" title="¡Acción Exitosa!">
            {successMessage}
          </Alert>
        )}
        {!loading && !error && (
          <ReservationsTable
            reservations={reservations}
            onManage={actions.openManageFlow}
            onUpdate={actions.openUpdateFlow}
            onDelete={actions.openDeleteFlow}
          />
        )}
        {/* ¡IMPORTANTE! Solo mostramos la tabla si NO hay error y NO esta cargando */}

        {/* Modal Portals */}
        <AvailabilityCheckModal
          isOpen={modals.isAvailabilityOpen}
          onClose={() => actions.setAvailabilityOpen(false)}
          onRoomSelected={actions.handleRoomSelected}
        />
        <ReservationFormModal
          isOpen={modals.isFormOpen}
          onClose={() => actions.setFormOpen(false)}
          reservation={data.selectedRes}
          wizardData={data.wizardData}
          onSubmit={handleFormSubmit}
        />
        <ManageReservationModal
          isOpen={modals.isManageOpen}
          onClose={() => actions.setManageOpen(false)}
          reservation={data.selectedRes}
        />

        <ConfirmationModal
          isOpen={modals.isDeleteOpen}
          onClose={() => actions.closeDeleteFlow()}
          title="Eliminate Reservation"
          message={`Are you sure you want to eliminate reservation ${data.selectedRes?.code}? This action cannot be undone.`}
          confirmText="Eliminate"
          onConfirm={async () => {
            const result = await deleteReservation(data.selectedRes!.id);
            if (!result.hasError) showSuccess("La reserva fue eliminada permanentemente.");
            return result;
          }}
        />
      </div>
    </div>
  );
};

export default ReservationsPage;
