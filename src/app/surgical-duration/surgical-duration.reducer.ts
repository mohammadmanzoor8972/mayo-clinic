import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
import { append, concat, prepend } from 'ramda';
import { ErrorAction, errorType } from '../actions/error.actions';
import { SurgicalDuration, SurgicalDurationMatrix } from './surgical-duration.model';
import { MajorDiagnosis } from '../major-diagnosis/major-diagnosis.model';

export const loadType = '[SurgicalDuration]load';
export const loadedType = '[SurgicalDuration]loaded';
export const matrixLoadType = '[SurgicalDuration]matrixLoad';
export const matrixLoadedType = '[SurgicalDuration]matrixLoaded';
export const surgicalDurMatrixSaveType = '[SurgicalDuration]matrixSave';
export const surgicalDurMatrixSaveSuccessType = '[SurgicalDuration]matrixSaveSuccess';
export const initialState: SurgicalDurationState = {
    surgicalDuration: {} as SurgicalDuration,
    surgicalDurationMatrix: {} as SurgicalDurationMatrix
    };

export interface SurgicalDurationState {
    surgicalDuration: SurgicalDuration;
    surgicalDurationMatrix: SurgicalDurationMatrix;
}

type SurgicalDurationActions =
LoadAction|
LoadedAction|
MatrixLoadedAction|
SurgicalDurationSaveAction|
SurgicalDurationSaveSuccessAction|
ErrorAction;

export const surgicalDurationActionReducer:
    ActionReducer<SurgicalDurationState> = function(curr: SurgicalDurationState, actionEmitted: SurgicalDurationActions) {
        switch (actionEmitted.type) {
            case loadedType:
                console.log('actionE SD');
                console.log(actionEmitted.surgicalDurationMatrix[0]);
                const fixedMajorDiagnosis = prepend({} as MajorDiagnosis, actionEmitted.surgicalDurations.majorDiagnosises);
                // const fixedSurg = actionEmitted.surgicalDurations.majorDiagnosises
                return {...curr,
                    surgicalDuration: {majorDiagnosises: fixedMajorDiagnosis, physicians: actionEmitted.surgicalDurations.physicians},
                    surgicalDurationMatrix: actionEmitted.surgicalDurationMatrix[0]};
            case matrixLoadedType:
                    console.log('matrix loaded');
                return curr;
            case surgicalDurMatrixSaveSuccessType:
                return {...curr, surgicalDurationMatrix: actionEmitted.surgicalDurationMatrix};
            default:
                return curr;
        }
    };

export class LoadAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = loadType;
}
export class LoadedAction implements Action {
    constructor(public surgicalDurations: SurgicalDuration, public surgicalDurationMatrix: SurgicalDurationMatrix[]) {}
    readonly type = loadedType;
}
export class MatrixLoadAction implements Action {
    constructor(public departmentId: string) {}
    readonly type = matrixLoadType;
}
export class MatrixLoadedAction implements Action {
    constructor(public surgicalDurationMatrix: SurgicalDurationMatrix) {}
    readonly type = matrixLoadedType;
}
export class SurgicalDurationSaveAction implements Action {
    constructor(public surgicalDurationMatrix: SurgicalDurationMatrix) {}
    readonly type = surgicalDurMatrixSaveType;
}
export class SurgicalDurationSaveSuccessAction implements Action {
    constructor(public surgicalDurationMatrix: SurgicalDurationMatrix) {}
    readonly type = surgicalDurMatrixSaveSuccessType;
}

