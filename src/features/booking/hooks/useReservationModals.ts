import { useState } from 'react';
import { type Reservation, type WizardData } from '../types/reservation.types';


export const useReservationsModals = () => {

    // Estados de apertura / cierre de los modales
    const [isAvailabilityOpen, setAvailabilityOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isManageOpen, setManageOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);

    // Estados de datos temporales (selecciones)
    const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
    const [wizardData, setWizardData] = useState<WizardData | null>(null);

    const openAddFlow = () => {
        setSelectedRes(null);
        setWizardData(null);
        setAvailabilityOpen(true);
    };

    const handleRoomSelected = (data: WizardData) => {
        setAvailabilityOpen(false);
        setWizardData(data); // Pasas la entidad directa al estado!
        setFormOpen(true);
    };

    const openUpdateFlow = (reservation: Reservation) => {
        setSelectedRes(reservation);
        setWizardData(null);
        setFormOpen(true);
    };

    const openManageFlow = (reservation: Reservation) => {
        setSelectedRes(reservation);
        setManageOpen(true);
    };

    const openDeleteFlow = (reservation: Reservation) => {
        setSelectedRes(reservation);
        setDeleteOpen(true);
    };

    const closeDeleteFlow = () => {
        setDeleteOpen(false);
        setSelectedRes(null);
    };



    // Exponemos de forma limpia este "controlador" 
    return {
        modals: { isAvailabilityOpen, isFormOpen, isManageOpen, isDeleteOpen },
        data: { selectedRes, wizardData },
        actions: {
            setAvailabilityOpen, setFormOpen, setManageOpen,
            openAddFlow, handleRoomSelected, openUpdateFlow, openManageFlow,
            openDeleteFlow, closeDeleteFlow
        }
    }


}