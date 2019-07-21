import React from "react";
import CurrentLevel from "./CurrentLevel";
import GameUI from "./GameUI";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import c from './../constants';

import lava from '../assets/images/lava.png';
import stairs from '../assets/images/stairs.png';
import wall from '../assets/images/wall.jpeg';
import empty from '../assets/images/tile.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      playerStats : {
        playerHealth: 100,
        playerWeapon: 'Flare Gun',
        playerDirection: 's',
        playerScore: 0
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleStartButtonClick() {
    this.generateLevelFromTemplate();
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
    alert(this.props.levelId)
    const { dispatch } = this.props;
    const action = {
      type: c.LEVELID_UP
    };
    dispatch(action);
    alert(this.props.levelId)
    let levelTemplate = levelById[this.props.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
    this.props.history.push("/game");
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
      squareIsYou = true;
    }
    const { dispatch } = this.props;
    const action = {
      type: c.ADD_SQUARE,
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
      let originalLocation = this.getLocation();
      let newLocation = originalLocation - 1;
      if(newLocation > 0 && newLocation % 10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updatePlayerLocation(originalLocation, false);
        this.updatePlayerLocation(newLocation, true);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    //move down
    } else if(event.keyCode === 40){
      let originalLocation = this.getLocation();
      let newLocation = originalLocation + 1;
      if(newLocation %10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updatePlayerLocation(originalLocation, false);
        this.updatePlayerLocation(newLocation, true);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    //move right
    } else if(event.keyCode === 39){
      let originalLocation = this.getLocation();
      let newLocation = originalLocation + 10;
      if(newLocation <= 100 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updatePlayerLocation(originalLocation, false);
        this.updatePlayerLocation(newLocation, true);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    //move left
    } else if(event.keyCode === 37){
      let originalLocation = this.getLocation();
      let newLocation = originalLocation - 10;
      if(newLocation > 0 && this.props.currentLevel[newLocation].value !== 'W') {
        this.updatePlayerLocation(originalLocation, false);
        this.updatePlayerLocation(newLocation, true);
        this.squareCheck(newLocation);
      } else {
        alert("blocked!")
      }
    }
  }
    
  getLocation() {
    for(let i=1; i <= 100; i++){
      if(this.props.currentLevel[i].isYou == true) {
        return i
      }
    }
  }
  
  updatePlayerLocation(squareIdToUpdate, newBool) {
    const { dispatch } = this.props;
    const action = {
      type: c.UPDATE_ISYOU,
      squareId: squareIdToUpdate,
      isYou: newBool
    };
    dispatch(action);
  }
  
  squareCheck(id) {
    let location = this.props.currentLevel[id]; 
    if (location.isYou && location.isEnemy || location.isYou && location.value == 'L') {
      alert(this.state.playerStats.playerHealth);
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
            playerStats={this.state.playerStats} />} />
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
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S'],
     /////////////////////////////////////////////////
  3:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S']
};