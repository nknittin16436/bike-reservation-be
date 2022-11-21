"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const typescript_ioc_1 = require("typescript-ioc");
const user_controller_1 = require("./user-controller");
const router = express_1.default.Router();
exports.userRouter = router;
const userController = typescript_ioc_1.Container.get(user_controller_1.UserController);
router.get("/register", (req, res) => {
    userController.registerUser(req, res);
});
//# sourceMappingURL=user-router.js.map