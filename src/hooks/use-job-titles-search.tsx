"use client"

import { useState } from "react"
import { api } from "~/trpc/react"
import type { JobTitlesSearchFilters, JobTitlesSearchResult } from "~/types"

export function useJobTitlesSearch(initialFilters: JobTitlesSearchFilters = {}) {
  const [filters, setFilters] = useState<JobTitlesSearchFilters>({
    query: "",
    sortBy: "pdlCount",
    sortDirection: "desc",
    limit: 20,
    offset: 0,
    ...initialFilters,
  })

  const jobTitlesQuery = api.jobTitles.searchJobTitles.useQuery(filters, {
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  })

  const popularTitlesQuery = api.jobTitles.getPopularJobTitles.useQuery({ limit: 10 }, {
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false
  })

  const updateFilters = (newFilters: Partial<JobTitlesSearchFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset offset when changing filters
      offset:
        newFilters.query !== undefined || newFilters.sortBy !== undefined || newFilters.sortDirection !== undefined
          ? 0
          : prev.offset,
    }))
  }

  const nextPage = () => {
    if (jobTitlesQuery.data && (filters.offset ?? 0) + (filters.limit ?? 20) < jobTitlesQuery.data.totalCount) {
      setFilters((prev) => ({
        ...prev,
        offset: (prev.offset ?? 0) + (prev.limit ?? 20),
      }))
    }
  }

  const prevPage = () => {
    if ((filters.offset ?? 0) > 0) {
      setFilters((prev) => ({
        ...prev,
        offset: Math.max(0, (prev.offset ?? 0) - (prev.limit ?? 20)),
      }))
    }
  }

  return {
    filters,
    updateFilters,
    nextPage,
    prevPage,
    isLoading: jobTitlesQuery.isLoading,
    isError: jobTitlesQuery.isError,
    data: jobTitlesQuery.data as JobTitlesSearchResult | undefined,
    popularTitles: popularTitlesQuery.data,
  }
}

