import { Reducer } from 'redux'

export interface GameState{
    readonly history : any
    readonly stepNumber : number
    readonly xIsNext : boolean
}

export const initialState: GameState = {
    history : null,
    stepNumber : 0,
    xIsNext : true
}

export const reducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "":
            return { ... state,}
        //..............
    }
}
