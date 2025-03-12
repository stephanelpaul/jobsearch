"use client";

import { Hero } from "~/components/hero";
import { SearchForm } from "~/components/search-form";
import { JobTitleResults } from "~/components/job-title-results";
import { PopularTitles } from "~/components/popular-titles";
import { useJobTitlesSearch } from "~/hooks/use-job-titles-search";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "~/components/ui/pagination";

export function JobSearch() {
  const { 
    filters, 
    updateFilters, 
    nextPage, 
    prevPage, 
    isLoading, 
    data 
  } = useJobTitlesSearch();

  const jobTitles = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const currentPage = Math.floor((filters.offset || 0) / (filters.limit || 20)) + 1;
  const totalPages = Math.ceil(totalCount / (filters.limit || 20));

  const handleSearch = (query: string) => {
    updateFilters({ query });
  };

  const handleSortChange = (sortBy: "relevance" | "pdlCount" | "createdAt") => {
    updateFilters({ sortBy });
  };

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <SearchForm onSearch={handleSearch} initialQuery={filters.query || ""} />
        
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <JobTitleResults 
              jobTitles={jobTitles} 
              isLoading={isLoading} 
              totalCount={totalCount}
              sortBy={filters.sortBy || "pdlCount"}
              onSortChange={handleSortChange}
            />
            
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => prevPage()} 
                        className={filters.offset === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            isActive={currentPage === pageNum}
                            onClick={() => updateFilters({ offset: (pageNum - 1) * (filters.limit || 20) })}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => nextPage()} 
                        className={!data?.hasMore ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3">
            <PopularTitles onTitleClick={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
