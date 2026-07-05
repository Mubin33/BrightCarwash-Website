'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, '...', total];
    if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <div
            className={`flex py-3 px-3 justify-between items-center self-stretch rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <span className={`font-inter text-sm ${isDark ? 'text-white/70' : 'text-[#777980]'}`}>
                Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`flex py-1.5 px-1.5 items-center gap-3 rounded-md border ${isDark ? 'border-white/20 bg-white/[0.08]' : 'border-[#DFE1E7] bg-white'
                        } disabled:opacity-40`}
                >
                    <ChevronLeft size={16} className={isDark ? 'text-white' : 'text-[#1D1F2C]'} />
                </button>
                {pages.map((page, idx) =>
                    page === '...' ? (
                        <span key={`dots-${idx}`} className={`text-sm font-inter ${isDark ? 'text-white/40' : 'text-[#A5A5AB]'}`}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={`flex w-[26px] h-[26px] justify-center items-center rounded-md text-sm font-inter ${page === currentPage
                                    ? 'bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] text-[#1D1F2C] font-medium'
                                    : isDark
                                        ? 'bg-white/[0.06] text-white/60'
                                        : 'bg-[#F6F6F6] text-[#777980]'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`flex py-1.5 px-1.5 items-center gap-3 rounded-md border ${isDark ? 'border-white/20 bg-white/[0.08]' : 'border-[#DFE1E7] bg-white'
                        } disabled:opacity-40`}
                >
                    <ChevronRight size={16} className={isDark ? 'text-white' : 'text-[#1D1F2C]'} />
                </button>
            </div>
        </div>
    );
}