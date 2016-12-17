import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import * as reducers from './reducers';
import App from './components/App';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import VisibleCards from './components/VisibleCards';
import * as localStore from './localStore';

reducers.routing = routerReducer;

//we can pass an object of state as the second parameter to store
const store = createStore(combineReducers(reducers), localStore.getLocalStore());
const history = syncHistoryWithStore(browserHistory, store); //syncs browser history with redux store
const routes = (<Route path='/' component={App}>
  <Route path='/deck/:deckId' component={VisibleCards} />
</Route>);

function run() {
  let state = store.getState();

  localStore.setLocalStore(state, ['decks', 'cards']);

  ReactDOM.render(
    (<Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>), document.getElementById('root'));
}

run();

store.subscribe(run);
