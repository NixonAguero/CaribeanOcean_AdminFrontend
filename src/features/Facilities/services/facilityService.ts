import apiClient from "../../../shared/services/apliClient";
import type { Facility, CreateFacilityDTO, UpdateFacilityDTO, FacilityFormData } from "../types/facility";

const buildCreateFacilityFormData = (data: CreateFacilityDTO): FormData => {
    const formData = new FormData();

    formData.append("nameFacility", data.name ?? "");
    formData.append("description", data.description ?? "");
    formData.append("featuresJson", JSON.stringify(data.features ?? []));
    formData.append("displayOrder", String(data.displayOrder));
    formData.append("active", String(data.active));
    formData.append("updatedBy", String(1));
    if (data.image) {
        formData.append("image", data.image);
    }

    return formData;
};

const buildUpdateFacilityFormData = (data: UpdateFacilityDTO): FormData => {
    const formData = new FormData();

    formData.append("nameFacility", data.name);
    formData.append("description", data.description ?? "");
    formData.append("featuresJson", JSON.stringify(data.features ?? []));
    formData.append("displayOrder", String(data.displayOrder));
    formData.append("active", String(data.active));
    formData.append("imageUrl", data.imageUrl ?? "");

    if (data.updatedBy !== undefined && data.updatedBy !== null) {
        formData.append("updatedBy", String(data.updatedBy));
    }

    if (data.image) {
        formData.append("image", data.image);
    }

    return formData;
};



export const facilityService = {
    async getAll(): Promise<Facility[]> {
        const response = await apiClient.get<Facility[]>("/Facility/all");
        return response.data;
    },

    async getById(id: number): Promise<Facility> {
        const response = await apiClient.get<Facility>(`/Facility/${id}`);
        return response.data;
    },

    async create(data: CreateFacilityDTO): Promise<{ id: number }> {
        try {

            const formData = buildCreateFacilityFormData(data);

            const response = await apiClient.post<{ id: number }>("/Facility", formData);

            return response.data;
        } catch (error: any) {
            console.log("FULL ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("ERRORS:", error.response?.data?.errors);

            throw error;
        }

    },

    async update(id: number, data: UpdateFacilityDTO): Promise<boolean> {
        const formData = buildUpdateFacilityFormData(data);

        const response = await apiClient.put<{ updated: boolean }>(
            `/Facility/${id}`,
            formData
        );

        return response.data.updated;
    },

    async delete(id: number, updatedBy?: number | null): Promise<boolean> {
        const query = updatedBy !== undefined && updatedBy !== null ? `?updatedBy=${updatedBy}` : "";
        await apiClient.delete(`/Facility/${id}${query}`);
        return true;
    },


};
