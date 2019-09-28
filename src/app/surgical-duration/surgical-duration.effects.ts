import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PhysicianService, MajorDiagnosisService, SurgicalDurationService } from '../service-calls';
import { Observable } from 'rxjs/Observable';
import { ErrorAction } from '../actions/error.actions';
import { DepartmentSelectedAction, departmentSelectedAction } from '../department/department.reducer';
import {
    LoadAction,
    loadType,
    LoadedAction,
    MatrixLoadAction,
    matrixLoadType,
    MatrixLoadedAction,
    SurgicalDurationSaveAction,
    surgicalDurMatrixSaveType,
    SurgicalDurationSaveSuccessAction} from './surgical-duration.reducer';
import { SurgicalDurationMatrix } from './surgical-duration.model';
import { RouterStateUrl } from '../shared/utils';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class SurgicalDurationEffects {
    constructor(private actions$: Actions,
        private physicianService: PhysicianService,
        private majorDiagnosisService: MajorDiagnosisService,
        private surgicalDurationService: SurgicalDurationService) {}
    // @Effect() departmentSelected$ = this.actions$.ofType<DepartmentSelectedAction>(departmentSelectedAction)
    // .map((a: DepartmentSelectedAction) => {
    //     return new LoadAction(a.departmentId);
    // });
    @Effect() loadAction$ = this.actions$.ofType<LoadAction>(loadType)
    .switchMap((action) => {
        const majorDiagnosisStream = this.majorDiagnosisService.getMajorDiagnosises(action.departmentId);
        const matrixDurationStream = this.surgicalDurationService.getSurgicalDurations(action.departmentId);
        return this.physicianService.getPhysicians(action.departmentId)
        .zip(majorDiagnosisStream, matrixDurationStream, (physicians, majorDiagnosises, surgicalDurationMatrix) => {
            return new LoadedAction({physicians, majorDiagnosises},  surgicalDurationMatrix);
        });
    });
    @Effect() loadDurationMatrix$ = this.actions$.ofType<MatrixLoadAction>(matrixLoadType)
    .switchMap((action) => {
        return this.surgicalDurationService.getSurgicalDurations(action.departmentId)
        .map((surDurMatrix) => {
            return new MatrixLoadedAction(surDurMatrix[0] as SurgicalDurationMatrix);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() saveDurationMatrix$ = this.actions$.ofType<SurgicalDurationSaveAction>(surgicalDurMatrixSaveType)
    .switchMap((action) => {
        return this.surgicalDurationService.saveSurgicalDuration(action.surgicalDurationMatrix)
        .switchMap((location) => this.surgicalDurationService.getSurgicalDuration(location))
        .map((surdM) => new SurgicalDurationSaveSuccessAction(surdM as SurgicalDurationMatrix))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() routingHere$ = this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((a: RouterNavigationAction<RouterStateUrl>) => a.payload.routerState)
    .filter((rsu: RouterStateUrl) => {
        return /surgicalduration\/\w+/.test(rsu.url);
    })
    .map((a: RouterStateUrl) => {
        return new LoadAction(a.params['id']);
    });
}
