import { BaseEntity } from "typeorm";
import { Bike } from "./bike.entity";
import { User } from "./user.entity";
export declare class Reservation extends BaseEntity {
    id: string;
    status: boolean;
    bikeName: string;
    bikeId: string;
    rating: number;
    isRated: boolean;
    fromDate: string;
    toDate: string;
    userId: string;
    userName: string;
    user: User;
    bike: Bike;
    users: User[];
}
