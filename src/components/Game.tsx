import React from 'react';
import Board from './Board';
import {connect} from 'react-redux';
import { GameState, initialState } from '../reducers/reducer';

interface PropsFromState {
  history : any
  stepNumber : number
  xIsNext : boolean
}

interface State {}

const mapDispatchToProps = (dispatch:any) => ({
    handleClick: () => dispatch({type: 'CLICK'})
})

const mapStateToProps = (initialState:GameState) => ({
    history: initialState.history,
    stepNumber: initialState.stepNumber,
    xIsNext: initialState.xIsNext
})

class Game extends React.Component<PropsFromState, State> {
  constructor(props:PropsFromState){
    super(props);
    this.state = {}
  }

  handleClick(i: number) {
      const history = this.props.history.slice(0, this.props.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.props.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.props.xIsNext,
      })
  }

  jumpTo(step:number){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];    
    const winner = calculateWinner(current.squares);
    const moves = history.map((step:number, move:number) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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
const calculateWinner = (squares : number[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);