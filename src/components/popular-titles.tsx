"use client"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useJobTitlesSearch } from "~/hooks/use-job-titles-search"

interface PopularTitlesProps {
  onTitleClick: (title: string) => void
}

export function PopularTitles({ onTitleClick }: PopularTitlesProps) {
  const { popularTitles = [] } = useJobTitlesSearch()

  // Format pdlCount to be more readable
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Popular Job Titles</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(popularTitles) &&
            popularTitles.map((title) => (
              <button
                key={title.id}
                onClick={() => onTitleClick(title.title)}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {title.title}
                <span className="ml-1 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-sm">
                  {formatCount(title.pdlCount)}
                </span>
              </button>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

