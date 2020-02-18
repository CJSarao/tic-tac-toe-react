import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Game from './components/Game';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';


const gameReducer = (state = 0, action:any) => {
  switch (action.type){
    case "CLICK" :
      return state;
    case "cas2" :
      return state;
    default :
      return state;
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    handleClick: () => dispatch({type: 'CLICK'})
  }
};
const mapStateToProps = (state:any) => {
  return {
    history: state
  };
};
const Container = connect(mapStateToProps, mapDispatchToProps)(Game);

const store = createStore(gameReducer);

const App = () => (
  <Provider store={ store }>
    <Container />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
