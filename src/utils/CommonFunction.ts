import { JwtPayload } from "jsonwebtoken";
import { Bike } from "../entities/bike.entity";
import { User } from "../entities/user.entity";
import * as jwt from 'jsonwebtoken';


export const cookieOptions = {
    expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
}

export const isUserRegistered = async (email: string): Promise<User | null> => {
    const isUserExist: User | null = await User.findOne({ where: { email: email } });
    return isUserExist;
}

export const getLoggedInUser = async (biketoken: string): Promise<User | null> => {
    const decodedData: JwtPayload = jwt.verify(biketoken, process.env.JWT_SECRET as string) as JwtPayload;
    console.log(decodedData);
    const user: User | null = await User.findOne({ where: { id: decodedData.id } });
    return user;
}

export const getBikeOnBasisOfRole = async (biketoken: string): Promise<Bike[]> => {
    const user: User | null = await getLoggedInUser(biketoken);

    let filteredBikes: Bike[] = [];
    if (user) {
        if (user.role === "admin") {
            filteredBikes = await Bike.find({
                relations: {
                    reservations: true,
                }
            });
        }
        if (user.role === "regular") {
            filteredBikes = await Bike.find();
            filteredBikes = filteredBikes.filter((bike) => bike.isAvailable === true)
        }
    }
    return filteredBikes;

}
