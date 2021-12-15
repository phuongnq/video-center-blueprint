import { createReduxStore } from '@craftercms/redux';
import { crafterConf } from '@craftercms/classes';
import { studioConfig } from './settings';

import thunk from 'redux-thunk';

import { allReducers } from './reducers';

crafterConf.configure({
  site: studioConfig.site,
  baseUrl: studioConfig.baseUrl,
  endpoints: {
    GET_ITEM_URL: '/api/1/site/content_store/item.json',
    GET_DESCRIPTOR: '/api/1/site/content_store/descriptor.json',
    GET_CHILDREN: '/api/1/site/content_store/children.json',
    GET_TREE: '/api/1/site/content_store/tree.json',
    GET_NAV_TREE: '/api/1/site/navigation/tree.json',
    GET_BREADCRUMB: '/api/1/site/navigation/breadcrumb.json',
    TRANSFORM_URL: '/api/1/site/url/transform.json',
    ELASTICSEARCH: '/api/1/site/elasticsearch/search'
  },
});

const store = createReduxStore({
  namespace: 'craftercms',
  namespaceCrafterState: true,
  reducerMixin: allReducers,
  reduxDevTools: true,
  additionalMiddleWare: [thunk]
});

export default store;
