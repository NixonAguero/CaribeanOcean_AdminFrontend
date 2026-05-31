import { useState, useCallback } from 'react';
import type { HeroImage, HeroMetadata } from '../types/hero.types';
import { heroService } from '../services/heroService';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';

export const useHeroImages = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [metadata, setMetadata] = useState<HeroMetadata | null>(null);
  const { isLoading, error, withAsync } = useAsyncState();

  const fetchImages = useCallback(async () => {
    await withAsync(async () => {
      const data = await heroService.getImages();
      setImages(data);
    });
  }, []);

  const fetchMetadata = useCallback(async () => {
    return await withAsync(async () => {
      const data = await heroService.getMetadata();
      setMetadata(data);
      return data;
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

  const updateMetadata = async (payload: HeroMetadata) => {
    return await withAsync(async () => {
      await heroService.updateMetadata(payload);
      await fetchMetadata();
    });
  };

  return {
    images,
    metadata,
    loading: isLoading,
    error,
    fetchImages,
    fetchMetadata,
    addImage,
    updateImage,
    deleteImage,
    updateMetadata,
  };
};
