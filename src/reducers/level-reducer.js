import constants from './../constants';
const { types } = constants;

const levelReducer = (state = {}, action) => {
  let newState;
  let newSquare;
  const { squareId, value, isYou, isEnemy, isProjectile, image} = action;

  switch (action.type) {
    case types.NULL_LEVEL:
      newState = {};    
      return newState;
    case types.ADD_SQUARE:
        newState = Object.assign({}, state, {
          [squareId]: {
            squareId: squareId,
            value: value,
            isYou: isYou,
            isEnemy: isEnemy,
            isProjectile: isProjectile,
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
    case types.UPDATE_ISYOU:
      newSquare = Object.assign({}, state[squareId], {isYou});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case types.UPDATE_ISPROJECTILE:
      newSquare = Object.assign({}, state[squareId], {isProjectile});
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

export default levelReducer;