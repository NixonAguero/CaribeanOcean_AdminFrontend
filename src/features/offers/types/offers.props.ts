import type { Offer } from "./offers.type";

export interface OffersTableProps {
    offers: Offer[];
    onEditClick: (offer: Offer) => void;
    onDeleteClick: (offer: Offer) => void;
}

export interface AddOfferProps {
    onAdd: (offer: Omit<Offer, 'id'>) => Promise<void>;
}