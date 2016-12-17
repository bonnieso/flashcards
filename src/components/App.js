import React from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';

//since we are using react router, we get a second param called router. so mapStateToProps(props, router)
//here we are destructuring to just get params from router (deckId is the token we specified in the <Route> tag)
const mapStateToProps = (props, { params: {deckId} }) => ({
  deckId
});

//we pass in deckId as a paramenter to Toolbar
const App = ({deckId, children}) => {
  return (<div className='app'>
    <Toolbar deckId={deckId}/>
    <Sidebar />
    <h1>{deckId}</h1>
    {children}
  </div>);
}

//connect creates the container component
//now our app has access to deckId
export default connect(mapStateToProps)(App);
