export interface LocationData {
    name: string;
    address: string;
    phone: string;
    mapImage: string;
    mapEmbedUrl: string;
    directionsUrl: string;
}

export interface HoursData {
    days: string;
    time: string;
}

export const locations: LocationData[] = [
    {
        name: '75th Street Location',
        address: '1095 E 75th St, Naperville, IL 60540',
        phone: '(331) 401-5793',
        mapImage: 'map-75th.png',
        mapEmbedUrl: 'https://www.google.com/maps/embed?...',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1095+E+75th+St,+Naperville,+IL+60540',
    },
    {
        name: 'Ace Lane Location',
        address: '5008 Ace Lane, Naperville, IL 60564',
        phone: '(630) 904-0033',
        mapImage: 'map-ace-lane.png',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5008+Ace+Lane,+Naperville,+IL+60564',
    },
];

export const hours = [
    { days: 'Monday - Thursday', time: '8:00 AM - 6:00 PM' },
    { days: 'Friday - Saturday', time: '8:00 AM - 7:00 PM' },
    { days: 'Sunday', time: '8:00 AM - 5:00 PM' },
];