import { PuppeteerCrawler } from 'crawlee';
import dayjs from 'dayjs';
import createRouter from './router/index.js';

export const BASE_URL = 'https://search.ltn.com.tw/list';
export const DATE_FORMAT = 'YYYYMMDD';

class LTNCrawler {
  constructor(options) {
    this.options = options;
  }

  run({
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

    const crawler = new PuppeteerCrawler({
      requestHandler: createRouter(this.startDate),
      ...this.options,
    });

    return crawler.run([
      url.toString(),
    ]);
  }
}

export default LTNCrawler;
