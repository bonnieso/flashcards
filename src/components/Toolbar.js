import React from 'react';
import { showAddDeck, filterCards } from '../actions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

//usually each action has a match dispatch to props
const mapDispatchToProps = dispatch => ({
  showAddDeck: () => dispatch(showAddDeck()),
  onFilter: query => dispatch(filterCards(query))
});

//we take onfilter as a prop parameter
const Toolbar = ({deckId, showAddDeck, onFilter }) => {

  let deckTools = deckId ? (<div>
      <Link className='btn' to={`/deck/${deckId}/new`}> + New Card </Link>
      <Link className='btn' to={`/deck/${deckId}/study`}> + Study Deck </Link>

      <input onChange={e => onFilter(e.target.value)} className='search' type='search' placeholder='Search Deck...' />
    </div>) : null;

  return (<div className='toolbar'>
  <div>
    <button onClick={showAddDeck}>+ New Deck</button>
  </div>
  {deckTools}
  </div>)
}

//we pass null as the first parameter because we don't have a mapStateToProps function
export default connect(null, mapDispatchToProps)(Toolbar);
