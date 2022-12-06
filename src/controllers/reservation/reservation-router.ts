import express from "express";
import { Container } from "typescript-ioc";
import { ReservationController } from "./reservation-controller";

const router = express.Router();

const reservationController = Container.get(ReservationController)

router.post('/reservations', (req, res, next) => {
    reservationController.createReservation(req, res, next);
})


export { router as reservationRouter };