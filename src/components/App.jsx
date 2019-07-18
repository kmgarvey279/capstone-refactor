import React from "react";
import Level from "./Level";
import Title from "./Title";
import { Switch, Route, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import c from './../constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      levelById: {
        1: {
          name: "Level One",
          levelId: 1,
          squareArray: levelList[1]
        },
        2: {
          name: "Level Two",
          levelId: 2,
          squareArray: levelList[2]
        },
        3: {
          name: "Level Three",
          levelId: 3,
          squareArray: levelList[3]
        }
      },
    };
    this.handleAddingSquareToLevel = this.handleAddingSquareToLevel.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
  }
  
  handleStartButtonClick() {
    this.state.currentLevel = this.state.levelById[1];
    this.generateLevelTemplate(1);
    this.props.history.push(`/game`)
  }
  
  nextLevel(id) {
    this.state.currentLevel = this.state.levelById[id + 1];
    this.generateLevelTemplate(id + 1)
  }
  
  generateLevelTemplate(id){
    let squareArray = this.state.levelById[id].squareArray;
    for(let i = 0; i < squareArray.length; i++){
      if (squareArray[i] === 'E') {
        this.handleAddingSquareToLevel({value: 'exit', id: i });
      } else if (squareArray[i] === 'S') {
        this.handleAddingSquareToLevel({value: 'start', id: i });
      } else if (squareArray[i] === 'W') {
        this.handleAddingSquareToLevel({value: 'wall', id: i });
      } else {
        this.handleAddingSquareToLevel({value: 'empty', id: i });
      }
    }
  }

  handleAddingSquareToLevel(newSquare) {
    var newCurrentLevel = this.state.currentLevel.slice();
    newCurrentLevel.push(newSquare);
    this.setState({currentLevel: newCurrentLevel});
  }

  render(){
    return (
      <div>
        <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
        <Route exact path='/game' render={()=><Level level={this.state.currentLevel}
          onSquareSelection={this.handleChangingSelectedSquare}
          selectedSquare={this.state.selectedSquare}/>} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state
  }
};

const levelList = {
  1: ['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
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
     '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S'],
};

export default withRouter(connect(mapStateToProps)(App));
