export interface Facility {
    id: number;
    name: string;
    description: string;
    features: string[]; // List of strings from the C# backend
    imageUrl: string;   // Maps to camelCase ImageUrl
    updated_at?: string | null;
    updated_by?: number | null;
    displayOrder: number;
    active: boolean;
}

export interface CreateFacilityDTO {
    name: string;
    description: string;
    features: string[];
    displayOrder: number;
    active: boolean;
    image?: File | null;
}

export interface UpdateFacilityDTO {
    id: number;
    name: string;
    description: string;
    features: string[];
    image?: File | null;
    imageUrl?: string;
    updatedBy?: number | null;
    displayOrder: number;
    active: boolean;
}

export interface FacilityFormData {
    name: string;
    description: string;
    features: string[]; // Keeps as comma-separated string for form input
    image: File | null;
    imageUrl: string;
    displayOrder: number;
    active: boolean;
}