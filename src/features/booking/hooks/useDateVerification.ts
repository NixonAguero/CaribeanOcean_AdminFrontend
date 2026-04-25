import { useState } from 'react';
import { useAsyncState } from '../../../shared/hooks/useAsyncState';
import { reservationService } from '../services/reservationService';

export const useDateVerification = () => {
    const [isEditingDates, setIsEditingDates] = useState(false);
    const [tempDates, setTempDates] = useState({ checkIn: "", checkOut: "" });

    const { isLoading: isVerifying, error: verificationError, withAsync } = useAsyncState();

    const startEditing = (currentCheckIn: string, currentCheckOut: string) => {
        setTempDates({ checkIn: currentCheckIn, checkOut: currentCheckOut });
        setIsEditingDates(true);
    }

    const cancelEditing = () => {
        setIsEditingDates(false);
    };

    const verifyDates = async (roomTypeId: number,
        onSuccess: (newCheckIn: string, newCheckOut: string) => void
    ) => {
        if (!tempDates.checkIn || !tempDates.checkOut) return;
        const { hasError } = await withAsync(async () => {
            console.log(roomTypeId, tempDates.checkIn, tempDates.checkOut);
            const isAvailable = await reservationService.hasAvailableRoom(roomTypeId, tempDates.checkIn, tempDates.checkOut);

 
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
        verifyDates
    };
}