import React from "react";
import CurrentLevel from "./CurrentLevel";
import Title from "./Title";
import End from "./End";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import c from './../constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      levelId: 0,
      levelById : {
        1:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
           'W', 'W', 'W', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0',
           '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0',
           '0', '0', '0', '0', '0', '0', '0', 'W', '0', '0',
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
      }
    }
  }

  handleStartButtonClick() {
    this.generateLevelFromTemplate(1);
  }

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
    const { dispatch } = this.props;
    event.preventDefault();
    const action = {
      type: c.ADD_SQUARE,
      squareId: thisSquareId,
      value: squareValue,
      isYou: false,
      isEnemy: false
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
