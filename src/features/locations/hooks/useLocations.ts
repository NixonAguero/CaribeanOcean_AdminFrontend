import { useState, useCallback } from 'react';
import type { LocationContent } from '../types/Location.types';
import { locationsService } from '../services/locationsService';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';

export const useLocations = () => {
  const [content, setContent] = useState<LocationContent | null>(null);
  const { isLoading, error, withAsync } = useAsyncState();

  const fetchContent = useCallback(async () => {
    return await withAsync(async () => {
      const data = await locationsService.getContent();
      setContent(data);
      return data;
    });
  }, []);

  const updateContent = async (payload: LocationContent) => {
    return await withAsync(async () => {
      await locationsService.updateContent(payload);
      await fetchContent();
    });
  };

  return {
    content,
    loading: isLoading,
    error,
    fetchContent,
    updateContent,
  };
};
