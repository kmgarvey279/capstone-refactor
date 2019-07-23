import constants from './../constants';
const { types } = constants;

const levelReducer = (state = {}, action) => {
  let newState;
  let newSquare;
  const { squareId, value, isYou, isEnemy, isProjectile, tileImage, sprite} = action;

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
            tileImage: tileImage,
            sprite: sprite
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
    case types.UPDATE_SPRITE:
      newSquare = Object.assign({}, state[squareId], {sprite});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case types.UPDATE_ISENEMY:
      newSquare = Object.assign({}, state[squareId], {isEnemy});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
  default:
    return state;
  }
};

export default levelReducer;
