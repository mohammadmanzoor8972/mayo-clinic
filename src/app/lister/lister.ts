import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { append, concat } from 'ramda';

export const addItemType = '[root]addItem';
export const removeItemType = '[root]removeItem';
const physiciansLoadedType = '[root]physiciansLoaded';
const errorType = '[root]error';
export const addSuccessAction = '[root]addSuccessAction';
export const nextPageType = '[root]nextPage';
export const deleteSuccessAction = '[root]deleteSuccessAction';
export const configureActionType = '[root]configureAction';
export const initialState: ListState = { list: [] };

export interface ListState {
    list: any[];
}

type ListActions =
        AddAction |
        RemoveAction |
        PhysiciansLoadedAction |
        AddSuccessAction |
        ErrorAction |
        ConfigureAction;

const initial: ActionReducer<any[]> = function(curr: any[], actionEmitted: ListActions) {
    switch (actionEmitted.type) {
        case addItemType:
            console.log('creating action reducer');
            //curr.push(actionEmitted.item);
            //show spinner//could just drop the case
            return curr;
        case removeItemType:
            curr = curr.filter((thing) => thing !== actionEmitted.item);
            return curr;
        case physiciansLoadedType:
            console.log('fetching depts');
            curr = actionEmitted.physicians;
            return curr;
        case addSuccessAction:
            console.log(actionEmitted.department);
            return append(actionEmitted.department, curr);
        case errorType:
            console.log(actionEmitted.error);
            return curr;
        case configureActionType:
            console.log(actionEmitted.type);
            return curr;
        default:
            return curr;
    }
};

export const listReducers: ActionReducerMap<ListState> = {
    list: initial
};

export class AddAction implements Action {
    constructor(public item: any) {
    }
    readonly type = addItemType;
}

export class RemoveAction implements Action {
    constructor(public item: any) {
    }
    readonly type = removeItemType;
}

export class NextAction implements Action {
    constructor() {}
    readonly type = nextPageType;
}

export class PhysiciansLoadedAction implements Action {
    constructor(public physicians: any) {}
    readonly type = physiciansLoadedType;
}

export class ErrorAction implements Action {
    constructor(public error: any) {}
    readonly type = errorType;
}

export class AddSuccessAction implements Action {
    constructor(public department: any) {}
    readonly type = addSuccessAction;
}

export class DeleteSuccessAction implements Action {
    constructor() {}
    readonly type = deleteSuccessAction;
}

export class ConfigureAction implements Action {
    constructor(department: any) {}
    readonly type = configureActionType;
}
