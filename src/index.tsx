import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from './components/Game';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'

const store = createStore(
    combineReducers({reducer}), 
    applyMiddleware(thunk)
)

ReactDOM.render(   
    <Provider store={ store }>
      <Game />
    </Provider>, 
    document.getElementById('root'))

serviceWorker.unregister();
