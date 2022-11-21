import { User } from "../entities/user.entity";


export const isUserRegistered = async (email: string): Promise<User | null> => {
    const isUserExist: User | null = await User.findOne({ where: { email: email } });
    return isUserExist;

}