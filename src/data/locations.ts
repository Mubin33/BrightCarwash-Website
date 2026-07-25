import { LocationData, HoursData } from "@/types/locations";


export const locations: LocationData[] = [
    {
        name: '75th Street Location',
        address: '1095 E 75th St, Naperville, IL 60540',
        phone: '(331) 401-5793',
        mapImage: 'map-75th.png',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.664632236562!2d-88.12096958795637!3d41.7493260711364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e5793e9dcaf9f%3A0x6ed8476c9f89f16!2sBrightside%20Car%20Wash!5e0!3m2!1sen!2sbd!4v1784956753806!5m2!1sen!2sbd',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1095+E+75th+St,+Naperville,+IL+60540',
    },
    {
        name: 'Ace Lane Location',
        address: '5008 Ace Lane, Naperville, IL 60564',
        phone: '(630) 904-0033',
        mapImage: 'map-ace-lane.png',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.869053925799!2d-88.20876988795946!3d41.680171371144375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef6626f0ac621%3A0x63232b18c6c2b595!2sBrightside%20Car%20Wash!5e0!3m2!1sen!2sbd!4v1784956714650!5m2!1sen!2sbd',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5008+Ace+Lane,+Naperville,+IL+60564',
    },
];

export const hours: HoursData[] = [
    { days: 'Monday - Thursday', time: '8:00 AM - 6:00 PM' },
    { days: 'Friday - Saturday', time: '8:00 AM - 7:00 PM' },
    { days: 'Sunday', time: '8:00 AM - 5:00 PM' },
];