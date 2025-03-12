import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import csvParser from "csv-parser";
import { jobTitles } from "./schema";
import { createReadStream } from "fs";
import { join, dirname } from "path";
import { Transform } from "stream";
import { fileURLToPath } from 'url';
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
	console.log('Using DATABASE_URL:', DATABASE_URL);
	const client = new pg.Pool({
		connectionString: DATABASE_URL,
	});
  
	const db = drizzle(client);
	const data: (typeof jobTitles.$inferInsert)[] = [];

	await new Promise<void>((resolve, reject) => {
		const parser = csvParser({
			headers: ['title', 'pdl count', 'top related titles', ...Array(17).fill(null).map((_, i) => `col${i + 4}`)],
			skipLines: 0
		}) as Transform;

		createReadStream(join(__dirname, 'data', 'job_titles.csv'))
			.pipe(parser)
			.on('data', (row: Record<string, string>) => {
				if (row.title && row['pdl count']) {
					// Skip the header row
					if (row.title === 'title') return;
					
					console.log('\nRaw data for:', row.title);
					
					// Collect all titles from 'top related titles' and subsequent columns
					const relatedTitles = [row['top related titles'], ...Array(17).fill(null).map((_, i) => row[`col${i + 4}`])]
						.filter(Boolean)  // Remove null/undefined values
						.join(',')       // Join all columns
						.split(',')      // Split by comma
						.map(s => s.trim())
						.filter(s => s && s !== '');
					
					console.log('Related Titles:', relatedTitles);
					
					data.push({
						title: row.title.toLowerCase().trim(),
						pdlCount: parseInt(row['pdl count'].replace(/,/g, ''), 10),
						relatedTitles: relatedTitles.map(s => s.toLowerCase()),
						createdAt: new Date(),
						updatedAt: new Date()
					});
				}
			})
			.on('end', () => {
				console.log('CSV parsing finished.');
				resolve();
			})
			.on('error', (err: Error) => {
				console.error('Error parsing CSV:', err);
				reject(err);
			});
	});

	console.log("Seed start");
	if (data.length > 0) {
		await db.insert(jobTitles).values(data);
		console.log(`Successfully inserted ${data.length} job titles`);
	}
	console.log("Seed done");
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await client.end();
};

void main();