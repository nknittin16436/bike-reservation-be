import { createReservationData, SuccessResponseReservation } from "../../dtos/reservation.dto";
import { Reservation } from "../../entities/reservation.entity";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { getLoggedInUser, isReservationAvailable, validateReservationDate } from '../../utils/CommonFunction'
import { Bike } from "../../entities/bike.entity";
import { User } from "../../entities/user.entity";

export class ReservationService {
    async createReservation(userToken: string, reservationData: createReservationData): Promise<SuccessResponseReservation> {
        const bike: Bike | null = await Bike.findOne({
            relations: {
                reservations: true,
            }, where: { id: reservationData.bikeId }
        });
        if (!bike) {
            throw new ErrorHandler('Invalid Bike Id', 400);
        }
        const user: User | null = await getLoggedInUser(userToken);
        if (!user) {
            throw new ErrorHandler('Invalid User', 400);
        }


        validateReservationDate(reservationData.fromDate, reservationData.toDate)
        if (isReservationAvailable(bike, reservationData.fromDate, reservationData.toDate)) {
            if (bike.isAvailable) {
                const reservation: Reservation = new Reservation();
                reservation.bikeName = bike.name;
                reservation.bikeId = reservationData.bikeId;
                reservation.fromDate = reservationData.fromDate;
                reservation.toDate = reservationData.toDate;
                reservation.userId = user.id;
                reservation.userName = user.name;
                await reservation.save();
                return { success: true };
            }
            else {
                throw new ErrorHandler('This bike is Not yet available for booking', 400)
            }
        }
        else {
            throw new ErrorHandler("Reservation not available", 400)
        }
    }
    async getAllReservations(): Promise<SuccessResponseReservation> {
        const reservations: Reservation[] = await Reservation.find();
        return { reservations, success: true }
    }

    async getUserReservations(userId: string): Promise<SuccessResponseReservation> {
        const reservations: Reservation[] = await Reservation.find({ where: { userId: userId } });
        return { reservations, success: true }

    }
    async getBikeReservations(bikeId: string): Promise<SuccessResponseReservation> {
        const reservations: Reservation[] = await Reservation.find({ where: { bikeId: bikeId } });
        return { reservations, success: true }
    }
    async updateReservationStatus(id: string): Promise<SuccessResponseReservation> {
        const reservation: Reservation | null = await Reservation.findOne({ where: { id: id } });
        if (reservation) {
            if (reservation.status) {
                await Reservation.update(id, { status: false });
                return { success: true };
            }
            else throw new ErrorHandler('Cannot cancel an already cancelled Reservation', 400);
        }
        else throw new ErrorHandler('Unable to update Reservation Status Invalid', 400);
    }

    async updateReservationRating(id: string, rating: number): Promise<SuccessResponseReservation> {
        if (rating > 0 && rating < 6) {
            const reservation = await Reservation.findOne({ where: { id: id } });
            if (reservation && !reservation.isRated && reservation.status) {
                await Reservation.update(id, { rating: rating, isRated: true });
                const bike: Bike | null = await Bike.findOne({ where: { id: reservation.bikeId }, relations: { reservations: true, } });
                if (bike) {

                    let averageRating = 0;
                    let ratedReservationLength = 0;
                    for (const reservation of bike.reservations) {
                        if (reservation.isRated) {
                            ratedReservationLength++;
                        }
                        averageRating += reservation.rating;
                    }
                    averageRating /= ratedReservationLength;
                    // console.log(averageRating);
                    await Bike.update(reservation.bikeId, { averageRating: averageRating });
                    return { success: true }
                }
                else {
                    throw new ErrorHandler("Could not found this Bike", 400)
                }
            }
            else throw new ErrorHandler('Unable to Add Reservation Rating You have already rated or cancelled this reservation', 400);
        }
        else throw new ErrorHandler('Invalid Rating :Rating should be between 1 and 5', 400);
    }

    async deleteReservation(id: string): Promise<SuccessResponseReservation> {
        const reservation: Reservation | null = await Reservation.findOne({ where: { id: id } });
        //CHECK IF RESERVATION WITH THAT ID EXISTS OR NOT
        if (reservation) {
            await Reservation.delete(id);
            return { success: true }
        }
        else throw new ErrorHandler('Unable to delete reservation', 400);
    }

}