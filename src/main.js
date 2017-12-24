import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import * as reducers from './reducers';
import App from './components/App';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';
import thunkMiddleware from 'redux-thunk';
import { fetchData } from './actions';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store); //syncs browser history with redux store

//we want our visible cards to be displayed below our new card modal so this will be a nested route
const routes = (<Route path='/' component={App}>
  <Route path='/deck/:deckId' component={VisibleCards}>
    <Route path='/deck/:deckId/new' component={NewCardModal} />
    <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal}/>
    <Route path='/deck/:deckId/study' component={StudyModal}/>
  </Route>
</Route>);

//everytime the store changes, we want to save to the database server
//we only want to really save when the decks or cards change, so maybe we can save a previous verison of cards and decks and compare those and only save and do fetch if diff
function save() {
  var state = store.getState();

  fetch('/api/data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      decks: state.decks,
      cards: state.cards
    })
  });
}

function run() {
  let state = store.getState();

  ReactDOM.render(
    (<Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>), document.getElementById('root'));
}

function init() {
  run();
  store.subscribe(run);
  store.subscribe(save);
  store.dispatch(fetchData());
}

init();
