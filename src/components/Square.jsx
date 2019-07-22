import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import playerNorth from '../assets/images/north.png';
import playerEast from '../assets/images/East.png';
import playerSouth from '../assets/images/South.png';
import playerWest from '../assets/images/West.png';
import enemyStand from '../assets/images/enemyStand.png';
import flare from '../assets/images/flare.png';

function Square(props){

  if (props.isYou == true) {
    if(props.player.direction === 'N') {
      return (
        <div>
          <style jsx>{`
            img {
              z-index: -1;
              position: relative;
            }
            img#player {
              position: absolute;
              z-index: 1;
            }
          `}</style>
          <img id="player" src={playerNorth} weight="50" height="50"/>
          {props.image}
        </div>
      )
    } else if(props.player.direction === 'E') {
      return (
        <div>
          <style jsx>{`
            img {
              z-index: -1;
              position: relative;
            }
            img#player {
              position: absolute;
              z-index: 1;
            }
          `}</style>
          <img id="player" src={playerEast} weight="50" height="50"/>
          {props.image}
        </div>
      )
    } else if(props.player.direction === 'S') {
      return (
        <div>
          <style jsx>{`
            img {
              z-index: -1;
              position: relative;
            }
            img#player {
              position: absolute;
              z-index: 1;
            }
          `}</style>
          <img id="player" src={playerSouth} weight="50" height="50"/>
          {props.image}
        </div>
      )
    } else if(props.player.direction === 'W') {
      return (
        <div>
          <style jsx>{`
            img {
              z-index: -1;
              position: relative;
            }
            img#player {
              position: absolute;
              z-index: 1;
            }
          `}</style>
          <img id="player" src={playerWest} weight="50" height="50"/>
          {props.image}
        </div>
      )
    }
  } else if (props.isEnemy == true) {
    return (
      <div>
        <style jsx>{`
          img {
            z-index: -1;
            position: relative;
          }
          img#enemy {
            position: absolute;
            z-index: 1;
          }
        `}</style>
        <img id="enemy" src={enemyStand} weight="50" height="50"/>
        {props.image}
      </div>
    )
  } else if (props.isProjectile == true){
    return (
      <div>
        <style jsx>{`
          img {
            z-index: -1;
            position: relative;
          }
          img#projectile {
            position: absolute;
            z-index: 1;
          }
        `}</style>
        <img id="projectile" src={flare} weight="50" height="50"/>
        {props.image}
      </div>
    )
  } else {
    return (
      <div>
        <style jsx>{`
          img {
            z-index: -1;
          }
        `}</style>
        {props.image}
      </div>
    )
  }
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  isYou: PropTypes.bool.isRequired,
  isEnemy: PropTypes.bool.isRequired,
  isProjectile: PropTypes.bool.isRequired,
  squareId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(Square);

// const sprites = {
//   player: {
//     north:,
//     east:,
//     south:,
//     west:,
//     attacking:,
//     hurt:,
//     victory:,
//   },
//   enemies: {
//     slime: {
//       front1:,
//       back1:
//     },
//     robot: {
//       front:,
//       back:
//     }
//   },
//   attacks: {
//     flare:,
//     bullet:,
//     laserVertical:,
//     laserHorizontal:
//   }
// }
