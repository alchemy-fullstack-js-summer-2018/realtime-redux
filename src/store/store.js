import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import { error, loading, user, games } from '../components/app/reducers';
import { game, images } from '../components/game/gameReducers';

const rootReducer = combineReducers({
  error,
  loading,
  user,
  games,
  game,
  images
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;
