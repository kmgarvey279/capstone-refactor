import c from './../constants';

export default (state = {}, action) => {
  let newState;
  const { value, id } = action;

  switch (action.type) {
  case c.ADD_SQUARE:
    newState = Object.assign({}, state, {
      [id]: {
        value: value,
        id: id
      }
    });
    return newState;

  default:
    return state;
  }
};
