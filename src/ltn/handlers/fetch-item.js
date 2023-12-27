import { Dataset } from 'crawlee';

const fetchItem = (id) => async ({ request, page, log }) => {
  const title = await page.title();
  log.info(title, { url: request.loadedUrl });

  const data = await page.$$eval('p', ($elements) => (
    $elements
      .map(({ innerText }) => innerText)
      .filter((v) => v)
  ));

  const dataset = await Dataset.open(id);
  dataset.pushData({
    url: request.loadedUrl,
    title,
    data,
  });
};

export default fetchItem;
