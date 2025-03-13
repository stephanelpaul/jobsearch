"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { ChevronDown, ChevronUp, Users } from "lucide-react"

interface JobTitleCardProps {
  jobTitle: {
    id: number
    title: string
    pdlCount: number
    relatedTitles?: string[] | null
    createdAt?: string | Date
    updatedAt?: string | Date | null
  }
}

export function JobTitleCard({ jobTitle }: JobTitleCardProps) {
  const [showRelated, setShowRelated] = useState(false)

  const toggleRelated = () => {
    setShowRelated(!showRelated)
  }

  // Format pdlCount to be more readable (e.g., 1.2K, 3.5M)
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const hasRelatedTitles =
    jobTitle.relatedTitles && Array.isArray(jobTitle.relatedTitles) && jobTitle.relatedTitles.length > 0

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{jobTitle.title}</h3>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1 text-primary" />
              <span>{formatCount(jobTitle.pdlCount)} professionals</span>

              {jobTitle.createdAt && (
                <span className="ml-4 text-muted-foreground/70 text-xs">
                  Added {new Date(jobTitle.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {hasRelatedTitles && (
            <Button variant="ghost" size="sm" onClick={toggleRelated} className="flex items-center gap-1">
              {showRelated ? (
                <>
                  <span>Hide related</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show related</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {showRelated && hasRelatedTitles && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Related Job Titles:</h4>
            <div className="flex flex-wrap gap-2">
              {jobTitle.relatedTitles!.map((title, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1">
                  {title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

