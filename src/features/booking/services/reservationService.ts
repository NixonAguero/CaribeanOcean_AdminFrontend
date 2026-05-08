import apiClient from "../../../shared/services/apliClient";
import type {
    Reservation,
    CreateReservation,
    UpdateReservation,
    CalculateReservationPriceRequest,
    ReservationPriceResult,
    ReservationNightPriceDetail,
} from "../types/reservation.types";

type CreateReservationResponse = {
    code: string;
};

type HasAvailableRoomResponse = {
    hasAvailableRoom: boolean;
};

export const reservationService = {
    async getAll(): Promise<Reservation[]> {
        const response = await apiClient.get<Reservation[]>("/Reservation");
        return response.data;
    },

    async getById(id: number): Promise<Reservation> {
        const response = await apiClient.get<Reservation>(`/Reservation/${id}`);
        return response.data;
    },

    async create(reservation: CreateReservation): Promise<CreateReservationResponse> {
        const response = await apiClient.post<CreateReservationResponse>("/Reservation", reservation);
        return response.data;
    },

    async update(id: number, reservation: UpdateReservation): Promise<boolean> {
        await apiClient.put(`/Reservation/${id}`, reservation);
        return true;
    },

    async delete(id: number): Promise<boolean> {
        await apiClient.delete(`/Reservation/${id}`);
        return true;
    },

    async previewPrice(
        request: CalculateReservationPriceRequest
    ): Promise<ReservationPriceResult> {
        const response = await apiClient.post<ReservationPriceResult>(
            "/Reservation/price-preview",
            request
        );

        return response.data;
    },

    async getNightDetails(
        reservationId: number
    ): Promise<ReservationNightPriceDetail[]> {
        const response = await apiClient.get<ReservationNightPriceDetail[]>(
            `/Reservation/${reservationId}/night-details`
        );

        return response.data;
    },

    async hasAvailableRoom(
        roomTypeId: number,
        checkIn: string,
        checkOut: string
    ): Promise<boolean> {
        const response = await apiClient.post<HasAvailableRoomResponse>(
            "/Reservation/HasAvailableRoom",
            { roomTypeId, checkIn, checkOut }
        );

        return response.data.hasAvailableRoom;
    },

    async hasAvailableRoomForUpdate(
        reservationId: number,
        roomTypeId: number,
        checkIn: string,
        checkOut: string
    ): Promise<boolean> {
        const response = await apiClient.post<{ hasAvailableRoom: boolean }>(
            "/Reservation/availability-update",
            {
                reservationId,
                roomTypeId,
                checkIn,
                checkOut,
            }
        );

        return response.data.hasAvailableRoom;
    }
};