import { Command } from 'commander';
import 'dotenv/config';
import LTNCrawler from './ltn/index.js';

const program = new Command();

program
  .requiredOption('-k, --keyword <keyword>', 'Specify the search keyword')
  .requiredOption('-f, --from <from>', 'Specify the start date (YYYY-MM-DD)')
  .requiredOption('-t, --to <to>', 'Specify the end date (YYYY-MM-DD)')
  .parse(process.argv);

const { keyword, from, to } = program.opts();

const ltnCrawler = new LTNCrawler({
  maxRequestsPerCrawl: 10000,
  maxConcurrency: 10,
});

ltnCrawler.run({
  keyword,
  from,
  to,
});
