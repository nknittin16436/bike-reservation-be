import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { CreateBikeData } from "../../dtos/bike.dto";
import { BikeService } from "../../service/bike-service/bike-service";




export class BikeController {
    private bikeService: BikeService;

    constructor(@Inject bikeService: BikeService) {
        this.bikeService = bikeService;
    }

    public async createBike(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const createBikeResponse = await this.bikeService.createBike(req.body as CreateBikeData);
        } catch (error) {

        }
    }
}