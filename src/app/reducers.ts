import {ActionReducer, ActionReducerMap, Action } from '@ngrx/store';

const iatype = '[root]increment';
const datype = '[root]decrement';
export const initialState: State = {counter: 0 };

export interface State {
    counter: number;
}

const fireItUp: ActionReducer<number> = function(curr: number, actionEmitted: RootActions) {
    switch (actionEmitted.type) {
        case iatype:
            return curr + 1;
        case datype:
            return curr - 1;
        default:
            return curr;
    }
};

export const reducers: ActionReducerMap<State> = {
    counter: fireItUp
};

export class IncrementAction implements Action {
    readonly type = iatype;
}

export class DecrementAction implements Action {
    readonly type = datype;
}

type RootActions = IncrementAction | DecrementAction;
