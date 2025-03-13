"use client"

import { JobTitleCard } from "~/components/job-title-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

interface JobTitleResultsProps {
  jobTitles: {
    id: number
    title: string
    pdlCount: number
    relatedTitles?: string[] | null
    createdAt?: string | Date
    updatedAt?: string | Date | null
  }[]
  isLoading: boolean
  totalCount: number
  sortBy: "relevance" | "pdlCount" | "createdAt"
  onSortChange: (sort: "relevance" | "pdlCount" | "createdAt") => void
}

export function JobTitleResults({ jobTitles, isLoading, totalCount, sortBy, onSortChange }: JobTitleResultsProps) {
  if (isLoading) {
    return <div className="flex justify-center py-8">Loading job titles...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{totalCount} job titles found</h2>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as "relevance" | "pdlCount" | "createdAt")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="pdlCount">Popularity</SelectItem>
            <SelectItem value="createdAt">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {jobTitles.map((jobTitle) => (
          <JobTitleCard key={jobTitle.id} jobTitle={jobTitle} />
        ))}

        {jobTitles.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">No job titles found. Try a different search term.</div>
        )}
      </div>
    </div>
  )
}

