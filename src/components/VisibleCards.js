import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import fuzzySearch from 'fuzzySearch';

const matches = (filter, card) =>
  fuzzySearch(filter, card.front) ||
  fuzzySearch(filter, card.back);

//we need cards from props and params deckid from router
//we need a cards array from mapStateToProps
const mapStateToProps = ({cards, cardFilter }, {params: {deckId}}) => ({
  cards: cards.filter(c => c.deckId === deckId && matches(cardFilter, c))
})

//in main.js we nested the routes, and visible cards now expects new card modal as a child. child is the modal.
//cards is the list of card items we want to display
 const Cards = ({cards, children}) => {
   return (<div className='main'>
    { cards.map(card => <Card card={card} key={card.id} />) }
    { children }
  </div>);
 };

 export default connect(mapStateToProps)(Cards);
