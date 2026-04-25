// src/features/booking/hooks/useAsyncState.ts
import { useState } from 'react';

export const useAsyncState = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null); // Añadimos el estado del error aquí

  // Esta "envoltura mágica" ahora prende el loading, ejecuta tu función, 
  // maneja el error internamente si falla, y luego apaga el loading.
  const withAsync = async <T,>(asyncFunction: () => Promise<T>) => {
    setIsLoading(true);
    setError(null); // Limpiamos errores anteriores antes de cada petición

    try {
      const data = await asyncFunction();
      return { data, hasError: false }; // Retorna los datos si es exitoso
    } catch (err: any) {
      let errorMessage = 'Ocurrió un error inesperado al conectar con el servidor.'
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message || err.response.data.title || JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return { data: null, hasError: true, errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, withAsync, setError };
};
