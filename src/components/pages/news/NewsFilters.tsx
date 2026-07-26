'use client';

import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { useTheme } from '@/contexts/ThemeContext';
import type { ApiNewsCategory } from '@/types/news';

interface NewsFiltersProps {
    categories: ApiNewsCategory[];
    selectedCategoryId: string | undefined;
    onCategoryChange: (categoryId: string | undefined) => void;
    selectedSort: string;
    onSortChange: (sort: string) => void;
}

const SORT_OPTIONS = ['Newest', 'Oldest'];

export function NewsFilters({
    categories,
    selectedCategoryId,
    onCategoryChange,
    selectedSort,
    onSortChange
}: NewsFiltersProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const categoryOptions = [
        { value: 'all', label: 'All' },
        ...categories.map((cat) => ({ value: cat.id, label: cat.name }))
    ];

    const handleCategoryChange = (value: string) => {
        if (value === 'all') {
            onCategoryChange(undefined);
        } else {
            onCategoryChange(value);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-330 mx-auto">
            <h2 className={`font-bebas-neue text-3xl sm:text-4xl font-normal leading-[100%] tracking-[0.8px] capitalize ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Latest News & Updates
            </h2>
            <div className={`flex sm:justify-center items-center gap-3 overflow-visible ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                <FilterDropdown
                    label="Category"
                    options={categoryOptions}
                    value={selectedCategoryId || 'all'}
                    onChange={handleCategoryChange}
                    minWidth="180px"
                    isDark={isDark}
                />
                <FilterDropdown
                    label="Sort by"
                    options={SORT_OPTIONS.map((s) => ({ value: s, label: s }))}
                    value={selectedSort}
                    onChange={onSortChange}
                    isDark={isDark}
                />
            </div>
        </div>
    );
}