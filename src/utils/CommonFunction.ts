import { JwtPayload } from "jsonwebtoken";
import { Bike } from "../entities/bike.entity";
import { User } from "../entities/user.entity";
import * as jwt from 'jsonwebtoken';
import { FilterQuery } from "../dtos/bike.dto";
import moment from 'moment';
import { ErrorHandler } from "./ErrorHandler";
import { Reservation } from "../entities/reservation.entity";


export const cookieOptions = {
    expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
}

export const isUserRegistered = async (email: string): Promise<User | null> => {
    const isUserExist: User | null = await User.findOne({ where: { email: email } });
    return isUserExist;
}

export const getLoggedInUser = async (biketoken: string): Promise<User | null> => {
    const decodedData: JwtPayload = jwt.verify(biketoken, process.env.JWT_SECRET as string) as JwtPayload;
    console.log(decodedData);
    const user: User | null = await User.findOne({ where: { id: decodedData.id } });
    return user;
}


export const getBikeOnBasisOfRole = async (biketoken: string): Promise<Bike[]> => {
    const user: User | null = await getLoggedInUser(biketoken);

    let filteredBikes: Bike[] = [];
    if (user) {
        if (user.role === "admin") {
            filteredBikes = await Bike.find({
                relations: {
                    reservations: true,
                }
            });
        }
        if (user.role === "regular") {
            filteredBikes = await Bike.find();
            filteredBikes = filteredBikes.filter((bike) => bike.isAvailable === true)
        }
    }
    return filteredBikes;
}


export const filterBikesByQuery = async (bikes: Bike[], query: FilterQuery): Promise<Bike[]> => {
    let filteredBikes: Bike[] = [];
    if (query && query.rating) {

        bikes = bikes.filter(bike => bike.averageRating >= query.rating);
    }
    if (query && query.name) {
        bikes = bikes.filter(bike => bike.name.toLowerCase().includes(query.name.toLowerCase()));
    }
    if (query.color) {

        bikes = bikes.filter(bike => bike.color.toLowerCase().includes(query.color.toLowerCase()));
    }
    if (query.location) {

        bikes = bikes.filter(bike => bike.location.toLowerCase().includes(query.location.toLowerCase()));
    }
    if (query.fromDate || query.toDate) {
        if (!query.fromDate || !moment(query.fromDate, 'YYYY-MM-DD H:mm:ss').isValid()) {
            throw new ErrorHandler('Enter valid from date', 400);
        }
        if (!query.toDate || !moment(query.toDate, 'YYYY-MM-DD H:mm:ss', true).isValid()) {
            throw new ErrorHandler('Enter valid to date', 400);
        }
        if (!query.fromDate || !query.toDate) {
            throw new ErrorHandler('Enter valid from and to date', 400);
        }
        if (query.fromDate < moment(Date.now()).format('YYYY-MM-DD H:mm:ss')) {
            throw new ErrorHandler('Start date should be greater then current date', 400);
        }
        if (query.fromDate > query.toDate) {
            throw new ErrorHandler('From date cannot be greater than to date', 400);
        }
    }
    return filteredBikes;

}

export const validateReservationDate = (fromDate: string, toDate: string) => {
    if (!fromDate || !toDate) {
        throw new ErrorHandler('Enter valid from and to date', 400);
    }
    if (fromDate < moment(Date.now()).format('YYYY-MM-DD H:mm:ss')) {
        throw new ErrorHandler('Start date should be greater then current date', 400);
    }
    if (fromDate > toDate) {
        throw new ErrorHandler('From date cannot be greater than to date', 400);
    }
    if (fromDate === toDate) {
        throw new ErrorHandler('From date and To date cannot be same', 400);
    }
}

export const isReservationAvailable = (bike: Bike, fromDate: string, toDate: string) => {
    let reservations: Reservation[] = bike.reservations;
    if (reservations.length === 0) {
        return true;
    }
    // console.log(bike, reservations)
    reservations = reservations.filter(reservation => reservation.status === true)
    if (reservations.length === 0) {
        return true;
    }

    let trueCount = 0;
    for (const reservation of reservations) {

        if (fromDate < reservation.fromDate && toDate < reservation.fromDate) {
            // console.log("1");
            trueCount++;
        }
        if ((fromDate > reservation.fromDate) && (fromDate > reservation.toDate)) {
            // console.log("2", fromDate, reservation);
            trueCount++;
        }

    }
    if (trueCount === reservations.length) {
        return true;
    }

    else {
        throw new ErrorHandler('Bike cannot be booked on given duration', 400);
    }
}