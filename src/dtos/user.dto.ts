import { User } from "../entities/user.entity";

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface SuccessResponse {
    success: boolean;
    users?: User[]
}
export interface LoginResponse {
    user: User;
    accessToken: string;
    success: boolean;
}

export interface JwtPayload {
    id: string
  }