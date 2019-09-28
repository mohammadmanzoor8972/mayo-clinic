import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { PhysiciansLoadedAction } from '../lister/lister';
import { Physician } from './physician.model';
import { ErrorAction, errorType } from '../actions/error.actions';
import { append, concat } from 'ramda';

export const addItemType = '[Physician]addItem';
export const removeItemType = '[Physician]removeItem';
export const addSuccessType = '[Physician]addSuccessItem';
export const loadType = '[Physician]load';
export const loadedType = '[Physician]loaded';
export const deleteSuccessType = '[Physician]deleteSuccessItem';
export const lookUpType = '[Physician]lookup';
export const lookUpSuccessType = '[Physician]lookupSuccess';
export const initialState: PhysicianState = { physicianList: [], physicianLookUp: {} as Physician };

export interface PhysicianState {
    physicianList: Physician[];
    physicianLookUp: Physician;
}

type PhysicianActions = AddAction |
                        RemoveAction |
                        AddSuccessAction |
                        LoadedAction |
                        LookUpAction |
                        LookUpSuccessAction |
                        ErrorAction;

export const physicianActionReducer: ActionReducer<PhysicianState> = function(curr: PhysicianState, actionEmitted: PhysicianActions) {
    switch (actionEmitted.type) {
    case addItemType:
        return curr;
    case removeItemType:
        const newList = curr.physicianList.filter((phys) => phys !== actionEmitted.physician);
        return {...curr, physicianList: newList};
    case addSuccessType:
        const appendedList = append(actionEmitted.physician, curr.physicianList);
        return {...curr, physicianList: appendedList}; //append(actionEmitted.physician, curr);
    case errorType:
        console.log(actionEmitted.error);
        return curr;
    case loadedType:
        return {...curr, physicianList: actionEmitted.physicians};
    case lookUpSuccessType:
        return {...curr, physicianLookUp: actionEmitted.physician};
    default:
        return curr;
    }
};
export class AddAction implements Action {
    constructor(public item: Physician) {}
    readonly type = addItemType;
}
export class RemoveAction implements Action {
    constructor(public physician: Physician) {}
    readonly type = removeItemType;
}
export class LoadAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = loadType;
}
export class LoadedAction implements Action {
    constructor(public physicians: Physician[]) {}
    readonly type = loadedType;
}
export class AddSuccessAction implements Action {
    constructor(public physician: Physician) {}
    readonly type = addSuccessType;
}
export class DeleteSuccessAction implements Action {
    constructor() {}
    readonly type = deleteSuccessType;
}
export class LookUpAction implements Action {
    constructor(public lanId: string) {}
    readonly type = lookUpType;
}
export class LookUpSuccessAction implements Action {
    constructor(public physician: Physician) {}
    readonly type = lookUpSuccessType;
}
