export interface PublicHeroData {
    eyebrow_text: string;
    main_headline: string;
    subtext: string;
    star_rating: string;
    cars_washed: string;
    avg_time: string;
    backgroundImageUrl?: string;
    bannerImageUrl?: string;
    status: 'form' | 'banner' | 'hidden';
    text_alignment: 'left' | 'center' | 'right';
}