import React from 'react';
import { showAddDeck } from '../actions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  showAddDeck: () => dispatch(showAddDeck())
});

const Toolbar = ({deckId, showAddDeck}) => {

  console.log("this is deckId", deckId);

  let deckTools = deckId ? (<div>
      <Link to={`/deck/${deckId}/new`}> + New Card </Link>
      <Link to={`/deck/${deckId}/study`}> + Study Deck </Link>
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
