export interface SeasonType {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  discountAmount: number;
  updatedAt: string;
}

export interface UpdateSeasonPayload {
  
  name?: string;
  startDate: string;
  endDate: string;
  discountAmount: number;
  active: boolean;
  updatedAt: string;
}

export interface CreateSeasonPayload {
  name?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  discount: number;
}

