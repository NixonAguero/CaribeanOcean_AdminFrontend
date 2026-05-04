import { useState, useEffect, useCallback } from "react";
import type { Offer } from "../types/offers.type";
import { GetOffers, CreateOffer, UpdateOffer, DeleteOffer } from "../service/offers.service";

export const useOffers = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOffers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetOffers();
            setOffers(data);
        } catch (err: any) {
            setError(err.message || "The available offers could not be loaded.");
        } finally {
            setLoading(false);
        }
    }, []);

    const addOffer = async (offer: Omit<Offer, 'id'>) => {
        setLoading(true);
        try {
            await CreateOffer(offer);
            await fetchOffers();
        } catch (err: any) {
            setError(err.message || "Error creating new offer.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const editOffer = async (offer: Offer) => {
        setLoading(true);
        try {
            await UpdateOffer(offer);
            await fetchOffers();
        } catch (err: any) {
            setError(err.message || "Error updating offer.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeOffer = async (id: number) => {
        setLoading(true);
        try {
            await DeleteOffer(id);
            await fetchOffers();
        } catch (err: any) {
            setError(err.message || "The offer could not be removed.");
            throw err;
        } finally {
            setLoading(false);
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