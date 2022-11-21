import { UserService } from '../../service/user-service/user.service';
import express from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    registerUser(req: express.Request, res: express.Response): Promise<void>;
    loginUser(req: express.Request, res: express.Response): Promise<void>;
}
