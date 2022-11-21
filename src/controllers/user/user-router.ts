import express from 'express';
import { Container } from 'typescript-ioc';
import { UserController } from './user-controller';
const router = express.Router();


const userController = Container.get(UserController);

router.post("/register", (req, res, next) => {
    userController.registerUser(req, res, next);
});

router.post("/login", (req, res, next) => {
    userController.loginUser(req, res, next);
});

router.get("/users", (req, res, next) => {
    userController.getAllUsers(req, res, next);
});

router.delete("/user/:id", (req, res, next) => {
    userController.deleteUser(req, res, next);
});

router.get("/user/me", (req, res, next) => {
    userController.getLoggedInUser(req, res, next);
});

// router.route("/register").post(userController.registerUser);
// router.route("/login").post(userController.loginUser);
export { router as userRouter };