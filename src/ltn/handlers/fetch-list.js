import { LABEL_ITEM, LABEL_LIST } from '../../constant/index.js';

const fetchList = () => async ({ page, enqueueLinks, log }) => {
  const links = await enqueueLinks({
    label: LABEL_ITEM,
    strategy: 'same-domain',
    selector: '.tit',
  });
  log.info('Enqueueing links', links);

  const next = await page.$('.p_next');
  if (next) {
    const links = await enqueueLinks({
      label: LABEL_LIST,
      strategy: 'same-domain',
      selector: '.p_next',
    });
    log.info('Enqueueing links', links);
  }
};

export default fetchList;
