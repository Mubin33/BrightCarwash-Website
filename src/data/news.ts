export interface NewsArticle {
    id: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
}

export const featuredArticle: NewsArticle = {
    id: '1',
    category: 'Car Care Tips',
    date: 'June 15, 2026',
    title: 'Why Regular Car Washing Protects Your Paint — And Your Wallet',
    excerpt:
        "Your car's paint is under attack every single day. Bird droppings, road salt, tree sap, UV...",
    image: '/images/newsImage-1.png',
};

export const sideArticles: NewsArticle[] = [
    {
        id: '2',
        category: 'Car Care Tips',
        date: 'June 15, 2026',
        title: '$50/Month Unlimited Wash — Built for People Who Take Pride in Their Vehicle',
        excerpt: "We built our monthly membership for drivers who don't want to think twice before pulling into...",
        image: '/images/newsImage-2.png',
    },
    {
        id: '3',
        category: 'Community',
        date: 'June 10, 2026',
        title: 'Brightside Hosts Annual Charity Wash for Local Veterans',
        excerpt: 'Over $5,000 raised to support veterans in the Naperville community through our annual...',
        image: '/images/newsImage-3.png',
    },
    {
        id: '4',
        category: 'Tips & Tricks',
        date: 'June 5, 2026',
        title: '5 Things You Should Never Do at a Car Wash',
        excerpt: 'Avoid these common mistakes to keep your vehicle looking its best and prevent...',
        image: '/images/newsImage-4.png',
    },
];