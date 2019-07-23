import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Square(props){
  return (
    <div>
      <style jsx>{`
        div#sprite{
          z-index: 1;
          position: absolute;
        }
      `}</style>
      <div id="sprite">{props.sprite}</div>
      <div id="tile">{props.tileImage}</div>
    </div>
  )
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  isYou: PropTypes.bool.isRequired,
  isEnemy: PropTypes.string.isRequired,
  isProjectile: PropTypes.bool.isRequired,
  squareId: PropTypes.number.isRequired,
  tileImage: PropTypes.object.isRequired,
  sprite: PropTypes.object,
  player: PropTypes.object.isRequired
};

export default connect()(Square);
