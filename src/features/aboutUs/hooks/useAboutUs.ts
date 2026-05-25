import { useState, useCallback } from 'react';
import type { AboutUsContent } from '../types/aboutUs.types';
import { aboutUsService } from '../services/aboutUsService';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';

export const useAboutUs = () => {
  const [content, setContent] = useState<AboutUsContent | null>(null);
  const { isLoading, error, withAsync } = useAsyncState();

  const fetchContent = useCallback(async () => {
    return await withAsync(async () => {
      const data = await aboutUsService.getContent();
      setContent(data);
      return data;
    });
  }, []);

  const updateContent = async (payload: AboutUsContent) => {
    return await withAsync(async () => {
      await aboutUsService.updateContent(payload);
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
