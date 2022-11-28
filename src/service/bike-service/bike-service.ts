import { CreateBikeData } from "../../dtos/bike.dto";
import { Bike } from "../../entities/bike.entity";
import { getBikeOnBasisOfRole } from "../../utils/CommonFunction";
import { ErrorHandler } from "../../utils/ErrorHandler";

export class BikeService {
    async createBike(createBikeData: CreateBikeData) {
        const bike: Bike = new Bike();
        bike.name = createBikeData.name;
        bike.color = createBikeData.color;
        bike.location = createBikeData.location;
        bike.isAvailable = createBikeData.isAvailable;
        await bike.save();
        return { success: true };
    }
    async getAllBikes(biketoken: string) {
        const allBikes = await getBikeOnBasisOfRole(biketoken);


        return { success: true, bikes: allBikes }
    }




    async updateBike(id: string, updateBikeData: CreateBikeData) {
        const bike: Bike | null = await Bike.findOne({ where: { id: id } });
        if (bike) {
            if (Object.keys(updateBikeData).length !== 0) {
                console.log(updateBikeData)
                await Bike.update(id, { ...updateBikeData });
            }

            return { success: true }
        }
        throw new ErrorHandler("Unable to update or Bike not Found", 400);
    }
    async deleteBike(id: string) {
        const bike: Bike | null = await Bike.findOne({ where: { id: id } });
        if (bike) {
            await Bike.delete(id);
            return { success: true }
        }
        throw new ErrorHandler("Unable to delete or Bike not Found", 400);
    }


}