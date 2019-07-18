import levelReducer from './level-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  currentLevel: levelReducer
});

export default rootReducer;
