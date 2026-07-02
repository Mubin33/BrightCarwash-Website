export interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    image: string;
}

export const services: ServiceData[] = [
    {
        id: 'express-detail',
        name: 'Express Detail',
        description: 'Quick exterior wash, interior vacuum, window cleaning, and tire shine. Perfect for regular maintenance.',
        price: 50,
        duration: '8 hours',
        image: '/images/service-express.jpg',
    },
    {
        id: 'full-detail',
        name: 'Full Detail',
        description: 'Complete interior and exterior detailing including wax, polish, shampoo, and leather treatment.',
        price: 120,
        duration: '4 hours',
        image: '/images/service-full.jpg',
    },
    {
        id: 'premium-detail',
        name: 'Premium Detail',
        description: 'Our most comprehensive package with ceramic coating, engine bay cleaning, and headlight restoration.',
        price: 200,
        duration: '6 hours',
        image: '/images/service-premium.jpg',
    },
];