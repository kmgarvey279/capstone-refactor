import React from "react";
import CurrentLevel from "./CurrentLevel";
import GameUI from "./GameUI";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as types from './../constants/ActionTypes';

import lava from '../assets/images/lava.png';
import stairs from '../assets/images/stairs.png';
import wall from '../assets/images/wall.jpeg';
import empty from '../assets/images/tile.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleStartButtonClick() {
    this.generateLevelFromTemplate();
    this.props.history.push("/game");
    // this.startTimer = setInterval(() =>
    //   this.timerActions(),
    // 6000
    // );
  }
  
  // timerActions() {
  //   this.updateTimer(),
  //   this.enemyMove()
  // }
  // 
  // updateTimer() {
  // 
  // }
  
//Create Levels
  generateLevelFromTemplate(){
    const { dispatch } = this.props; 
    const action = {
      type: types.NULL_LEVEL
    };
    dispatch(action);
    console.log("level:" + this.props.currentLevel)
    let levelTemplate = levelById[this.props.levelId];
    console.log("leveltemplate:" + levelTemplate)
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
  }
  
  handleAddingSquareToLevel(thisSquareId, squareValue) {
    let squareImage;
    let squareIsYou = false;
    let squareIsEnemy = false;
    //Set tile image
    if (squareValue == 'F' || squareValue == 'S') {
      squareImage = <img src={stairs} weight="50" height="50" />;
    } else if (squareValue == 'L') {
      squareImage = <img src={lava} weight="50" height="50" />;
    } else if (squareValue == 'W') {
      squareImage = <img src={wall} weight="50" height="50" />;
    } else if (squareValue == 'E') {
      squareImage = <img src={empty} weight="50" height="50" />;
      squareIsEnemy = true;
    } else {
      squareImage = <img src={empty} weight="50" height="50" />;
    }
    if (squareValue == 'S') {
      this.updatePlayerLocation(thisSquareId);
      squareIsYou = true;
    }
    const { dispatch } = this.props; 
    const action = {
      type: types.ADD_SQUARE,
      squareId: thisSquareId,
      value: squareValue,
      isYou: squareIsYou,
      isEnemy: squareIsEnemy,
      image: squareImage
    };
    dispatch(action);
  }

  handleKeyPress(event){
    //move up
    if(event.keyCode === 38){
      let originalLocation = this.props.playerStats.location;
      let newLocation = originalLocation - 1;
      if(newLocation > 0 && newLocation % 10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updateSquareIsYou(originalLocation, false);
        this.updateSquareIsYou(newLocation, true);
        this.updatePlayerLocation(newLocation);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    //move down
    } else if(event.keyCode === 40){
      let originalLocation = this.props.playerStats.location;
      let newLocation = originalLocation + 1;
      if(newLocation %10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updateSquareIsYou(originalLocation, false);
        this.updateSquareIsYou(newLocation, true);
        this.updatePlayerLocation(newLocation);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    //move right
    } else if(event.keyCode === 39){
      let originalLocation = this.props.playerStats.location;
      let newLocation = originalLocation + 10;
      if(newLocation <= 100 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updateSquareIsYou(originalLocation, false);
        this.updateSquareIsYou(newLocation, true);
        this.updatePlayerLocation(newLocation);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    //move left
    } else if(event.keyCode === 37){
      let originalLocation = this.props.playerStats.location;
      let newLocation = originalLocation - 10;
      if(newLocation > 0 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updateSquareIsYou(originalLocation, false);
        this.updateSquareIsYou(newLocation, true);
        this.updatePlayerLocation(newLocation);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    }
  }
  
  updatePlayerLocation(location) {
    const { dispatch } = this.props;
    const action = {
      type: types.UPDATE_LOCATION,
      location: location
    };
    dispatch(action);
  }
  
  updateSquareIsYou(squareIdToUpdate, newBool) {
    const { dispatch } = this.props;
    const action = {
      type: types.UPDATE_ISYOU,
      squareId: squareIdToUpdate,
      isYou: newBool
    };
    dispatch(action);
  }
  
  squareCheck(id) {
    let location = this.props.currentLevel[id]; 
    if (location.isYou && location.isEnemy || location.isYou && location.value == 'L') {
      alert(this.props.playerStats.health);
    } else if (location.isYou && location.value == 'F') {
      alert("level complete");
      alert(this.props.levelId);
      const { dispatch } = this.props;
      const action = {
        type: types.LEVELID_UP,
      };
      dispatch(action);
      alert(this.props.levelId);
      this.updatePlayerLocation(id, false);
      this.generateLevelFromTemplate();
    }
  }

  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            levelId={this.props.levelId} 
            currentLevel={this.props.currentLevel}
            playerStats={this.props.playerStats} />} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object,
  levelId: PropTypes.number,
  playerStats: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    levelId: state.levelId,
    playerStats: state.playerStats
  }
};

export default withRouter(connect(mapStateToProps)(App));

const levelById = {
  1:['F', '0', '0', '0', '0', '0', '0', 'L', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', 'L', '0', '0',
     '0', '0', '0', '0', 'E', '0', '0', 'L', 'L', '0',
     'W', 'W', 'W', '0', '0', '0', '0', '0', 'L', '0',
     '0', '0', 'W', '0', '0', '0', '0', '0', 'L', 'L',
     '0', '0', 'W', '0', '0', '0', '0', '0', 'E', '0',
     '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0',
     '0', '0', 'E', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', 'W', '0', 'S'],
     /////////////////////////////////////////////////
  2:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', 'L', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', 'F', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', 'L', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', 'S', '0', '0', '0', '0', '0'],
     /////////////////////////////////////////////////
  3:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', 'F', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', 'S', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
};