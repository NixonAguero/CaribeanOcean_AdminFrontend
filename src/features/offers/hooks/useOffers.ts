import { useState, useEffect, useCallback } from "react";
import type { Offer } from "../types/offers.type";
import { GetOffers, CreateOffer, UpdateOffer, DeleteOffer } from "../service/offers.service";

export const useOffers = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sleep = (ms: number = 400): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const fetchOffers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetOffers();
            await sleep(); 
            setOffers(data);
        } catch (err: any) {
            setError(err.message || "The available offers could not be loaded.");
        } finally {
            setLoading(false);
        }
    }, []);

    const addOffer = async (offer: Omit<Offer, 'id'>) => {
        try {
            await CreateOffer(offer);
            fetchOffers();
        } catch (err: any) {
            setError(err.message || "Error creating new offer.");
            throw err;
        }
    };

    const editOffer = async (offer: Offer) => {
        try {
            await UpdateOffer(offer);
            fetchOffers();
        } catch (err: any) {
            setError(err.message || "Error updating offer.");
            throw err;
        }
    };

    const removeOffer = async (id: number) => {
        try {
            await DeleteOffer(id);
            fetchOffers();
        } catch (err: any) {
            setError(err.message || "The offer could not be removed.");
            throw err;
        }
    };

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    return {
        offers,
        loading,
        error,
        addOffer,
        editOffer,
        removeOffer,
        refresh: fetchOffers
    };
};