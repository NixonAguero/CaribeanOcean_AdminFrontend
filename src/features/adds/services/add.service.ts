import apiClient from "../../../shared/services/apliClient";
import type { Add } from "../types/add.types";

export async function getAdds(): Promise<Add[]> {
    try {
        const response = await apiClient.get<Add[]>("admin/adds");
        return response.data;
    } catch (err: any) {
        throw handleError("fetching", err);
    }
}

export async function CreateAdd(image: File, targetURL: string, adminId: number = 1): Promise<boolean> {
    try {
        const form = new FormData();
        form.append("image", image);
        form.append("TargetURL", targetURL);

        console.log("Creating add with image:", image.name, "TargetURL:", targetURL);
        const { data } = await apiClient.post<boolean>(`admin/adds?adminId=${adminId}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        throw handleError("creating", error);
    }
}

export async function UpdateAdd(add: Add, newImage: File | null, adminId: number = 1): Promise<boolean> {
    try {
        const form = new FormData();
        form.append("TargetURL", add.targetURL);
        form.append("Active", String(add.active));
        if (newImage) {
            form.append("newImage", newImage);
        }

        console.log("Updating add with id:", add.id);
        const { data } = await apiClient.put<boolean>(`admin/adds/${add.id}?adminId=${adminId}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
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
    const errorMessage = typeof backendMessage === "string" ? backendMessage : JSON.stringify(backendMessage);
    return new Error(errorMessage);
}