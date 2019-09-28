import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ServiceClass } from '../service-calls';
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
        departmentSelectedAction
    } from './department.reducer';
import { Observable } from 'rxjs/Observable';
import { ErrorAction } from '../actions/error.actions';
import { Department } from './department.model';
import { ROUTER_NAVIGATION } from '@ngrx/router-store/src/router_store_module';
import { RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateUrl } from '../shared/utils';

@Injectable()
export class DepartmentEffects {
    constructor(private actions$: Actions, private serviceCalls: ServiceClass) {}
    @Effect() loadAction$ = this.actions$.ofType<LoadAction>(loadType)
    .startWith(new LoadAction())
    .switchMap(() => {
        return this.serviceCalls.getDepartments()
        .map((departments) => {
            return new LoadedAction(departments as Department[]);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() addActions$ = this.actions$.ofType<AddAction>(addItemType)
    .switchMap((action) => {
        return this.serviceCalls.addDepartment({name: action.item} as Department)
        .switchMap((location) => this.serviceCalls.getDepartment(location))
        .map((department) => new AddSuccessAction(department as Department))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() removeActions$ = this.actions$.ofType<RemoveAction>(removeItemType)
    .switchMap((action) => {
        return this.serviceCalls.removeDepartment(action.department)
        .map(() => new DeleteSuccessAction())
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect({ dispatch: false }) selectedAction$ = this.actions$.ofType<DepartmentSelectedAction>(departmentSelectedAction)
    .do(action => {
        console.log(action.departmentId + ' was selected');
    });
    @Effect() departmentContext$ = this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((a: RouterNavigationAction<RouterStateUrl>) => a.payload.routerState)
    .filter((rsu: RouterStateUrl) => /department\/\w+/.test(rsu.url))
    .map((a: RouterStateUrl) => {
        return new DepartmentSelectedAction(a.params['id']);
    });
}
