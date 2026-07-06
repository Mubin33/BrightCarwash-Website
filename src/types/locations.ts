export interface ApiLocation {
    id: string;
    name: string;
    timezone: string;
    phoneNumber?: string;
    address: {
        addressLine1: string;
        locality: string;
        administrativeDistrictLevel1: string;
        postalCode: string;
        country: string;
    };
    businessHours: {
        periods: {
            dayOfWeek: string;
            startLocalTime: string;
            endLocalTime: string;
        }[];
    };
}

export interface LocationsResponse {
    success: boolean;
    message: string;
    data: ApiLocation[];
}