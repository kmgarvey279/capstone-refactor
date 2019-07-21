import c from './../constants';

export default (state = {}, action) => {
  let newState;
  let newSquare;
  const { squareId, value, isYou, isEnemy, image} = action;

  switch (action.type) {
    case c.ADD_SQUARE:
        newState = Object.assign({}, state, {
          [squareId]: {
            squareId: squareId,
            value: value,
            isYou: isYou,
            isEnemy: isEnemy,
            image: image
          }
        });
        return newState;
    // case c.UPDATE_VALUE:
    //   newSquare = Object.assign({}, state[id], {value});
    //   newState = Object.assign({}, state, {
    //     [id]: newSquare
    //   });
    //     return newState;
    case c.UPDATE_ISYOU:
      newSquare = Object.assign({}, state[squareId], {isYou});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    // case c.UPDATE_ISENEMY:
    //   newSquare = Object.assign({}, state[id], {isEnemy});
    //   newState = Object.assign({}, state, {
    //     [id]: newSquare
    //   });
    //     return newState;

  default:
    return state;
  }
};
