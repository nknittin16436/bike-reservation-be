import { BaseEntity } from "typeorm";
import { Reservation } from "./reservation.entity";
export declare class User extends BaseEntity {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    reservations: Reservation[];
}
