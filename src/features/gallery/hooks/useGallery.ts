import { useState, useEffect, useCallback } from "react";
import { galleryService, type GalleryImage } from "../services/gallery.service";

export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await galleryService.getGallery();
      setImages(data.images);
    } catch {
      setError("Error loading gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const addImage = async (image: File, alt: string, adminId: number) => {
    await galleryService.addImage(image, alt, adminId);
    await fetchGallery();
  };

  const updateImage = async (imageId: number, newImage: File, alt: string, adminId: number) => {
    await galleryService.updateImage(imageId, newImage, alt, adminId);
    await fetchGallery();
  };

  const deleteImage = async (imageId: number, adminId: number) => {
    await galleryService.deleteImage(imageId, adminId);
    await fetchGallery();
  };

  return { images, loading, error, addImage, updateImage, deleteImage, refetch: fetchGallery };
};