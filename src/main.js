import 'dotenv/config';
import LTNCrawler from './ltn/index.js';

const ltnCrawler = new LTNCrawler({
  maxRequestsPerCrawl: 1000,
  maxConcurrency: 10,
  launchContext: {
    launchOptions: {
      executablePath: process.env.CRAWLER_EXECUTABLE_PATH,
      headless: process.env.CRAWLER_HEADLESS === 'true',
    },
  },
});

ltnCrawler.run({
  keyword: '賴清德',
  startDate: '2023-12-23',
  endDate: '2023-12-24',
});
