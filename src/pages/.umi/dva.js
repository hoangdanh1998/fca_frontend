import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'admin', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/admin.js').default) });
app.model({ namespace: 'global', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/global.js').default) });
app.model({ namespace: 'license', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/license.js').default) });
app.model({ namespace: 'order', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/order.js').default) });
app.model({ namespace: 'partner', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/partner.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/setting.js').default) });
app.model({ namespace: 'statistics', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/statistics.js').default) });
app.model({ namespace: 'transaction', ...(require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/models/transaction.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
