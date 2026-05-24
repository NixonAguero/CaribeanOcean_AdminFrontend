const BASE_URL = "http://localhost:5287/api/gallery";

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
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch gallery");
    return res.json();
  },

  addImage: async (image: File, alt: string, adminId: number): Promise<void> => {
    const form = new FormData();
    form.append("image", image);
    form.append("Alt", alt);
    const res = await fetch(`${BASE_URL}?adminId=${adminId}`, {
      method: "POST",
      body: form,
    });
    console.log("Add image response:", res);
    if (!res.ok) throw new Error("Failed to add image");
  },

  updateImage: async (imageId: number, newImage: File, alt: string, adminId: number): Promise<void> => {
    const form = new FormData();
    form.append("newImage", newImage);
    form.append("Alt", alt);
    const res = await fetch(`${BASE_URL}/${imageId}?adminId=${adminId}`, {
      method: "PUT",
      body: form,
    });
    if (!res.ok) throw new Error("Failed to update image");
  },

  deleteImage: async (imageId: number, adminId: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${imageId}?adminId=${adminId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete image");
  },
};