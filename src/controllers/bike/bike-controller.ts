import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { CreateBikeData, FilterQuery, SuccessResponseBikes } from "../../dtos/bike.dto";
import { BikeService } from "../../service";




export class BikeController {
    private bikeService: BikeService;

    constructor(@Inject bikeService: BikeService) {
        this.bikeService = bikeService;
    }

    public async createBike(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createBikeResponse: SuccessResponseBikes = await this.bikeService.createBike(req.body as CreateBikeData);
            res.status(201).json({ ...createBikeResponse, message: "Bike created succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })

        }
    }

    public async getBikes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const getBikesResponse: SuccessResponseBikes = await this.bikeService.getAllBikes(req.cookies.biketoken as string, req.query as any);
            res.status(201).json({ ...getBikesResponse, message: "Bike Fetched succesfully" })

        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })


        }
    }

    public async updateBike(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const updateBikeResponse: SuccessResponseBikes = await this.bikeService.updateBike(req.params.id as string, req.body as CreateBikeData);
            res.status(201).json({ ...updateBikeResponse, message: "Bike Updated succesfully" })

        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })

        }
    }
    public async deleteBike(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const deleteBikeResponse: SuccessResponseBikes = await this.bikeService.deleteBike(req.params.id as string);
            res.status(200).json({ ...deleteBikeResponse, message: "Bike deleted succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}