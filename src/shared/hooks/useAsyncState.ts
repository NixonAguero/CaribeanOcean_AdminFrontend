import { useCallback, useState } from 'react';

type AsyncError = {
  response?: {
    data?: unknown;
  };
  message?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getAsyncErrorMessage(error: unknown): string {
  const fallback = 'Ocurrio un error inesperado al conectar con el servidor.';

  if (!isRecord(error)) {
    return fallback;
  }

  const typedError = error as AsyncError;
  const responseData = typedError.response?.data;

  if (isRecord(responseData)) {
    const message = responseData.message;
    const title = responseData.title;

    if (typeof message === 'string') {
      return message;
    }

    if (typeof title === 'string') {
      return title;
    }

    return JSON.stringify(responseData);
  }

  if (typeof responseData === 'string') {
    return responseData;
  }

  if (typeof typedError.message === 'string') {
    return typedError.message;
  }

  return fallback;
}

export const useAsyncState = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const withAsync = useCallback(async <T,>(asyncFunction: () => Promise<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await asyncFunction();
      return { data, hasError: false };
    } catch (err: unknown) {
      const errorMessage = getAsyncErrorMessage(err);
      setError(errorMessage);
      return { data: null, hasError: true, errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, withAsync, setError };
};
