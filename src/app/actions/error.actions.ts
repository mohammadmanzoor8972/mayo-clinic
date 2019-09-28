import { ActionReducer, ActionReducerMap, Action } from '@ngrx/store';
export const errorType = '[root] Error';
export class ErrorAction implements Action {
    constructor(public error: any) {}
    readonly type = errorType;
}
