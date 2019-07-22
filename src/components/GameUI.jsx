import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profile from '../assets/images/profileplaceholder.png';
import weapon from '../assets/images/FlareGun.png';

function GameUI(props) {
  return (
    <div id="ui">
      <style jsx>{`
        div#ui {
          border: 3px solid darkblue;
          background-color: lightblue;
          height: 200px;
          width: 500px;
          columns: 3 auto;
          column-gap: 10px;
          break-inside: avoid-column;
          margin-left: auto;
          margin-right: auto;
        }
        div#stats {
          vertical-align: top;
          display: inline-block;
        }
        `}</style>
        <div id="stats">
          <h3>Health: {props.player.health}/100</h3>
          <img id="profile" src={profile} width="100px" height="100px" />
        </div>  
        <div id="stats">
          <h3>Weapon: {props.weapon}</h3>
          <img id="weapon" src={weapon} width="100px" height="100px"/>
        </div>
        <div id="stats">
          <h2>Level: {props.levelId}</h2>
        </div>
    </div>
  );
}

GameUI.propTypes = {
  levelId: PropTypes.number.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUI);