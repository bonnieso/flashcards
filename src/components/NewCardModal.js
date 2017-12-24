//associates card with whatever the current deckid is
//takes the card data as a parameter and dispatch addcard event
//we don't include onDelete because it's a falsy value because we are making a new card

import CardModal from './CardModal';
import { connect } from 'react-redux';
import { addCard } from '../actions';

const mapStateToProps = (props, { params: { deckId } }) => ({
  card: { deckId }
});

const mapDispatchToProps = dispatch => ({
  onSave: card => dispatch(addCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
