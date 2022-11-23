import { User } from "../entities/user.entity";


export const cookieOptions = {
    expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
}

export const isUserRegistered = async (email: string): Promise<User | null> => {
    const isUserExist: User | null = await User.findOne({ where: { email: email } });
    return isUserExist;

}