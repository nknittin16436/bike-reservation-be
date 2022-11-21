"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const user_router_1 = require("./controllers/user/user-router");
require('dotenv').config({ path: 'src/config/config.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/v1", user_router_1.userRouter);
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map