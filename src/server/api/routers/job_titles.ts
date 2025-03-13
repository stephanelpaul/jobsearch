// import { z } from "zod"
// import { sql, eq, like, or, desc } from "drizzle-orm"
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
// import { jobTitles } from "~/server/db/schema"

// export const jobTitlesRouter = createTRPCRouter({
//   /**
//    * Get a list of job titles.
//    */
//   getJobTitles: publicProcedure.query(async ({ ctx }) => {
//     const titles = await ctx.db.query.jobTitles.findMany({
//       orderBy: [desc(jobTitles.pdlCount)],
//       limit: 50,
//     })
//     return titles
//   }),

//   /**
//    * Search for job titles.
//    */
//   searchJobTitles: publicProcedure
//     .input(
//       z.object({
//         query: z.string().optional(),
//         limit: z.number().min(1).max(100).default(20),
//         offset: z.number().min(0).default(0),
//         sortBy: z.enum(["relevance", "pdlCount", "createdAt"]).default("pdlCount"),
//         sortDirection: z.enum(["asc", "desc"]).default("desc"),
//       }),
//     )
//     .query(async ({ ctx, input }) => {
//       const { query, limit, offset, sortBy, sortDirection } = input

//       const conditions = []

//       if (query && query.trim() !== "") {
//         conditions.push(
//           or(like(jobTitles.title, `%${query}%`), sql`${jobTitles.relatedTitles} @> ARRAY[${query}]::text[]`),
//         )
//       }

//       let orderBy
//       if (sortBy === "relevance" && query && query.trim() !== "") {
//         orderBy = desc(sql`
//           CASE 
//             WHEN ${jobTitles.title} ILIKE ${`${query}%`} THEN 3
//             WHEN ${jobTitles.title} ILIKE ${`%${query}%`} THEN 2
//             WHEN ${jobTitles.relatedTitles} @> ARRAY[${query}]::text[] THEN 1
//             ELSE 0
//           END
//         `)
//       } else if (sortBy === "pdlCount") {
//         orderBy = sortDirection === "desc" ? desc(jobTitles.pdlCount) : jobTitles.pdlCount
//       } else {
//         orderBy = sortDirection === "desc" ? desc(jobTitles.createdAt) : jobTitles.createdAt
//       }

//       const titles =
//         conditions.length > 0
//           ? await ctx.db.query.jobTitles.findMany({
//               where: sql`${sql.join(conditions, sql` AND `)}`,
//               orderBy: [orderBy],
//               limit,
//               offset,
//             })
//           : await ctx.db.query.jobTitles.findMany({
//               orderBy: [orderBy],
//               limit,
//               offset,
//             })

//       const countResult = await ctx.db
//         .select({ count: sql<number>`count(*)` })
//         .from(jobTitles)
//         .where(conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined)

//       const totalCount = countResult[0]?.count ?? 0

//       return {
//         items: titles,
//         totalCount,
//         hasMore: offset + titles.length < totalCount,
//       }
//     }),

//   /**
//    * Get a list of popular job titles.
//    */
//   getPopularJobTitles: publicProcedure
//     .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
//     .query(async ({ ctx, input }) => {
//       const { limit } = input

//       const popularTitles = await ctx.db.query.jobTitles.findMany({
//         orderBy: [desc(jobTitles.pdlCount)],
//         limit,
//       })

//       return popularTitles
//     }),

//   /**
//    * Get a job title by ID.
//    */
//   getJobTitleById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
//     const { id } = input

//     const jobTitle = await ctx.db.query.jobTitles.findFirst({
//       where: eq(jobTitles.id, id),
//     })

//     return jobTitle
//   }),


//   /**
//    * Get related job titles.
//    */
//   getRelatedJobTitles: publicProcedure.input(z.object({ titleId: z.number() })).query(async ({ ctx, input }) => {
//     const { titleId } = input

//     const jobTitle = await ctx.db.query.jobTitles.findFirst({
//       where: eq(jobTitles.id, titleId),
//     })

//     if (!jobTitle?.relatedTitles?.length) {
//       return []
//     }

