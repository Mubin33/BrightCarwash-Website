'use client';

import { useState } from "react";
import { NewsFilters } from "./NewsFilters";
import { NewsCard } from "./NewsCard";
import { useTheme } from "@/contexts/ThemeContext";
import { Pagination } from "@/components/ui/Pagination";
import { useNewsList } from "@/hooks/useNewsList";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export function NewsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const { articles, loading, meta, categories } = useNewsList(currentPage, 6, selectedCategoryId);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const allArticles = articles;
  const totalPages = meta?.total_pages || 1;

  if (loading) {
    return (
      <section
        className={`flex py-20 px-4 sm:px-8 lg:px-75 flex-col justify-center items-center gap-12 self-stretch ${isDark ? "bg-[#1A1A1A]" : "bg-[#F5F5F5]"}`}
      >
        <SkeletonGrid count={6} isDark={isDark} className="max-w-330" />
      </section>
    );
  }

  return (
    <section
      className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40  flex-col justify-center items-center gap-12 self-stretch ${isDark ? "bg-[#1A1A1A]" : "bg-[#F5F5F5]"}`}
    >
      <NewsFilters
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-330">
        {allArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="w-full max-w-330">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}