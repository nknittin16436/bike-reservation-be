import { createReservationData } from "../../dtos/reservation.dto";
import { Reservation } from "../../entities/reservation.entity";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { getLoggedInUser, isReservationAvailable, validateReservationDate } from '../../utils/CommonFunction'
import { Bike } from "../../entities/bike.entity";

export class ReservationService {
    async createReservation(reservationData: createReservationData) {
        const bike = await Bike.findOne({
            relations: {
                reservations: true,
            }, where: { id: reservationData.bikeId }
        });
        if (!bike) {
            throw new ErrorHandler('Invalid Bike Id', 400);
        }
        const user = await getLoggedInUser(reservationData.userId);
        if (!user) {
            throw new ErrorHandler('Invalid User', 400);
        }


        validateReservationDate(reservationData.fromDate, reservationData.toDate)
        if (isReservationAvailable(bike, reservationData.fromDate, reservationData.toDate)) {
            if (bike.isAvailable) {
                const reservation = new Reservation();
                reservation.bikeName = bike.name;
                reservation.bikeId = reservationData.bikeId;
                reservation.fromDate = reservationData.fromDate;
                reservation.toDate = reservationData.toDate;
                reservation.userId = user.id;
                reservation.userName = user.name;
                await reservation.save();
            }

        }
        return { success: true };
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
        console.log(bikeId)
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