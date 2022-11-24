import express from 'express';
import { Container } from 'typescript-ioc';
import { BikeController } from './bike-controller';
const router = express.Router();


const bikeController = Container.get(BikeController);

router.post("/", (req, res, next) => {
    bikeController.createBike(req, res, next);
});



// router.route("/register").post(bikeController.registerUser);
// router.route("/login").post(bikeController.loginUser);
export { router as bikeRouter };