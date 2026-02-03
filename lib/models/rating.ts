export interface Rating {
    id: string;
    restaurantId: string;
    orderId?: string | null;
    rating: number; // 1-5 stars
    comment?: string | null;
    customerName?: string | null;
    foodRating?: number | null;
    serviceRating?: number | null;
    ambianceRating?: number | null;
    isPublic: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RatingWithOrder extends Rating {
    order?: {
        orderNumber: string;
        total: number;
    } | null;
}

export interface RatingStats {
    averageRating: number;
    totalRatings: number;
    ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    averageFoodRating?: number;
    averageServiceRating?: number;
    averageAmbianceRating?: number;
}

export interface CreateRatingInput {
    restaurantId: string;
    orderId?: string;
    rating: number;
    comment?: string;
    customerName?: string;
    foodRating?: number;
    serviceRating?: number;
    ambianceRating?: number;
}
