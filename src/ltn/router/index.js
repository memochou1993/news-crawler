import { createPuppeteerRouter } from 'crawlee';
import { LABEL_ITEM, LABEL_LIST } from '../../constant/index.js';
import fetchItem from '../handlers/fetch-item.js';
import fetchList from '../handlers/fetch-list.js';

const createRouter = (id) => {
  const router = createPuppeteerRouter();

  router.addDefaultHandler(fetchList());
  router.addHandler(LABEL_LIST, fetchList());
  router.addHandler(LABEL_ITEM, fetchItem(id));

  return router;
};

export default createRouter;
