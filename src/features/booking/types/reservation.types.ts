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