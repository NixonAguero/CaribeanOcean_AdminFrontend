import apiClient from "../../../shared/services/apliClient";

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  publicId: string;
}

export interface GalleryResponse {
  title: string;
  subtitle: string;
  description: string;
  images: GalleryImage[];
}

export const galleryService = {
  getGallery: async (): Promise<GalleryResponse> => {
    const { data } = await apiClient.get<GalleryResponse>("/Gallery");
    return data;
  },

  addImage: async (image: File, alt: string, adminId: number): Promise<void> => {
    const form = new FormData();
    form.append("image", image);
    form.append("Alt", alt);
    await apiClient.post(`/Gallery?adminId=${adminId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateImage: async (imageId: number, newImage: File, alt: string, adminId: number): Promise<void> => {
    const form = new FormData();
    form.append("newImage", newImage);
    form.append("Alt", alt);
    await apiClient.put(`/Gallery/${imageId}?adminId=${adminId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteImage: async (imageId: number, adminId: number): Promise<void> => {
    await apiClient.delete(`/Gallery/${imageId}?adminId=${adminId}`);
  },
};