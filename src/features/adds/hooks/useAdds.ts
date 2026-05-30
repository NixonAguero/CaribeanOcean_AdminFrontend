import { useCallback, useEffect, useState } from "react";
import type { Add } from "../types/add.types";
import { CreateAdd, DeleteAdd, getAdds, UpdateAdd } from "../services/add.service";

export function useAdds() {
    const [adds, setAdds] = useState<Add[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAdds = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const adds = await getAdds();
            console.log("Fetched adds:", adds);
            setAdds(adds);
        } catch (err: any) {
            setError(err.message || "The available adds could not be loaded.");
        } finally {
            setLoading(false);
        }
    }, []);

    const useCreateAdd = async (image: File, targetURL: string) => {
        try {
            await CreateAdd(image, targetURL);
            fetchAdds();
        } catch (err: any) {
            setError(err.message || "Error creating new add.");
            throw err;
        }
    };

    const editAdd = async (add: Add, newImage: File | null) => {
        try {
            await UpdateAdd(add, newImage);
            fetchAdds();
        } catch (err: any) {
            setError(err.message || "Error updating add.");
            throw err;
        }
    };

    const removeAdd = async (id: number) => {
        try {
            await DeleteAdd(id);
            fetchAdds();
        } catch (err: any) {
            setError(err.message || "The add could not be removed.");
            throw err;
        }
    };

    useEffect(() => {
        fetchAdds();
    }, [fetchAdds]);

    return { adds, loading, error, useCreateAdd, removeAdd, editAdd };
}