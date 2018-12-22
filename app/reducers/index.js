// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import game from './game';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    // counter,
    app,
    game
  });
}

// export default combineReducers({
//   app,
//   game
// });