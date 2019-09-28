import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MajorDiagnosisService, IndicationService } from '../service-calls';
import {
            LoadAction,
            loadType,
            LoadedAction,
            AddAction,
            addItemType,
            AddSuccessAction,
            RemoveAction,
            removeItemType,
            DeleteSuccessAction,
            DepartmentSelectedAction,
            departmentSelectedType,
            loadedType,
            IndicationLoadedAction,
            AddIndicationAction,
            indicationAddType,
            AddIndicationSuccessAction,
            RemoveIndicationAction,
            indicationRemoveType,
            RemoveIndicationSuccessAction} from './major-diagnosis.reducer';
import { MajorDiagnosis, Indication } from './major-diagnosis.model';
import { Observable } from 'rxjs/Observable';
import { ErrorAction } from '../actions/error.actions';
//import { DepartmentSelectedAction, departmentSelectedAction } from '../department/department.reducer';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { RouterStateUrl } from '../shared/utils';

@Injectable()
export class MajorDiagnosisEffects {
    constructor(private actions$: Actions,
        private majorDiagnosisService: MajorDiagnosisService,
        private indicationService: IndicationService) {}
    @Effect() loadAction$ = this.actions$.ofType<LoadAction>(loadType)
    .switchMap((action) => {
        return this.majorDiagnosisService.getMajorDiagnosises(action.departmentId)
        .map((majD) => {
            return new LoadedAction(majD as MajorDiagnosis[]);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() loadedMajD$ = this.actions$.ofType<LoadedAction>(loadedType)
    .switchMap((action) => {
        return Observable.from(action.majorDiagnosises);
    })
    .mergeMap((individMajD) => {
        return this.indicationService.getIndications(individMajD._id)
        .map((indications) => {
            return new IndicationLoadedAction(indications);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() addActions$ = this.actions$.ofType<AddAction>(addItemType)
    .switchMap((action) => {
        return this.majorDiagnosisService.addMajorDiagnosis(action.item)
        .switchMap((location) => this.majorDiagnosisService.getMajorDiagnosis(location))
        .map((majD) => new AddSuccessAction(majD as MajorDiagnosis))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() removeActions$ = this.actions$.ofType<RemoveAction>(removeItemType)
    .switchMap((action) => {
        return this.majorDiagnosisService.removeMajorDiagnosis(action.majorDiagnosis)
        .map(() => new DeleteSuccessAction())
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() departmentSelected$ = this.actions$.ofType<DepartmentSelectedAction>(departmentSelectedType)
    .map((a: DepartmentSelectedAction) => {
        return new LoadAction(a.departmentId);
    });
    @Effect() departmentContext$ = this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((a: RouterNavigationAction<RouterStateUrl>) => a.payload.routerState)
    .filter((rsu: RouterStateUrl) => {
        return /majordiagnosis\/\w+/.test(rsu.url);
    })
    .map((a: RouterStateUrl) => {
        return new DepartmentSelectedAction(a.params['id']);
    });
    @Effect() addIndicationActions$ = this.actions$.ofType<AddIndicationAction>(indicationAddType)
    .switchMap((action) => {
        return this.indicationService.addIndication(action.indication)
        .switchMap((location) => this.indicationService.getIndication(location))
        .map((ind) => new AddIndicationSuccessAction(ind as Indication))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() removeIndicationAction$ = this.actions$.ofType<RemoveIndicationAction>(indicationRemoveType)
    .switchMap((action) => {
        return this.indicationService.removeIndication(action.indication)
        .map(() => new RemoveIndicationSuccessAction())
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
}
