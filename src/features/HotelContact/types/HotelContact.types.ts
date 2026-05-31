export interface HotelContact {
  id: number;
  type: string;
  contact: string;
  active: boolean;
}

export interface UpdateHotelContactPayLoad{
    type: string;
    contact:string;  
}

export interface CreateHotelContactPayload{

    id: number;
    type: string;
    contact: string;
}