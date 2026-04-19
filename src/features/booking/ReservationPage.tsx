// src/features/booking/ReservationPage.tsx

import React, { useState } from 'react';
import ReservationsTable from './components/ReservationsTable';
import ReservationFormModal from './components/ReservationFormModal';
import ManageReservationModal from './components/ManageReservationModal';
import { type Reservation } from './types/reservation.types';

const dummyData: Reservation[] = [
  {
    id: 1,
    code: 'RES-001',
    roomId: 101,
    roomTypeId: 2,
    roomTypeName: 'Ocean View Suite',
    creditCardMasked: '****-****-****-1234',
    seasonId: 1,
    seasonName: 'High Season',
    clientName: 'Jane',
    clientLastname: 'Doe',
    checkIn: '2026-11-20T14:00:00Z',
    checkOut: '2026-11-25T11:00:00Z',
    totalAmount: 1250.00,
    isActive: true,
  },
  {
    id: 2,
    code: 'RES-002',
    roomId: 205,
    roomTypeId: 1,
    roomTypeName: 'Standard Room',
    creditCardMasked: '****-****-****-9876',
    seasonId: 2,
    seasonName: 'Low Season',
    clientName: 'John',
    clientLastname: 'Smith',
    checkIn: '2026-10-15T14:00:00Z',
    checkOut: '2026-10-18T11:00:00Z',
    totalAmount: 450.00,
    isActive: true,
  }
];

const ReservationsPage: React.FC = () => {
  // Application UI State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  
  // Track which reservation is currently selected
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleAddReservationClick = () => {
    setSelectedReservation(null); // Null means we are creating
    setIsFormModalOpen(true);
  };

  const handleUpdate = (reservation: Reservation) => {
    setSelectedReservation(reservation); // Populate the form context
    setIsFormModalOpen(true);
  };

  const handleManage = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsManageModalOpen(true);
  };

  const handleDelete = (reservation: Reservation) => {
    if (window.confirm(`Are you sure you want to delete ${reservation.code}?`)) {
      console.log("Delete confirmed for:", reservation.code);
      // TODO API request
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-header__title">Reservation Admin</h1>
            <p className="page-header__subtitle">
              Manage client bookings, update details, or create new reservations for Caribbean Ocean Resort & Spa.
            </p>
          </div>
          
          <button className="btn-action" onClick={handleAddReservationClick}>
            Add reservation
          </button>
        </header>

        <hr className="page-header__divider" />

        <ReservationsTable 
          reservations={dummyData} 
          onManage={handleManage}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        {/* Modal Portals */}
        <ReservationFormModal 
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          reservation={selectedReservation}
        />

        <ManageReservationModal 
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          reservation={selectedReservation}
        />

      </div>
    </div>
  );
};

export default ReservationsPage;
