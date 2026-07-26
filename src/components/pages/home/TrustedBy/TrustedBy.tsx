'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { TrustedByLogos } from './TrustedByLogos';
import { trustedCompanies } from './trustedCompanies.data';


export function TrustedBy() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className={`self-stretch px-4 md:px-6 lg:px-10 py-8 flex flex-col justify-center items-center gap-5 overflow-hidden ${isDark ? 'bg-[#1A1A1A] outline-white/20' : 'bg-white outline-stone-200/20'} outline outline-1 outline-offset-[-1px]`}>
            <div className="w-full max-w-[1280px] xl:max-w-[1320px] flex flex-col justify-center items-center gap-5">
                <div className={`self-stretch text-center font-['Inter'] text-base font-medium leading-4 ${isDark ? 'text-white/80' : 'text-neutral-800'}`}>
                    Trusted by the world&apos;s most innovative teams
                </div>
                <TrustedByLogos companies={trustedCompanies} isDark={isDark} />
            </div>
        </section>
    );
}