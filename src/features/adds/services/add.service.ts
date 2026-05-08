import apiClient from "../../../shared/services/apliClient";
import type { Add } from "../types/add.types";

export async function getAdds() {
    try{
        const response = await apiClient.get<Add[]>("admin/adds");
        return response.data;
    }
    catch (err: any) {
        throw handleError("fetching", err);
    }
}

export async function CreateAdd(add: Add): Promise<Add> {
    try {
        add.updatedBy = 1;
        console.log("Creating add with data:", add);
        const { data } = await apiClient.post<Add>("admin/adds", add);
        return data;
    } catch (error) {
        throw handleError("creating", error);
    }
}

export async function UpdateAdd(add: Add): Promise<Add> {
    try {
        console.log("Updating add with data:", add);
        const { data } = await apiClient.put<Add>("admin/adds", add);
        return data;
    } catch (error) {
        throw handleError("updating", error);
    }
}

export async function DeleteAdd(id: number): Promise<void> {
    try {
        console.log("Deleting add with id:", id);
        await apiClient.delete(`admin/adds/${id}`);
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