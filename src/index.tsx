import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from './components/Game';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer, initialState } from './reducers/reducer'

//
//  Any ce n'est pas digne d'un vrai typescripter
//

//const Container = connect(mapStateToProps, mapDispatchToProps)(Game);

const store = createStore(reducer, initialState);

console.table(store)

const App = () => (
  <Provider store={ store }>
      <Game />
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
