export interface JobTitle {
    id: number
    title: string
    pdlCount: number
    relatedTitles?: string[] | null
    createdAt?: string | Date
    updatedAt?: string | Date | null
  }
  
  export interface JobTitlesSearchResult {
    items: JobTitle[]
    totalCount: number
    hasMore: boolean
  }
  
  export interface JobTitlesSearchFilters {
    query?: string
    sortBy?: "relevance" | "pdlCount" | "createdAt"
    sortDirection?: "asc" | "desc"
    limit?: number
    offset?: number
  }
  
  export interface MainNavRoute {
    href: string
    label: string
    active? : boolean
    requiresAuth?: boolean
  }