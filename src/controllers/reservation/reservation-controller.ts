import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { createReservationData } from "../../dtos/reservation.dto";
import { ReservationService } from "../../service";

export class ReservationController {

    private reservationService: ReservationService;
    constructor(@Inject reservationService: ReservationService) {
        this.reservationService = reservationService
    }
    public async createReservation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createBikeResponse = await this.reservationService.createReservation(req.body as createReservationData);
            res.status(201).json({ createBikeResponse, message: "Bike created succesfully" })
        } catch (error) {
            res.status(400).json({ success: false, message: "Unable to add bike" })
        }
    }
}