import { BaseEntity } from "typeorm";
import { Reservation } from "./reservation.entity";
export declare class Bike extends BaseEntity {
    id: string;
    name: string;
    color: string;
    location: string;
    isAvailable: boolean;
    averageRating: number;
    reservations: Reservation[];
}
