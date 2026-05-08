export interface Reservation {
  id: number;
  code: string;
  roomId: number;
  roomTypeId: number;
  roomTypeName: string;
  creditCardMasked: string;
  clientName: string;
  clientLastname: string;
  email?: string | null;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  totalAmount: number;
  isActive?: boolean;
  pricingUsedOffer?: boolean;
  selectedOfferId?: number | null;
}


export interface CreateReservation {
  roomTypeId: number;

  clientName: string;
  clientLastname: string;
  email?: string | null;

  cardNumber: string;

  checkIn: string;
  checkOut: string;

  applyOffers: boolean;
  selectedOfferId: number | null;
}

export interface UpdateReservation {
  id: number;

  clientName: string;
  clientLastname: string;
  email?: string | null;

  checkIn: string;
  checkOut: string;
}

export interface AvailableRoomTypeInfo {
  id: number;
  name: string;
  description?: string;
  dailyRate: number;
  imageUrl?: string;
  updatedAt: string; // ISO date
  active: boolean;
  availableRooms: number;
}

export type ReservationFormData = {
  clientName: string;
  clientLastname: string;
  email: string;

  checkIn: string;
  checkOut: string;

  roomTypeId: number;
  cardNumber: string;

  applyOffers: boolean;
  selectedOfferId: number | null;
};

export interface WizardData {
  checkIn: string;
  checkOut: string;
  roomTypeId: number;
}

export type UpdateReservationFormData = {
  clientName: string;
  clientLastname: string;
  email: string;

  checkIn: string;
  checkOut: string;
};


export interface CalculateReservationPriceRequest {
  roomTypeId: number;
  checkIn: string;
  checkOut: string;
  applyOffers: boolean;
  selectedOfferId: number | null;
}

export interface ReservationNightPriceDetail {
  id?: number;
  reservationId?: number;

  stayDate: string;

  basePrice: number;

  seasonId: number | null;
  seasonName: string | null;
  seasonAdjustmentPercentage: number;

  offerId: number | null;
  offerName: string | null;
  offerDiscountPercentage: number;

  finalNightPrice: number;

  active?: boolean;
  createdAt?: string;
}

export interface ReservationPriceResult {
  totalAmount: number;
  nightCount: number;
  averageNightlyRate: number;
  nights: ReservationNightPriceDetail[];
}





