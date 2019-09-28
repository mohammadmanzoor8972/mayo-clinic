import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { ErrorAction, errorType } from '../actions/error.actions';
import { append, concat, prepend } from 'ramda';
import { Physician } from '../physician/physician.model';
import { Day, CapacityMatrix } from './physician-capacity.model';

export const loadType = '[PhysicianCapacity]load';
export const loadedType = '[PhysicianCapacity]loaded';
export const departmentContextType = '[PhysicianCapacity]departmentContext';
export const daysLoadedType = '[PhysicianCapacity]daysLoaded';
export const physCapSaveType = '[PhysicianCapacity]capacitySave';
export const capacitySaveSuccessType = '[PhysicianCapacity]capacitySaveSuccess';
export const capacityLoadedType = '[PhysicianCapacity]capacityLoaded';
export const physicianListSelector = (state: PhysicianCapacityState) => (state.physicianList);

export const initialState: PhysicianCapacityState = {
    capacity: new Map(),
    departmentId: null,
    physicianList: [],
    days: [],
    capacityMatrix: {} as CapacityMatrix
};

export interface PhysicianCapacityState {
    physicianList: Physician[];
    capacity: Map<string, number>;
    departmentId: string;
    days: Day[];
    capacityMatrix: CapacityMatrix;
}

type PhysicianCapacityActions =
    DepartmentContextAction|
    DaysLoadedAction|
    LoadedAction|
    CapacitySaveSuccessAction|
    CapacityLoadedAction|
    ErrorAction;

export const physicianCapacityActionReducer: ActionReducer<PhysicianCapacityState> =
function(curr: PhysicianCapacityState, actionEmitted: PhysicianCapacityActions) {
    switch (actionEmitted.type) {
        case departmentContextType:
            return {...curr, departmentId: actionEmitted.departmentId};
        case loadedType:
            const paddedPhysicians = prepend({} as Physician, actionEmitted.physicians);
            return {...curr, physicianList: paddedPhysicians, departmentId: actionEmitted.departmentId};
        case daysLoadedType:
            return {...curr, days: actionEmitted.days};
        case capacitySaveSuccessType:
            return {...curr, capacityMatrix: actionEmitted.capacity};
        case capacityLoadedType:
            return {...curr, capacityMatrix: actionEmitted.capacity};
        default:
            return curr;
    }
};
export class DepartmentContextAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = departmentContextType;
}
export class LoadAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = loadType;
}
export class LoadedAction implements Action {
    constructor(public physicians: Physician[], public departmentId: string) {}
    readonly type = loadedType;
}
export class DaysLoadedAction implements Action {
    constructor(public days: Day[]) {}
    readonly type = daysLoadedType;
}
export class PhysicianCapacitySaveAction implements Action {
    constructor(public capacity: CapacityMatrix) {}
    readonly type = physCapSaveType;
}
export class CapacitySaveSuccessAction implements Action {
    constructor(public capacity: CapacityMatrix) {}
    readonly type = capacitySaveSuccessType;
}
export class CapacityLoadedAction implements Action {
    constructor(public capacity: CapacityMatrix) {}
    readonly type = capacityLoadedType;
}
