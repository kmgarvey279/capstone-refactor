import c from './../constants';

export default (state = {}, action) => {
  switch (action.type) {
  case c.SELECT_SQUARE;
      return action.SquareId;
  default:
    return state;
  }
};
