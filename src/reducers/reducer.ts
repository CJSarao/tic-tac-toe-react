export interface GameState{
    readonly currentGame : string[]
    readonly history : string[][]
    readonly stepNumber : number
    readonly xIsNext : boolean
    readonly winner : string
}

const initialState: GameState = {
    currentGame : [],
    history : [[]],
    stepNumber : 0,
    xIsNext : true,
    winner : ""
}
const reducer = (state:GameState = initialState, action:any) => {   
    switch (action.type) {
        case "TAKE_TURN": {             
                let historyLocal = state.history.slice(0, state.stepNumber + 1)
                const current = historyLocal[historyLocal.length - 1]
                const currentGame = current.slice()

                if (calculateWinner(currentGame) || currentGame[action.payload]) {
                    return
                }
                currentGame[action.payload] = state.xIsNext ? 'X' : 'O';
                historyLocal: historyLocal.concat(currentGame)                                                     
            return { 
                ...state,
                currentGame: currentGame,
                history: historyLocal,
                xIsNext: !state.xIsNext,
                stepNumber: historyLocal.length 
            }
        }
        case "GO_BACK": {
            return {
                ...state,
                stepNumber: action.payload,
                xIsNext: (action.payload % 2) === 0,
                };
        }
        default: {
            return state
        }
    }
}

const calculateWinner = (squares : string[]) => {
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
export default reducer
