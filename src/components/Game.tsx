import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';
import { GameState } from '../reducers/reducer';

const mapDispatchToProps = (dispatch:any) => {
  return {
    handleClick: (payload:number) => dispatch({type: 'TAKE_TURN', payload}),
    jumpTo: (payload:number) => dispatch({type: 'GO_BACK', payload})
  }
}

const mapStateToProps = (state:GameState) => ({
    currentGame: state.currentGame,
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    winner: state.winner
})

interface PropsFromState {
  currentGame : string[]
  history : any
  stepNumber : number
  xIsNext : boolean
  winner : string
  handleClick: (payload:number) => void
  jumpTo: (payload:number) => void
}

class Game extends React.Component<PropsFromState> {
  render() {
    console.log(this.props.history)
    console.log(this.props.stepNumber)
    console.log(this.props.winner)
    console.log(this.props.xIsNext)
    console.log(this.props.currentGame)
    const history = this.props.history;
    const current = history[this.props.stepNumber];    
    const moves = history.map((step:number, move:number) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
          <button onClick={() => this.props.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;

    if (this.props.winner) {
      status = 'Winner: ' + this.props.winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.props.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);