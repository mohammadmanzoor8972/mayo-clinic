import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PriorityService } from '../service-calls';
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
        PrioritySelectedAction,
        prioritySelectedAction,
        DepartmentContextAction,
        departmentContextType
    } from './priority.reducer';
import { Observable } from 'rxjs/Observable';
import { ErrorAction } from '../actions/error.actions';
import { Priority } from './priority.model';
import { ROUTER_NAVIGATION } from '@ngrx/router-store/src/router_store_module';
import { RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateUrl } from '../shared/utils';


@Injectable()
export class PriorityEffects {
    constructor(private actions$: Actions, private serviceCalls: PriorityService) {}
    @Effect() departmentContext$ = this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((a: RouterNavigationAction<RouterStateUrl>) => a.payload.routerState)
    .filter((rsu: RouterStateUrl) => {
        return /capacity\/\w+/.test(rsu.url);
    })
    .map((a: RouterStateUrl) => {
        return new DepartmentContextAction(a.params['id']);
    });
    @Effect() loadAction$ = this.actions$.ofType<DepartmentContextAction>(departmentContextType)
    .switchMap((action) => {
         return this.serviceCalls.getPriority(action.departmentId)
         .map((priority) => {
             return new LoadedAction(priority as Priority[], action.departmentId);
         })
         .catch((error) => Observable.of(new ErrorAction(error)));
    });
    /*@Effect() loadAction$ = this.actions$.ofType<LoadAction>(loadType)
    .startWith(new LoadAction())
    .switchMap(() => {
        return this.serviceCalls.getPrioritys()
        .map((priority) => {
            return new LoadedAction(priority as Priority[]);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });*/
    @Effect() addActions$ = this.actions$.ofType<AddAction>(addItemType)
    .switchMap((action) => {
      console.log(action);
      return this.serviceCalls.addPriority(action.inline, action.departmentId)
      .switchMap((location) => this.serviceCalls.getPriority(location))      
      .map((priority) => new AddSuccessAction(priority as Priority))
      .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() removeActions$ = this.actions$.ofType<RemoveAction>(removeItemType)
    .switchMap((action) => {
        return this.serviceCalls.removePriority(action.priority)
        .map(() => new DeleteSuccessAction())
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect({ dispatch: false }) selectedAction$ = this.actions$.ofType<PrioritySelectedAction>(prioritySelectedAction)
    .do(action => {
        console.log(action.priorityId + ' was selected');
    });
    @Effect() priorityContext$ = this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((a: RouterNavigationAction<RouterStateUrl>) => a.payload.routerState)
    .filter((rsu: RouterStateUrl) => /department\/\w+/.test(rsu.url))
    .map((a: RouterStateUrl) => {
        return new PrioritySelectedAction(a.params['id']);
    });
}