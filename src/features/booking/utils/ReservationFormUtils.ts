import { type Reservation, type CreateReservation, type UpdateReservation, type WizardData, type ReservationFormData } from '../types/reservation.types';


  const formatDateForApi = (date: string) => new Date(date).toISOString();

  const formatDateForInput = (date: string) =>
    new Date(date).toISOString().split('T')[0];
  
export const buildFormDataFromReservation = (reservation: Reservation) => ({
    Id: reservation.id,
    clientName: reservation.clientName,
    clientLastname: reservation.clientLastname,
    checkIn: formatDateForInput(reservation.checkIn),
    checkOut: formatDateForInput(reservation.checkOut),
    roomTypeId: reservation.roomTypeId,
    seasonId: reservation.seasonId,
    cardNumber: '',
    totalAmount: reservation.totalAmount,
  });

  export const buildFormDataFromWizard = (wizardData: WizardData) => ({
      clientName: '',
      clientLastname: '',
      checkIn: wizardData.checkIn,
      checkOut: wizardData.checkOut,
      roomTypeId: wizardData.roomTypeId,
      seasonId: 1,
      cardNumber: '',
      totalAmount: 0,
});

 export const buildCreatePayload = (formData: ReservationFormData): CreateReservation => ({
    roomTypeId: formData.roomTypeId,
    seasonId: formData.seasonId,
    clientName: formData.clientName,
    clientLastname: formData.clientLastname,
    cardNumber: formData.cardNumber,
    checkIn: formatDateForApi(formData.checkIn),
    checkOut: formatDateForApi(formData.checkOut),
    totalAmount: formData.totalAmount,
  });

  export const buildUpdatePayload = (formData: ReservationFormData, id: number): UpdateReservation => ({
    Id: id,
    roomTypeId: formData.roomTypeId,
    clientName: formData.clientName,
    clientLastname: formData.clientLastname,
    seasonId: formData.seasonId,
    checkIn: formatDateForApi(formData.checkIn),
    checkOut: formatDateForApi(formData.checkOut),
    totalAmount: formData.totalAmount,
  });

