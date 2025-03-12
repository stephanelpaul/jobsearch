import { sql } from "drizzle-orm"
import { index, serial, pgTableCreator, text, timestamp, integer, varchar } from "drizzle-orm/pg-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema [^1]
 */
export const createTable = pgTableCreator((name) => `jobsearch_${name}`)

export const jobTitles = createTable(
  "job_titles",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    pdlCount: integer("pdl_count").notNull(),
    relatedTitles: text("related_titles").array(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    titleIndex: index("title_idx").on(table.title),
  }),
)