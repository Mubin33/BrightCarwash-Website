export interface NewsDetail {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    firstHalf: string;
    secondHalf: string;
    images: string[];
}

export const newsDetails: NewsDetail[] = [
    {
        id: '1',
        title: 'Why Regular Car Washing Protects Your Paint — And Your Wallet',
        category: 'Car Care Tips',
        date: 'June 15, 2026',
        image: '/images/newsImage-1.png',
        firstHalf:
            "Your car's paint is under attack every single day. Bird droppings, road salt, tree sap, UV rays, and industrial fallout are constantly breaking down your vehicle's clear coat — the invisible layer that keeps your paint looking new. When contaminants sit on your paint, they begin to etch into the clear coat, causing permanent damage that can only be fixed with expensive paint correction. Regular washing removes these harmful substances before they have a chance to cause lasting harm.",
        secondHalf:
            "Beyond protection, regular washing maintains your car's resale value. A well-maintained exterior signals to potential buyers that the vehicle has been cared for properly. At Brightside, we use professional-grade products and techniques that are gentle on your paint while effectively removing dirt and contaminants. Our touchless wash options eliminate the risk of swirl marks that can occur with improper hand washing. Make car washing a regular part of your vehicle maintenance routine — your paint and your wallet will thank you.",
        images: ['/images/newsImage-1.png', '/images/newsImage-1.png'],
    },
    {
        id: '2',
        title: '$50/Month Unlimited Wash — Built for People Who Take Pride in Their Vehicle',
        category: 'Car Care Tips',
        date: 'June 15, 2026',
        image: '/images/newsImage-2.png',
        firstHalf:
            "We built our monthly membership for drivers who don't want to think twice before pulling into the wash. For a flat $50/month, you get unlimited access to our best wash package — the same premium service others pay $25+ per visit for. That means if you wash just twice a month, you're already saving money.",
        secondHalf:
            "Members also enjoy exclusive perks: priority lane access during busy hours, 10% off all detailing services, and a free annual express detail valued at over $160. Our members tell us the best part isn't just the savings — it's the peace of mind knowing their vehicle always looks its best without having to budget for each visit.",
        images: ['/images/newsImage-3.png', '/images/newsImage-4.png'],
    },
];