import { Reservation } from "../entities/reservation.entity";

export interface createReservationData {
    userId: string;
    bikeId: string;
    fromDate: string;
    toDate: string;
}

export interface SuccessResponseReservation {
    success: boolean;
    reservations?: Reservation[];
}