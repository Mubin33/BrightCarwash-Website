'use client';

import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { useTheme } from '@/contexts/ThemeContext';

const CATEGORIES = ['All', 'Car Care Tips', 'Community', 'Tips & Tricks'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'Popular'];

export function NewsFilters() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 self-stretch overflow-visible">
            <h2 className={`font-bebas-neue text-3xl sm:text-4xl font-normal leading-[100%] tracking-[0.8px] capitalize ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Latest News & Updates
            </h2>
            <div className={`flex sm:justify-center items-center gap-3 overflow-visible ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                <FilterDropdown
                    label="Category"
                    options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                    value="All"
                    onChange={() => { }}
                    minWidth="180px"
                    isDark={isDark}
                />
                <FilterDropdown
                    label="Sort by"
                    options={SORT_OPTIONS.map((s) => ({ value: s, label: s }))}
                    value="Newest"
                    onChange={() => { }}
                    isDark={isDark}
                />
            </div>
        </div>
    );
}



