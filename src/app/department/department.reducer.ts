import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { append, concat } from 'ramda';
import { Department } from './department.model';
import { ErrorAction, errorType } from '../actions/error.actions';

export const addItemType = '[Department]addItem';
export const removeItemType = '[Department]removeItem';
export const addSuccessAction = '[Department]addSuccessAction';
export const loadType = '[Department]load';
export const loadedType = '[Department]loaded';
export const deleteSuccessAction = '[Department]deleteSuccessAction';
export const departmentSelectedAction = '[Department]departmentSelected';
export const initialState: DepartmentState = { departmentList: [], selectedDepartmentId: null };

export const departmentListSelector = (state: DepartmentState) => (state.departmentList);

export interface DepartmentState {
    departmentList: Department[];
    selectedDepartmentId: string; // | NoDepartment (so we don't have a null!)
}

type DepartmentActions =
        AddAction |
        RemoveAction |
        AddSuccessAction |
        LoadedAction |
        DepartmentSelectedAction |
        ErrorAction;

export const departmentActionReducer: ActionReducer<DepartmentState> = function(curr: DepartmentState, actionEmitted: DepartmentActions) {
    switch (actionEmitted.type) {
        case addItemType:
            return curr;
        case removeItemType:
            const newList = curr.departmentList.filter((dept) => dept !== actionEmitted.department);
            return {...curr, departmentList: newList};
        case addSuccessAction:
            const appendedList = append(actionEmitted.department, curr.departmentList);
            return {...curr, departmentList: appendedList};
        case errorType:
            console.log(actionEmitted.error);
            return curr;
        case loadedType:
            return {...curr, departmentList: actionEmitted.departments};
        case departmentSelectedAction:
            return {...curr, selectedDepartmentId: actionEmitted.departmentId};//filter here to push whole department into state
        default:
            return curr;
    }
};
export class AddAction implements Action {
    constructor(public item: string) {}
    readonly type = addItemType;
}
export class RemoveAction implements Action {
    constructor(public department: Department) {}
    readonly type = removeItemType;
}
export class LoadAction implements Action {
    constructor() {}
    readonly type = loadType;
}
export class LoadedAction implements Action {
    constructor(public departments: Department[]) {}
    readonly type = loadedType;
}
export class AddSuccessAction implements Action {
    constructor(public department: Department) {}
    readonly type = addSuccessAction;
}
export class DeleteSuccessAction implements Action {
    constructor() {}
    readonly type = deleteSuccessAction;
}
export class DepartmentSelectedAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = departmentSelectedAction;
}
