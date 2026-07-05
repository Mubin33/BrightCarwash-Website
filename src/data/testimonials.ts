export interface TestimonialData {
    id: string;
    name: string;
    title: string;
    rating: number;
    comment: string;
    image: string;
    tall?: boolean;
    featured?: boolean;
}

export const testimonials: TestimonialData[] = [
    {
        id: '1',
        name: 'Samantha Ortiz',
        title: 'Marketing Specialist',
        rating: 5,
        comment:
            "I can't express enough how impressed I am with the Brightside Car Wash service! From the moment I arrived, the staff greeted me with warm smiles and a genuine eagerness to help. The convenience of their scheduling made it easy for me to find a time that worked with my busy life. Once my car was in their capable hands, I could see the meticulous attention to detail they put into every wash.",
        image: '/images/testimonial.png',
        tall: true,
    },
    {
        id: '2',
        name: 'Marcus Chen',
        title: 'Software Engineer',
        rating: 5,
        comment:
            'Brightside is hands down the best car wash in Naperville. Their attention to detail is unmatched and my car has never looked better.',
        image: '/images/testimonial.png',
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        title: 'Teacher',
        rating: 5,
        comment:
            'As a busy teacher, I need reliable service. Brightside delivers every time. The membership program is a game-changer for my schedule and budget.',
        image: '/images/testimonial.png',
    },
    {
        id: '4',
        name: 'David Thompson',
        title: 'Business Owner',
        rating: 5,
        comment:
            'I bring my entire fleet here. Professional, consistent, and always exceeding expectations. Highly recommended for any business.',
        image: '/images/testimonial.png',

    },
    {
        id: '5',
        name: 'Lisa Patel',
        title: 'Healthcare Worker',
        rating: 4,
        comment:
            'The heroes membership is fantastic. As a nurse, I appreciate businesses that give back to the community. Great service every visit.',
        image: '/images/testimonial.png',
    },
    {
        id: '6',
        name: 'James Wilson',
        title: 'Real Estate Agent',
        rating: 5,
        comment:
            'My car is my office. Brightside keeps it looking showroom-ready. The online booking makes it so easy to fit into my schedule.',
        image: '/images/testimonial.png',
        tall: false,
    },
    {
        id: '7',
        name: 'James Wilson',
        title: 'Real Estate Agent',
        rating: 3.5,
        comment:
            'My car is my office. Brightside keeps it looking showroom-ready. The online booking makes it so easy to fit into my schedule.',
        image: '/images/testimonial.png',
        tall: true,
        featured: true,
    },

];