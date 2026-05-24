import { useState } from 'react';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';
import { reservationService } from '../services/reservationService';

export const useDateVerification = () => {
    const [isEditingDates, setIsEditingDates] = useState(false);
    const [tempDates, setTempDates] = useState({ checkIn: "", checkOut: "" });

    const { isLoading: isVerifying, error: verificationError, setError, withAsync } = useAsyncState();

    const startEditing = (currentCheckIn: string, currentCheckOut: string) => {
        setTempDates({ checkIn: currentCheckIn, checkOut: currentCheckOut });
        setIsEditingDates(true);
    }

    const resetError = () => {
        setError(null);
    }

    const cancelEditing = () => {
        setIsEditingDates(false);
        resetError();
    };

    const verifyDates = async (reservationId: number,roomTypeId: number,
        onSuccess: (newCheckIn: string, newCheckOut: string) => void
    ) => {
        if (!tempDates.checkIn || !tempDates.checkOut) return;
        const { hasError } = await withAsync(async () => {
            console.log(reservationId,roomTypeId, tempDates.checkIn, tempDates.checkOut);
            const isAvailable = await reservationService.hasAvailableRoomForUpdate(reservationId,roomTypeId, tempDates.checkIn, tempDates.checkOut);

 
            if (!isAvailable) {
                throw new Error("The room type is not available for these dates.");
            }
        });
        if (!hasError) {
            onSuccess(tempDates.checkIn, tempDates.checkOut);
            setIsEditingDates(false);
        }
    }
    return {
        isEditingDates,
        isVerifying,
        verificationError,
        tempDates,
        setTempDates,
        startEditing,
        cancelEditing,
        verifyDates,
        resetError
    };
}