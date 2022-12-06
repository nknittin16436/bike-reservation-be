import express from "express";
import { Container } from "typescript-ioc";
import { ReservationController } from "./reservation-controller";

const router = express.Router();

const reservationController = Container.get(ReservationController)

router.post('/reservations', (req, res, next) => {
    reservationController.createReservation(req, res, next);
})

router.get('/reservations', (req, res, next) => {
    reservationController.getAllReservations(req, res, next);
})
router.get('/reservations/bike/:bikeId', (req, res, next) => {
    reservationController.getAllBikesReservations(req, res, next);
})
router.get('/reservations/user/:userId', (req, res, next) => {
    reservationController.getAllUsersReservations(req, res, next);
})


export { router as reservationRouter };