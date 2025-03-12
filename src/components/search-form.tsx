"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Search, X } from "lucide-react"

interface SearchFormProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export function SearchForm({ onSearch, initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearQuery = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 bg-white rounded-lg shadow-sm p-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search job titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Button type="submit" className="h-12 px-8">
        Search
      </Button>
    </form>
  )
}

