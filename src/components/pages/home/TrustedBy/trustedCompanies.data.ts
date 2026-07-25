export interface Company {
    name: string;
    logo: string;
    width: number;
    height: number;
}

export const trustedCompanies: Company[] = [
    {
        name: 'Company 1',
        logo: '/icons/svgs/company1.svg',
        width: 160,
        height: 48,
    },
    {
        name: 'Company 2',
        logo: '/icons/svgs/company2.svg',
        width: 144,
        height: 48,
    },
    {
        name: 'Company 3',
        logo: '/icons/svgs/company3.svg',
        width: 128,
        height: 48,
    },
    {
        name: 'Company 4',
        logo: '/icons/svgs/company4.svg',
        width: 176,
        height: 48,
    },
];