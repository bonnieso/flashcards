import React from 'react';
import { Link } from 'react-router';

//take in card. of course still descruturing from actual props object. destructure is in curly brackets.

const Card = ({card}) => {
  return (<div className='card'>
      <div>
        <p>{card.front}</p>
         <Link className='btn' to={`/deck/${card.deckId}/edit/${card.id}`}> Edit </Link>
      </div>
  </div>);
}

export default Card; 
