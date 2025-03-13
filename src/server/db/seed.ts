import { jobTitles } from "./schema";
import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

import { db } from "./index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const main = async () => {
	const data: (typeof jobTitles.$inferInsert)[] = [];

	await new Promise<void>((resolve, reject) => {
		const parser = csvParser({
			headers: ['title', 'pdl count', 'top related titles', ...Array(17).fill(null).map((_, i) => `col${i + 4}`)],
			skipLines: 0
		});

		createReadStream(join(__dirname, 'data', 'job_titles.csv'))
			.pipe(parser)
			.on('data', (row: Record<string, string>) => {
				if (row.title && row['pdl count']) {
					if (row.title === 'title') return;
					
					const relatedTitles = [row['top related titles'], ...Array(17).fill(null).map((_, i) => row[`col${i + 4}`])]
						.filter(Boolean)
						.join(',')
						.split(',')
						.map(s => s.trim())
						.filter(s => s && s !== '');
					
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

	console.log("Checking for existing job titles...");

	const existingTitlesSet = new Set<string>(
		(await db.select({ title: jobTitles.title }).from(jobTitles)).map(row => row.title.toLowerCase())
	);

	const newData = data.filter(job => !existingTitlesSet.has(job.title));

	if (newData.length > 0) {
		await db.insert(jobTitles).values(newData);
		console.log(`Successfully inserted ${newData.length} new job titles`);
	} else {
		console.log("No new job titles to insert.");
	}

	console.log("Seed process completed.");
};

void main();
