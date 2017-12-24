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
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

reducers.routing = routerReducer;

//we can pass an object of state as the second parameter to store
const store = createStore(combineReducers(reducers), localStore.getLocalStore());
const history = syncHistoryWithStore(browserHistory, store); //syncs browser history with redux store

//we want our visible cards to be displayed below our new card modal so this will be a nested route
const routes = (<Route path='/' component={App}>
  <Route path='/deck/:deckId' component={VisibleCards}>
    <Route path='/deck/:deckId/new' component={NewCardModal} />
    <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal}/>
    <Route path='/deck/:deckId/study' component={StudyModal}/>
  </Route>
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
