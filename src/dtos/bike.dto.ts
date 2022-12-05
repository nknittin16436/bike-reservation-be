export interface CreateBikeData {
    name: string;
    color: string;
    location: string;
    isAvailable: boolean;
}

export interface FilterQuery {
    name: string;
    color: string;
    location: string;
    rating: number;
    fromDate: string;
    toDate: string;
    page: number;
}