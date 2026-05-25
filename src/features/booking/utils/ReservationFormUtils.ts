import { type Reservation, type CreateReservation, type UpdateReservation, type WizardData, type ReservationFormData } from '../types/reservation.types';


const formatDateForInput = (date: string) =>
  new Date(date).toISOString().split('T')[0];

export const buildFormDataFromReservation = (reservation: Reservation) => ({
  clientName: reservation.clientName,
  clientLastname: reservation.clientLastname,
  email: reservation.email ?? '',
  checkIn: formatDateForInput(reservation.checkIn),
  checkOut: formatDateForInput(reservation.checkOut),

  roomTypeId: reservation.roomTypeId,


  cardNumber: '',


  applyOffers: reservation.pricingUsedOffer ?? false,
  selectedOfferId: reservation.selectedOfferId ?? null
});

export const buildFormDataFromWizard = (wizardData: WizardData) => ({
  clientName: '',
  clientLastname: '',
  email: '',

  checkIn: wizardData.checkIn,
  checkOut: wizardData.checkOut,

  roomTypeId: wizardData.roomTypeId,
  cardNumber: '',

  applyOffers: false,
  selectedOfferId: null,
});

export const buildCreatePayload = (formData: ReservationFormData): CreateReservation => ({
  roomTypeId: formData.roomTypeId,
  clientName: formData.clientName,
  clientLastname: formData.clientLastname,
  email: formData.email,
  cardNumber: formData.cardNumber,
  checkIn: formData.checkIn,
  checkOut: formData.checkOut,
  applyOffers: formData.applyOffers,
  selectedOfferId: formData.applyOffers ? formData.selectedOfferId : null,
});

export const buildUpdatePayload = (formData: ReservationFormData, id: number): UpdateReservation => ({
  id: id ?? 0,
  clientName: formData.clientName,
  clientLastname: formData.clientLastname,
  email: formData.email,
  checkIn: formData.checkIn,
  checkOut: formData.checkOut,
});

