import { createReservationData } from "../../dtos/reservation.dto";
import { Reservation } from "../../entities/reservation.entity";
import { ErrorHandler } from "../../utils/ErrorHandler";


export class ReservationService {
    async createReservation(reservationData: createReservationData) {
        return true;
    }
    async getAllReservations() {
        const reservations = await Reservation.find();
        return { reservations, success: true }
    }

    async getUserReservations(userId: string) {
        const reservations = await Reservation.find({ where: { userId: userId } });
        return { reservations, success: true }

    }
    async getBikeReservations(bikeId: string) {
        const reservations = await Reservation.find({ where: { bikeId: bikeId } });
        return { reservations, success: true }
    }
    async updateReservation() {

    }
    async deleteReservation(id: string) {
        const reservation = await Reservation.findOne({ where: { id: id } });
        //CHECK IF RESERVATION WITH THAT ID EXISTS OR NOT
        if (reservation) {
            await Reservation.delete(id);
            return { success: true }
        }
        else throw new ErrorHandler('Unable to delete reservation', 400);
    }

}