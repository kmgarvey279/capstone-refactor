import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import playerStand from '../assets/images/playerStand.png';
import enemyStand from '../assets/images/enemyStand.png';

function Square(props){

  if (props.isYou == true) {
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
        <img id="player" src={playerStand} weight="50" height="50"/>
        {props.image}
      </div>
    )
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
  squareId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};

export default connect()(Square);
