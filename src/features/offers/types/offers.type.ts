export interface Offer {
    id: number;
    name: string;
    description: string;
    discount: number;
    startDate: string;
    endDate: string;
    roomTypeId: number;
    roomType: string;
    updatedBy: number;
}