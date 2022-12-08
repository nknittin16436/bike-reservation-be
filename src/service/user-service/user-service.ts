import { JwtPayload, LoginResponse, LoginUser, RegisterUser, SuccessResponse, UpdateUserData } from "../../dtos/user.dto";
import { User } from "../../entities/user.entity";
import { ErrorHandler } from "../../utils/ErrorHandler";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { getLoggedInUser, isUserRegistered } from "../../utils/CommonFunction";

export class UserService {
    async registerUser(userData: RegisterUser): Promise<SuccessResponse> {
        const { name, email, password }: RegisterUser = userData;
        if (await isUserRegistered(email)) {
            throw new ErrorHandler("This Email already Exist", 400);
        }
        const user: User = new User();
        user.name = name;
        user.email = email;
        const hashedPassword: string = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;
        await user.save();
        return { success: true };
    }

    async loginUser(userData: LoginUser): Promise<LoginResponse> {

        const { email, password }: LoginUser = userData;
        const user: User | null = await isUserRegistered(email);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token: string = jwt.sign({ id: user.id, time: Date.now() }, String(process.env.JWT_SECRET), { expiresIn: '24h' });
                return { user, accessToken: token, success: true };
            }
            throw new ErrorHandler("EMAIL AND PASSWORD DO NOT MATCH", 400);
        }

        else {
            throw new ErrorHandler("No user found with this Email Id", 400);
        }
    }
    async getAllUsers(): Promise<SuccessResponse> {
        const users: User[] = await User.find({
            relations: {
                reservations: true,
            }
        });
        return { users, success: true };
    }

    async getUser(biketoken: string): Promise<SuccessResponse> {
        const user: User | null = await getLoggedInUser(biketoken);
        if (user) {
            return { user, success: true };
        }
        throw new ErrorHandler("User not found", 400);

    }


    async deleteUser(id: string): Promise<SuccessResponse> {
        const user: User | null = await User.findOne({ where: { id: id } });
        if (user) {
            await User.delete(id);
            return { success: true }
        }
        throw new ErrorHandler("Unable to delete or User not Found", 400);
    }

    async updateUser(id: string, updateUserData: UpdateUserData): Promise<SuccessResponse> {
        const user: User | null = await User.findOne({ where: { id: id } });
        if (user) {
            if (Object.keys(updateUserData).length !== 0) {
                console.log(updateUserData)
                await User.update(id, { ...updateUserData });
            }

            return { success: true }
        }
        throw new ErrorHandler("Unable to update or User not Found", 400);
    }

    async getSingleUser(id: string): Promise<SuccessResponse> {
        const user: User | null = await User.findOne({
            relations: {
                reservations: true,
            }, where: { id: id }
        });
        if (user) {
            return { user, success: true };
        }
        else {
            throw new ErrorHandler("No user found with this id", 400);
        }
    }
}