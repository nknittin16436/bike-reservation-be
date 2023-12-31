import { UserService } from '../../service';
import express, { NextFunction } from 'express';
import { Inject } from 'typescript-ioc';
import { LoginResponse, LoginUser, RegisterUser, SuccessResponse, UpdateUserData } from '../../dtos/user.dto';
import { cookieOptions } from '../../utils/CommonFunction';


export class UserController {

    private userService: UserService;

    constructor(@Inject userService: UserService) {
        this.userService = userService;
    }

    public async registerUser(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            console.log("register", req.body);
            const success: SuccessResponse = await this.userService.registerUser(req.body as RegisterUser);
            res.status(201).json({ ...success, message: "User registered successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode).json({ message: error.message })
        }
    }

    public async loginUser(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            const loginRes: LoginResponse = await this.userService.loginUser(req.body as LoginUser);
            res.status(201).cookie('biketoken', loginRes.accessToken, cookieOptions).json({ ...loginRes, message: "User Login successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode).json({ message: error.message })
        }
    }


    public async getAllUsers(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            const getAllRes: SuccessResponse = await this.userService.getAllUsers();
            res.status(200).json({ ...getAllRes, message: "User Login successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode).json({ message: error.message })
        }
    }

    public async deleteUser(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            const deleteRes: SuccessResponse = await this.userService.deleteUser(req.params.id as string);
            res.status(200).json({ ...deleteRes, message: "User deleted successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode).json({ message: error.message })
        }
    }


    public async getLoggedInUser(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            const getUserRes: SuccessResponse = await this.userService.getUser(req.cookies.biketoken as string);
            res.status(200).json({ ...getUserRes, message: "User Fetched successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode).json({ message: error.message })
        }
    }




    public async updateUser(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            const deleteRes: SuccessResponse = await this.userService.updateUser(req.params.id as string, req.body as UpdateUserData);
            res.status(200).json({ ...deleteRes, message: "User updated successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({ message: error.message })
        }
    }

    public async getSingleUser(req: express.Request, res: express.Response, next: NextFunction): Promise<void> {
        try {
            const userRes: SuccessResponse = await this.userService.getSingleUser(req.params.id as string);
            res.status(200).json({ ...userRes, message: "User updated successfully" });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({ message: error.message })
        }
    }
}