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
  isEnemy: PropTypes.bool.isRequired,
  isProjectile: PropTypes.bool.isRequired,
  squareId: PropTypes.number.isRequired,
  tileImage: PropTypes.string.isRequired,
  sprite: PropTypes.string,
  player: PropTypes.object.isRequired
};

export default connect()(Square);
