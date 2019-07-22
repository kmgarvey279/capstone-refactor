import levelReducer from './level-reducer';
import levelIdReducer from './level-id-reducer';
import gameReducer from './game-reducer';
import playerReducer from './player-reducer';
import projectileReducer from './projectile-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  player: playerReducer,
  levelId: levelIdReducer,
  currentLevel: levelReducer,
  game: gameReducer,
  projectile: projectileReducer
});

export default rootReducer;
