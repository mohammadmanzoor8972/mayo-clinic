import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PhysicianService } from '../service-calls';
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
        LookUpAction,
        lookUpType,
        LookUpSuccessAction
    } from './physician.reducer';
import { Observable } from 'rxjs/Observable';
import { ErrorAction } from '../actions/error.actions';
import { Physician } from './physician.model';
import { DepartmentSelectedAction, departmentSelectedAction } from '../department/department.reducer';

@Injectable()
export class PhysicianEffects {
    constructor(private actions$: Actions, private serviceCalls: PhysicianService) {}
    @Effect() loadAction$ = this.actions$.ofType<LoadAction>(loadType)
    .switchMap((action) => {
        return this.serviceCalls.getPhysicians(action.departmentId)
        .map((physicians) => {
            return new LoadedAction(physicians as Physician[]);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() addActions$ = this.actions$.ofType<AddAction>(addItemType)
    .switchMap((action) => {
        return this.serviceCalls.addPhysician(action.item)
        .switchMap((location) => this.serviceCalls.getPhysician(location))
        .map((physician) => new AddSuccessAction(physician as Physician))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() removeActions$ = this.actions$.ofType<RemoveAction>(removeItemType)
    .switchMap((action) => {
        return this.serviceCalls.removePhysician(action.physician)
        .map(() => new DeleteSuccessAction())
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() lookUpAction$ = this.actions$.ofType<LookUpAction>(lookUpType)
    .switchMap((action) => {
        return this.serviceCalls.getUserByLanId(action.lanId)
        .map((physician) => new LookUpSuccessAction(physician))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() departmentSelected$ = this.actions$.ofType<DepartmentSelectedAction>(departmentSelectedAction)
    .map((a: DepartmentSelectedAction) => {
        return new LoadAction(a.departmentId);
    });
}
