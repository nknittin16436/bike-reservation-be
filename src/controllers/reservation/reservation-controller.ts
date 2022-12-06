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
            res.status(201).json({ ...createBikeResponse, message: "Reservation created succesfully" })
        } catch (error: any) {
            console.log(error)
            res.status(400).json({ success: false, message: error.message })
        }
    }


    public async getAllReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const getReservationResponse = await this.reservationService.getAllReservations();
            res.status(200).json({ ...getReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    public async getAllBikesReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const getReservationResponse = await this.reservationService.getBikeReservations(req.params.bikeId as string);
            res.status(200).json({ ...getReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    public async getAllUsersReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const getReservationResponse = await this.reservationService.getUserReservations(req.params.userId as string);
            res.status(200).json({ ...getReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}