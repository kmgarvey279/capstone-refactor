import React from 'react';
import PropTypes from 'prop-types';
import CurrentLevel from './CurrentLevel';
import GameUI from './GameUI';

function Game(props){
  return (
    <div id="game">
    <style jsx>{`
      div#game {
        text-align: center;
        background-color: black;
      }
      `}</style>
      <div>
      <CurrentLevel currentLevel={props.currentLevel}/> 
      </div>
      <div>
      <GameUI playerStats={props.playerStats} levelId={props.levelId}/>
      </div>
    </div>
  );
}

Game.propTypes = {
  levelId: PropTypes.number.isRequired,
  currentLevel: PropTypes.object.isRequired,
  playerStats: PropTypes.object.isRequired
};

export default Game;