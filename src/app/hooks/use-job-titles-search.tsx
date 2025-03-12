"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export interface JobTitlesSearchFilters {
  query?: string;
  sortBy?: "relevance" | "pdlCount" | "createdAt";
  sortDirection?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export function useJobTitlesSearch(initialFilters: JobTitlesSearchFilters = {}) {
  const [filters, setFilters] = useState<JobTitlesSearchFilters>({
    query: "",
    sortBy: "pdlCount",
    sortDirection: "desc",
    limit: 20,
    offset: 0,
    ...initialFilters,
  });

  const jobTitlesQuery = api.jobTitles.searchJobTitles.useQuery(filters);

  const popularTitlesQuery = api.jobTitles.getPopularJobTitles.useQuery({ limit: 10 });

  const updateFilters = (newFilters: Partial<JobTitlesSearchFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      offset: newFilters.query !== undefined || 
              newFilters.sortBy !== undefined || 
              newFilters.sortDirection !== undefined 
                ? 0 
                : prev.offset,
    }));
  };

  const nextPage = () => {
    if (jobTitlesQuery.data && filters.offset! + filters.limit! < jobTitlesQuery.data.totalCount) {
      setFilters((prev) => ({
        ...prev,
        offset: prev.offset! + prev.limit!,
      }));
    }
  };

  const prevPage = () => {
    if (filters.offset! > 0) {
      setFilters((prev) => ({
        ...prev,
        offset: Math.max(0, prev.offset! - prev.limit!),
      }));
    }
  };

  return {
    filters,
    updateFilters,
    nextPage,
    prevPage,
    isLoading: jobTitlesQuery.isLoading,
    isError: jobTitlesQuery.isError,
    data: jobTitlesQuery.data,
    popularTitles: popularTitlesQuery.data,
  };
}
