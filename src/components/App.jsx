import React from "react";
import CurrentLevel from "./CurrentLevel";
import Title from "./Title";
import End from "./End";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import c from './../constants';

import lava from '../assets/images/lava.png';
import stairs from '../assets/images/stairs.png';
import wall from '../assets/images/wall.jpeg';
import empty from '../assets/images/empty.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      levelId: 0,
      levelById : {
        1:['0', 'F', '0', '0', '0', '0', '0', 'L', '0', '0',
           '0', '0', '0', '0', '0', '0', '0', 'L', '0', '0',
           '0', '0', '0', '0', 'E', '0', '0', 'L', 'L', '0',
           'W', 'W', 'W', '0', '0', '0', '0', '0', 'L', '0',
           '0', '0', 'W', '0', '0', '0', '0', '0', 'L', 'L',
           '0', '0', 'W', '0', '0', '0', '0', '0', 'E', '0',
           '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0',
           '0', '0', 'E', '0', '0', '0', '0', 'W', '0', '0',
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
      },
      playerHealth: 100,
      playerIsAlive: true,
      playerLocation: null
      }
    }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleStartButtonClick() {
    this.generateLevelFromTemplate(1);
  }

//Create Levels
  nextLevel(levelId) {
    this.state.currentLevel = null;
    if (levelId < this.levelById.length) {
      this.generateLevelFromTemplate();
    } else {
      this.props.history.push(`/end`)
    }
  }
  generateLevelFromTemplate(){
    const { dispatch } = this.props;
    this.state.levelId += 1
    let levelTemplate = this.state.levelById[this.state.levelId];
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

  //up click:


  handleKeyPress(event){
    if(event.keyCode === 38){
      console.log('up')
    }
    if(event.keyCode === 40){
      console.log('down')
    }
    if(event.keyCode === 39){
      console.log('right')
    }
    if(event.keyCode === 37){
      console.log('left')
    }
  }

  // handleUpClick() {
  //   if(!squareId-1 <= 0 || !squareId-1 %10 === 0]) {
  //     38
  //     let newLocation = squareId--;
  //     this.updatePlayerLocation(newLocation);
  //   }
  // }
  // handledDownClick() {
  //   if(!squareId %10 === 0]) {
  //     40
  //     let newLocation = squareId++;
  //     this.updatePlayerLocation(newLocation);
  //   }
  // }
  // handleRightClick() {
  //   if(squareId + 10 < 100) {
  //     39
  //     let newLocation = squareId+= 10;
  //     this.updatePlayerLocation(newLocation);
  //   }
  // }
  // handleLeftClick() {
  //   if(squareId - 10 > 0 ) {
  //         37
  //     let newLocation = squareId-= 10;
  //     this.updatePlayerLocation(newLocation);
  //   }
  // }



  //Move player position
  updatePlayerLocation(squareId) {
    this.state.playerLocation = squareId;
    const {dispatch} = this.props;
    const action = {
      type: c.UPDATE_ISYOU,
      squareId: squareId
    };
    dispatch(action);
  }


  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><CurrentLevel currentLevel={this.props.currentLevel}/>} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object,
  levelId: PropTypes.number,
  levelById: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    levelId: state.levelId,
    levelById: state.levelById
  }
};

export default withRouter(connect(mapStateToProps)(App));
