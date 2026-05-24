import apiClient from "../../../shared/services/apliClient";
import type { Offer } from "../types/offers.type";
import { getUserId } from "../../authentication/services/session.service";

const ENDPOINT = '/Offer/admin/offers';

export async function GetOffers(): Promise<Offer[]> {
    try {
        const { data } = await apiClient.get<Offer[]>(ENDPOINT);
        return data;
    } catch (error) {
        throw handleError("fetching", error);
    }
}

export async function CreateOffer(offer: Omit<Offer, 'id'>): Promise<Offer> {
    try {
        offer.updatedBy = getUserId() ?? 1;
        const { data } = await apiClient.post<Offer>(ENDPOINT, offer);
        return data;
    } catch (error) {
        throw handleError("creating", error);
    }
}

export async function UpdateOffer(offer: Offer): Promise<Offer> {
    try {
        offer.updatedBy = getUserId() ?? 1;
        const { data } = await apiClient.put<Offer>(ENDPOINT, offer);
        return data;
    } catch (error) {
        throw handleError("updating", error);
    }
}

export async function DeleteOffer(id: number): Promise<void> {
    try {
        await apiClient.delete(`${ENDPOINT}/${id}`);
    } catch (error) {
        throw handleError("deleting", error);
    }
}

function handleError(action: string, error: any) {
    const backendMessage = error.response?.data?.message || error.response?.data || error.message;
    console.error(`Error ${action} offers:`, backendMessage);
    const errorMessage = typeof backendMessage === 'string' ? backendMessage : JSON.stringify(backendMessage);
    return new Error(errorMessage);
}