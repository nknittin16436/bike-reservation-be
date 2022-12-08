import { CreateBikeData, FilterQuery, SuccessResponseBikes } from "../../dtos/bike.dto";
import { SuccessResponse } from "../../dtos/user.dto";
import { Bike } from "../../entities/bike.entity";
import { filterBikesByQuery, getBikeOnBasisOfRole } from "../../utils/CommonFunction";
import { ErrorHandler } from "../../utils/ErrorHandler";

export class BikeService {
    async createBike(createBikeData: CreateBikeData): Promise<SuccessResponseBikes> {
        const bike: Bike = new Bike();
        bike.name = createBikeData.name;
        bike.color = createBikeData.color;
        bike.location = createBikeData.location;
        bike.isAvailable = createBikeData.isAvailable;
        await bike.save();
        return { success: true };
    }

    async getAllBikes(biketoken: string, filterQuery: FilterQuery): Promise<SuccessResponseBikes> {
        const allBikes = await getBikeOnBasisOfRole(biketoken);
        const queryFilteredBikes = await filterBikesByQuery(allBikes, filterQuery);
        return { success: true, bikes: queryFilteredBikes }
    }


    async updateBike(id: string, updateBikeData: CreateBikeData): Promise<SuccessResponseBikes> {
        const bike: Bike | null = await Bike.findOne({ where: { id: id } });
        if (bike) {
            if (Object.keys(updateBikeData).length !== 0) {
                await Bike.update(id, { ...updateBikeData });
            }

            return { success: true }
        }
        throw new ErrorHandler("Unable to update or Bike not Found", 400);
    }

    async deleteBike(id: string): Promise<SuccessResponseBikes> {
        const bike: Bike | null = await Bike.findOne({ where: { id: id } });
        if (bike) {
            await Bike.delete(id);
            return { success: true }
        }
        throw new ErrorHandler("Unable to delete or Bike not Found", 400);
    }


}