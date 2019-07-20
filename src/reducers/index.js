import levelReducer from './level-reducer';
// import playerReducer from './player-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // playerStats: playerReducer,
  currentLevel: levelReducer
});

export default rootReducer;
