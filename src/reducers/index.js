import levelReducer from './level-reducer';
import selectedSquareReducer from './selected-square-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  selectedSquare: selectedSquareReducer,
  currentLevel: levelReducer
});

export default rootReducer;
