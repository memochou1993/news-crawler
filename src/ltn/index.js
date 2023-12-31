import log from '@apify/log';
import { PuppeteerCrawler } from 'crawlee';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax.js';
import { BASE_URL, DATE_FORMAT } from './constant/index.js';
import createRouter from './router/index.js';

dayjs.extend(minMax);

class LTNCrawler {
  constructor(options) {
    this.crawler = new PuppeteerCrawler({
      requestHandler: createRouter(),
      ...options,
    });
  }

  async run({
    keyword,
    from,
    to,
  }) {
    const start = dayjs(from);
    const end = dayjs.min(dayjs(to), dayjs());
    const range = end.diff(start, 'day');

    for (let i = 0; i < range; i += 1) {
      const from = start.add(i, 'day').format(DATE_FORMAT);
      const to = start.add(i + 1, 'day').format(DATE_FORMAT);
      log.info(`Preparing the crawler for the keyword "${keyword}" from ${from} to ${to}`);
      await this.start({
        keyword,
        startDate: from,
        endDate: to,
      });
    }
  }

  start({
    keyword,
    startDate,
    endDate,
  }) {
    const params = {
      keyword,
      start_time: dayjs(startDate).format(DATE_FORMAT),
      end_time: dayjs(endDate).format(DATE_FORMAT),
      sort: 'date',
      type: 'all',
      page: '1',
    };

    const url = new URL(BASE_URL);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return this.crawler.run([
      url.toString(),
    ]);
  }
}

export default LTNCrawler;
