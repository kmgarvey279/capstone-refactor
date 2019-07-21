import c from './../constants';

export default (state = 1, action) => {
  let newState;
  switch (action.type) {
    case c.LEVELID_UP:
      newState = state + 1
      return newState;
    // case c.LEVELID_DOWN:
    //     return state - 1
    // case c.LEVELID_RESET:
    //     return 0
  default:
    return state;
  }
};