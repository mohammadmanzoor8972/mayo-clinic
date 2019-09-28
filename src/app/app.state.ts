import {
    DepartmentState,
    initialState as DepartmentStart,
    departmentActionReducer,
    departmentListSelector
} from './department/department.reducer';
import { PhysicianState, initialState as PhysicianStart, physicianActionReducer } from './physician/physician.reducer';
import { createSelector, ActionReducerMap, ActionReducer, Action, MetaReducer } from '@ngrx/store';
import { RouterStateUrl } from './shared/utils';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import {
    majorDiagnosisActionReducer,
    initialState as MajorDiagnosisStart,
    MajorDiagnosisState,
    majorDiagnosisListSelector
} from './major-diagnosis/major-diagnosis.reducer';
import { SurgicalDuration } from './surgical-duration/surgical-duration.model';
import {
surgicalDurationActionReducer,
initialState as SurgicalDurationStart,
SurgicalDurationState
} from './surgical-duration/surgical-duration.reducer';
import {
    PhysicianCapacityState,
    physicianCapacityActionReducer,
    initialState as PhysicianCapacityStart,
    physicianListSelector
} from './physician-capacity/physician-capacity.reducer';
import {
PriorityState,
priorityActionReducer,
initialState as PriorityStart, priorityListSelector
} from './priority/priority.reducer';

export const departmentSelector = (state: AppState) => (state.department);
export const departmentListFromRoot = createSelector(departmentSelector, departmentListSelector);
export const physicianSelector = (state: AppState) => (state.physician);

export const majorDiagnosisSelector = (state: AppState) => (state.majorDiagnosis);
export const majorDiagnosisListFromRoot = createSelector(majorDiagnosisSelector, majorDiagnosisListSelector);

export const physicianCapacitySelector = (state: AppState) => (state.physicianCapacity);
export const physicianCapacityFromRoot = createSelector(physicianCapacitySelector, physicianListSelector);

export const prioritySelector = (state: AppState) => (state.priority);
export const priorityFromRoot = createSelector(prioritySelector, priorityListSelector);

export interface AppState {
department: DepartmentState;
physician: PhysicianState;
majorDiagnosis: MajorDiagnosisState;
surgicalDuration: SurgicalDurationState;
physicianCapacity: PhysicianCapacityState;
priority: PriorityState;
routerReducer: RouterReducerState<RouterStateUrl>;
}

export const initialState: AppState = {
department: DepartmentStart,
physician: PhysicianStart,
majorDiagnosis: MajorDiagnosisStart,
surgicalDuration: SurgicalDurationStart,
physicianCapacity: PhysicianCapacityStart,
priority: PriorityStart,
routerReducer: {} as RouterReducerState<RouterStateUrl>
};

export const appStateReducer: ActionReducerMap<AppState> = {
department: departmentActionReducer,
physician: physicianActionReducer,
majorDiagnosis: majorDiagnosisActionReducer,
surgicalDuration: surgicalDurationActionReducer,
physicianCapacity: physicianCapacityActionReducer,
priority: priorityActionReducer,
routerReducer: routerReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
return function(state: AppState, action: any): AppState {
  console.log('state', state);
  console.log('action', action);
  return reducer(state, action);
};
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
? [logger] // , storeFreeze]
: [];
