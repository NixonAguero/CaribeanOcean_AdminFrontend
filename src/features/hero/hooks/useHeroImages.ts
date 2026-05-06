import { useState, useCallback } from 'react';
import type { HeroImage } from '../types/hero.types';
import { heroService } from '../services/heroService';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';

export const useHeroImages = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const { isLoading, error, withAsync } = useAsyncState();

  const fetchImages = useCallback(async () => {
    await withAsync(async () => {
      const data = await heroService.getImages();
      setImages(data);
    });
  }, []);

  const addImage = async (payload: FormData) => {
    return await withAsync(async () => {
      await heroService.addImage(payload);
      await fetchImages();
    });
  };

  const updateImage = async (id: number, payload: FormData) => {
    return await withAsync(async () => {
      await heroService.updateImage(id, payload);
      await fetchImages();
    });
  };

  const deleteImage = async (id: number) => {
    return await withAsync(async () => {
      await heroService.deleteImage(id);
      await fetchImages();
    });
  };

  return {
    images,
    loading: isLoading,
    error,
    fetchImages,
    addImage,
    updateImage,
    deleteImage,
  };
};
