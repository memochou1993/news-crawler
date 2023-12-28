import { Dataset } from 'crawlee';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constant/index.js';

const fetchItem = async ({ request, page, log }) => {
  const title = await page.title();
  const timestamp = await page.$eval('meta[property="article:published_time"]', ({ content }) => content);
  const paragraphs = await page.$$eval('.content p:not([id]):not([class])', ($elements) => (
    $elements
      .map(({ innerText }) => innerText)
      .filter((v) => v)
  ));

  const data = {
    title,
    date: timestamp,
    url: request.loadedUrl,
    data: paragraphs,
  };

  const id = dayjs(timestamp).format(DATE_FORMAT);
  const dataset = await Dataset.open(id);
  dataset.pushData(data);

  log.info(title, {
    date: data.date,
    url: data.url,
  });
};

export default fetchItem;
