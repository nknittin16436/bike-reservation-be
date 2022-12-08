import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { createReservationData, SuccessResponseReservation } from "../../dtos/reservation.dto";
import { ReservationService } from "../../service";

export class ReservationController {

    private reservationService: ReservationService;
    constructor(@Inject reservationService: ReservationService) {
        this.reservationService = reservationService
    }
    public async createReservation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createReservationResponse = await this.reservationService.createReservation(req.cookies.biketoken as string, req.body as createReservationData);
            res.status(201).json({ ...createReservationResponse, message: "Reservation created succesfully" })
        } catch (error: any) {
            console.log(error)
            res.status(400).json({ success: false, message: error.message })
        }
    }


    public async getAllReservations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const getReservationResponse: SuccessResponseReservation = await this.reservationService.getAllReservations();
            res.status(200).json({ ...getReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    public async getAllBikesReservations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const getReservationResponse: SuccessResponseReservation = await this.reservationService.getBikeReservations(req.params.bikeId as string);
            res.status(200).json({ ...getReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    public async getAllUsersReservations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const getReservationResponse: SuccessResponseReservation = await this.reservationService.getUserReservations(req.params.userId as string);
            res.status(200).json({ ...getReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    public async updateReservationRating(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updateRatingResponse: SuccessResponseReservation = await this.reservationService.updateReservationRating(req.params.id as string, req.body.rating as number);
            res.status(200).json({ ...updateRatingResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    public async updateReservationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updateStatusResponse: SuccessResponseReservation = await this.reservationService.updateReservationStatus(req.params.id as string);
            res.status(200).json({ ...updateStatusResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    public async deleteReservation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deleteReservationResponse: SuccessResponseReservation = await this.reservationService.deleteReservation(req.params.id as string);
            res.status(200).json({ ...deleteReservationResponse })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}