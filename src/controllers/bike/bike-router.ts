import express from 'express';
import { Container } from 'typescript-ioc';
import { BikeController } from './bike-controller';
const router = express.Router();


const bikeController = Container.get(BikeController);

router.post("/bikes", (req, res, next) => {
    bikeController.createBike(req, res, next);
});

router.get("/bikes", (req, res, next) => {
    bikeController.getBikes(req, res, next);
});
router.patch("/bikes/:id", (req, res, next) => {
    bikeController.updateBike(req, res, next);
});
router.delete("/bikes/:id", (req, res, next) => {
    bikeController.deleteBike(req, res, next);
});



// router.route("/register").post(bikeController.registerUser);
// router.route("/login").post(bikeController.loginUser);
export { router as bikeRouter };