export interface Reservation {
  id: number;
  code: string;
  roomId: number;
  roomTypeId: number;
  roomTypeName: string;
  creditCardMasked: string;
  seasonId: number;
  seasonName: string;
  clientName: string;
  clientLastname: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  totalAmount: number;
  // We'll add this to easily represent rows that are active/cancelled/etc on the frontend
  isActive?: boolean;
}


export interface CreateReservation {
  roomTypeId: number;
  seasonId: number;
  clientName: string;
  clientLastname: string;
  cardNumber: string; // Unmasked for creation
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  totalAmount: number;
}

export interface UpdateReservation {
  Id: number;
  clientName: string;
  clientLastname: string;
  roomTypeId: number;
  seasonId: number;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  totalAmount: number;
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
  checkIn: string;
  checkOut: string;
  roomTypeId: number;
  seasonId: number;
  cardNumber: string;
  totalAmount: number;
};

export interface WizardData {
  checkIn: string;
  checkOut: string;
  roomTypeId: number;
}





