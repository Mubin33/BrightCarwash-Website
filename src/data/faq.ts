export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export const faqItems: FaqItem[] = [
    {
        id: '1',
        question: 'What services do you offer?',
        answer:
            'We offer a full range of car care services including express exterior wash, full-service interior and exterior detailing, ceramic coating, engine bay cleaning, headlight restoration, and fleet services for businesses. Our unlimited membership program provides the best value for regular customers.',
    },
    {
        id: '2',
        question: 'How does the membership program work?',
        answer:
            'Our membership program offers unlimited basic washes for a flat monthly fee. Members also receive discounts on additional services like detailing and specialty treatments. You can sign up online, at either location, or through our mobile app.',
    },
    {
        id: '3',
        question: 'Do I need to book in advance?',
        answer:
            'While walk-ins are always welcome, we recommend booking online in advance to guarantee your preferred time slot. Our online booking system lets you select your service, choose a date and time, and pay a small deposit to secure your appointment.',
    },
    {
        id: '4',
        question: 'What is your cancellation policy?',
        answer:
            'You can cancel or reschedule your appointment up to 2 hours before your scheduled time with no penalty. Late cancellations may result in a forfeiture of your deposit. We understand emergencies happen — just give us a call.',
    },
    {
        id: '5',
        question: 'Do you offer fleet services for businesses?',
        answer:
            'Yes! We provide customized fleet washing and detailing solutions for businesses of all sizes. Our fleet program includes priority scheduling, volume discounts, and dedicated account management. Contact us for a customized quote.',
    },
    {
        id: '6',
        question: 'What payment methods do you accept?',
        answer:
            'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, Apple Pay, Google Pay, and cash. For memberships, we require a credit or debit card for monthly billing.',
    },
];