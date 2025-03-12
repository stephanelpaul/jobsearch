import { drizzle } from 'drizzle-orm/node-postgres';

import { env } from "~/env";
import * as schema from "./schema";

import { Client } from 'pg';

export const client = new Client({ connectionString: env.DATABASE_URL });
export const db = drizzle(client, { schema });

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

// export const db = drizzle(client, { schema });
