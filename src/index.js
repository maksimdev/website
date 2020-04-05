import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { CookiesProvider } from 'react-cookie';

import Auth from './componentsnew/Auth/Auth';

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Auth history={history} />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
)