//     const relatedTitles = await ctx.db.query.jobTitles.findMany({
//       where: sql`${jobTitles.title} = ANY(${jobTitle.relatedTitles}::text[])`,
//       limit: 10,
//     })

//     return relatedTitles
//   }),
// })

import { z } from "zod"
import { sql, eq, like, or, desc } from "drizzle-orm"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { jobTitles } from "~/server/db/schema"

export const jobTitlesRouter = createTRPCRouter({
  // Get all job titles
  getJobTitles: publicProcedure.query(async ({ ctx }) => {
    const titles = await ctx.db.query.jobTitles.findMany({
      orderBy: [desc(jobTitles.pdlCount)],
      limit: 50,
    })
    return titles
  }),

  // Search job titles with filtering
  searchJobTitles: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        sortBy: z.enum(["relevance", "pdlCount", "createdAt"]).default("pdlCount"),
        sortDirection: z.enum(["asc", "desc"]).default("desc"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query, limit, offset, sortBy, sortDirection } = input

      // Build the query conditions
      const conditions = []

      if (query && query.trim() !== "") {
        conditions.push(
          or(like(jobTitles.title, `%${query}%`), sql`${jobTitles.relatedTitles} @> ARRAY[${query}]::text[]`),
        )
      }

      // Add sorting logic
      let orderBy
      if (sortBy === "relevance" && query && query.trim() !== "") {
        // For relevance sorting, we can use a custom scoring function
        orderBy = desc(sql`
          CASE 
            WHEN ${jobTitles.title} ILIKE ${`${query}%`} THEN 3
            WHEN ${jobTitles.title} ILIKE ${`%${query}%`} THEN 2
            WHEN ${jobTitles.relatedTitles} @> ARRAY[${query}]::text[] THEN 1
            ELSE 0
          END
        `)
      } else if (sortBy === "pdlCount") {
        orderBy = sortDirection === "desc" ? desc(jobTitles.pdlCount) : jobTitles.pdlCount
      } else {
        orderBy = sortDirection === "desc" ? desc(jobTitles.createdAt) : jobTitles.createdAt
      }

      // Execute the query with conditions
      const titles =
        conditions.length > 0
          ? await ctx.db.query.jobTitles.findMany({
              where: conditions.length === 1 ? conditions[0] : sql`${conditions[0]}`,
              orderBy: [orderBy],
              limit,
              offset,
            })
          : await ctx.db.query.jobTitles.findMany({
              orderBy: [orderBy],
              limit,
              offset,
            })

      // Get total count for pagination
      const countResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(jobTitles)
        .where(conditions.length > 0 ? conditions[0] : undefined)

      const totalCount = countResult[0]?.count ?? 0

      return {
        items: titles,
        totalCount,
        hasMore: offset + titles.length < totalCount,
      }
    }),

  // Get popular job titles
  getPopularJobTitles: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ ctx, input }) => {
      const { limit } = input

      const popularTitles = await ctx.db.query.jobTitles.findMany({
        orderBy: [desc(jobTitles.pdlCount)],
        limit,
      })

      return popularTitles
    }),

  // Get job title by ID
  getJobTitleById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    const { id } = input

    const jobTitle = await ctx.db.query.jobTitles.findFirst({
      where: eq(jobTitles.id, id),
    })

    return jobTitle
  }),

  // Get related job titles by title string
  getRelatedJobTitlesByTitle: publicProcedure.input(z.object({ title: z.string() })).query(async ({ ctx, input }) => {
    const { title } = input

    // First get the job title to access its related titles
    const jobTitle = await ctx.db.query.jobTitles.findFirst({
      where: eq(jobTitles.title, title),
    })

    if (!jobTitle?.relatedTitles?.length) {
      return []
    }

    // Get the related job titles
    const relatedTitles = await ctx.db.query.jobTitles.findMany({
      where: sql`${jobTitles.title} = ANY(${jobTitle.relatedTitles}::text[])`,
      limit: 10,
    })

    return relatedTitles
  }),
})

