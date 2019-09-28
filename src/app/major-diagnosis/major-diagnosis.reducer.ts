import { MajorDiagnosis, Indication } from './major-diagnosis.model';
import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { ErrorAction, errorType } from '../actions/error.actions';
import { append, concat } from 'ramda';

export const addItemType = '[MajorDiagnosis]addItem';
export const removeItemType = '[MajorDiagnosis]removeItem';
export const deleteSuccessType = '[MajorDiagnosis]deleteSuccessItem';
export const addSuccessType = '[MajorDiagnosis]addSuccessAction';
export const loadedType = '[MajorDiagnosis]loaded';
export const loadType = '[MajorDiagnosis]load';
export const departmentSelectedType = '[MajorDiagnosis]deptselected';
export const indicationLoadedType = '[Indication]loaded';
export const indicationAddType = '[Indication]add';
export const indicationAddSuccessType = '[Indication]addSuccess';
export const indicationRemoveType = '[Indication]remove';
export const indicationRemoveSuccessType = '[Indication]removeSuccess';
export const initialState: MajorDiagnosisState = {majorDiagnosisList: [], selectedDepartmentId: null, indicationList: []};

export const majorDiagnosisListSelector = (state: MajorDiagnosisState) => (state.majorDiagnosisList);

export interface MajorDiagnosisState {
    majorDiagnosisList: MajorDiagnosis[];
    selectedDepartmentId: string;
    indicationList: Indication[];
}

type MajorDiagnosisActions =
        AddAction|
        RemoveAction|
        AddSuccessAction|
        LoadAction|
        LoadedAction|
        DepartmentSelectedAction|
        IndicationLoadedAction|
        AddIndicationSuccessAction|
        RemoveIndicationAction|
        ErrorAction;

export const majorDiagnosisActionReducer:  ActionReducer<MajorDiagnosisState> =
function(curr: MajorDiagnosisState, actionEmitted: MajorDiagnosisActions) {
    switch (actionEmitted.type) {
        case loadedType:
            return {...curr, majorDiagnosisList: actionEmitted.majorDiagnosises, indicationList: []};
        case addSuccessType:
            const appendedList = append(actionEmitted.majorDiagnosis, curr.majorDiagnosisList);
            return {...curr, majorDiagnosisList: appendedList};
        case removeItemType:
            const newList = curr.majorDiagnosisList.filter((majd) => majd !== actionEmitted.majorDiagnosis);
            return {...curr, majorDiagnosisList: newList};
        case departmentSelectedType:
            return {...curr, selectedDepartmentId: actionEmitted.departmentId};
        case indicationLoadedType:
            console.log(actionEmitted.indications);
            console.log(curr.indicationList);
            const appendedIndicationList = concat(actionEmitted.indications, curr.indicationList); // this may have to not add existing
            return {...curr, indicationList: appendedIndicationList};
        case indicationAddSuccessType:
            const indAppendList = append(actionEmitted.indication, curr.indicationList);
            return {...curr, indicationList: indAppendList};
        case indicationRemoveType:
            const filterRemovedInd = curr.indicationList.filter((ind) => ind !== actionEmitted.indication);
            return {...curr, indicationList: filterRemovedInd}; // should this rather be a success action so we don't remove it prematurely?
        case errorType:
            console.log(actionEmitted.error);
            return curr;
        default:
            return curr;
    }
};

export class AddAction implements Action {
    constructor(public item: MajorDiagnosis) {}
    readonly type = addItemType;
}
export class RemoveAction implements Action {
    constructor(public majorDiagnosis: MajorDiagnosis) {}
    readonly type = removeItemType;
}
export class DeleteSuccessAction implements Action {
    constructor() {}
    readonly type = deleteSuccessType;
}
export class AddSuccessAction implements Action {
    constructor(public majorDiagnosis: MajorDiagnosis) {}
    readonly type = addSuccessType;
}
export class LoadAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = loadType;
}
export class LoadedAction implements Action {
    constructor(public majorDiagnosises: MajorDiagnosis[]) {}
    readonly type = loadedType;
}
export class DepartmentSelectedAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = departmentSelectedType;
}
export class IndicationLoadedAction implements Action {
    constructor(public indications: Indication[]) {}
    readonly type = indicationLoadedType;
}
export class AddIndicationAction implements Action {
    constructor(public indication: Indication) {}
    readonly type = indicationAddType;
}
export class AddIndicationSuccessAction implements Action {
    constructor(public indication: Indication) {}
    readonly type = indicationAddSuccessType;
}
export class RemoveIndicationAction implements Action {
    constructor(public indication: Indication) {}
    readonly type = indicationRemoveType;
}
export class RemoveIndicationSuccessAction implements Action {
    constructor() {}
    readonly type = indicationRemoveSuccessType;
}
