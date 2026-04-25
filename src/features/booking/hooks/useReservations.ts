// src/features/booking/hooks/useReservations.ts

import { useState, useCallback } from 'react';
import { type Reservation, type CreateReservation } from '../types/reservation.types';
import { reservationService } from '../services/reservationService';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';


export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { isLoading, error, withAsync } = useAsyncState();
  // GET: Fetch all reservations
  const fetchReservations = useCallback(async () => {
    await withAsync(async () => {
      const data = await reservationService.getAll();
      setReservations(data);
    });
  }, []);

  // POST: Create a new reservation
  const createReservation = async (reservationData: CreateReservation) => {
    // Retornamos directamente lo que sea que decida el withAsync { data, hasError, errorMessage }
    return await withAsync(async () => {
      await reservationService.create(reservationData);
      await fetchReservations();
    });
  };

  // DELETE: Delete a reservation
  const deleteReservation = async (id: number) => {
    return await withAsync(async () => {
      await reservationService.delete(id);

      setReservations((prev) => prev.filter(res => res.id !== id));
    });
  };

  // PUT: Update a reservation
  const updateReservation = async (id: number, reservationData: any) => {
    return await withAsync(async () => {
      await reservationService.update(id, reservationData);
      await fetchReservations();
    });
  };

  const HasAvailableRoom = async (roomId: number, checkIn: string, checkOut: string): Promise<boolean> => {
    const result = await withAsync(async () => {
      return await reservationService.hasAvailableRoom(roomId, checkIn, checkOut);
    });
    return result.data ?? false;
  };

  return {
    reservations,
    loading: isLoading,
    error,
    fetchReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    HasAvailableRoom
  };
};

