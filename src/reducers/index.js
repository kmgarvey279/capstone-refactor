import levelReducer from './level-reducer';
import gameReducer from './game-reducer';
import playerReducer from './player-reducer';
import projectileReducer from './projectile-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  player: playerReducer,
  currentLevel: levelReducer,
  game: gameReducer,
  projectile: projectileReducer,
  enemies: enemyReducer
});

export default rootReducer;
