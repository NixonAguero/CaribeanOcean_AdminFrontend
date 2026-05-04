import type { Offer } from "./offers.type";

export interface OffersTableProps {
    offers: Offer[];
    onUpdate: (offer: Offer) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export interface SingleOfferProps {
    offer: Offer;
}

export interface OfferUpdateActionProps extends SingleOfferProps {
    onAction: (offer: Offer) => Promise<void>;
}

export interface OfferDeleteActionProps extends SingleOfferProps {
    onDelete: (id: number) => Promise<void>;
}

export interface AddOfferProps {
    onAdd: (offer: Omit<Offer, 'id'>) => Promise<void>;
}