import levelReducer from './level-reducer';
import levelIdReducer from './level-id-reducer';
import playerReducer from './player-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  playerStats: playerReducer,
  levelId: levelIdReducer,
  currentLevel: levelReducer
});

export default rootReducer;
