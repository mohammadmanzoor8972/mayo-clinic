import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { Priority } from './priority.model';
import { ErrorAction, errorType } from '../actions/error.actions';
import { append, concat } from 'ramda';

export const addItemType = '[Priority]addPriority';
export const removeItemType = '[Priority]removeItem';
export const addSuccessAction = '[Priority]addSuccessAction';
export const loadType = '[Priority]load';
export const loadedType = '[Priority]loaded';
export const deleteSuccessAction = '[Priority]deleteSuccessAction';
export const prioritySelectedAction = '[Priority]prioritySelected';
export const departmentContextType = '[Priority]departmentContext';
export const initialState: PriorityState = {
    priorityList: [],
    departmentId: null,
    inline: {}
};

export const priorityListSelector = (state: PriorityState) => (state.priorityList);


export interface PriorityState {
    priorityList: Priority[];
    departmentId: string;
    inline: any;
}

type PriorityActions =
DepartmentContextAction |
    AddAction |
    RemoveAction |
    AddSuccessAction |
    LoadedAction |
    PrioritySelectedAction |
    ErrorAction;

    export const priorityActionReducer: ActionReducer<PriorityState> = function(curr: PriorityState, actionEmitted: PriorityActions) {
        switch (actionEmitted.type) {
            case departmentContextType:
                return {...curr, departmentId: actionEmitted.departmentId};
            case addItemType:
                return curr;
            case removeItemType:
                const newList = curr.priorityList.filter((dept) => dept !== actionEmitted.priority);
                return {...curr, priorityList: newList};
            case addSuccessAction:
                const appendedList = append(actionEmitted.priority, curr.priorityList);
                return {...curr, priorityList: appendedList};
            case errorType:
                console.log(actionEmitted.error);
                return curr;
            case loadedType:
                //return {...curr, priorityList: actionEmitted.priority};
                return {...curr, priorityList: actionEmitted.priority};
            case prioritySelectedAction:
                return {...curr, departmentId: actionEmitted.priorityId};//filter here to push whole department into state
            default:
                return curr;
        }
    };

    export class AddAction implements Action {
        constructor(public inline: any, public departmentId: string) {}
        readonly type = addItemType;
      }

      export class DepartmentContextAction implements Action {
        constructor(public departmentId: string) {}
        readonly type = departmentContextType;
    }

export class RemoveAction implements Action {
    constructor(public priority: Priority) {}
    readonly type = removeItemType;
}
export class LoadAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = loadType;
}
export class LoadedAction implements Action {
    constructor(public priority: Priority[], public departmentId: string) {}
    readonly type = loadedType;
}
export class AddSuccessAction implements Action {
    constructor(public priority: Priority) {}
    readonly type = addSuccessAction;
}
export class DeleteSuccessAction implements Action {
    constructor() {}
    readonly type = deleteSuccessAction;
}
export class PrioritySelectedAction implements Action {
    constructor(public priorityId: string) {}
    readonly type = prioritySelectedAction;
}