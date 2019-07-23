import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function CurrentLevel(props){
  return (
    <div id="outer">
      <style jsx>{`
        div#outer {
          margin-left: auto;
          margin-right: auto;
          columns: 10 auto;
          column-gap: 0px;
          width: 500px;
          height: 560px;
        }
        div#inner {
          position: relative;
          z-index: 0;
          border: solid black 3px;
          width: 50px;
          max-width: 50px;
          min-width: 50px;
          height: 50px;
          max-height: 50px;
          min-width: 50px;
          vertical-align: top;
          display: inline-block;
        }
      `}</style>
      {Object.keys(props.currentLevel).map(function(squareId) {
        var square = props.currentLevel[squareId];
        return <div id="inner"><Square value={square.value}
            isYou={square.isYou}
            isEnemy={square.isEnemy}
            isProjectile={square.isProjectile}
            key={squareId}
            squareId={parseInt(squareId)}
            tileImage={square.tileImage}
            sprite={square.sprite}
            player={props.player}/>
        </div>;
      })}
    </div>
  );
}

CurrentLevel.propTypes = {
  currentLevel: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default CurrentLevel;
