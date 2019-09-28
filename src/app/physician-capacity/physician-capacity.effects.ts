import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PhysicianService, DayService, CapacityService } from '../service-calls';
import { RouterStateUrl } from '../shared/utils';
import { Observable } from 'rxjs/Observable';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import {
    DepartmentContextAction,
    departmentContextType,
    LoadedAction,
    loadedType,
    DaysLoadedAction,
    physCapSaveType,
    PhysicianCapacitySaveAction,
    CapacitySaveSuccessAction,
    CapacityLoadedAction} from './physician-capacity.reducer';
import { Physician } from '../physician/physician.model';
import { ErrorAction } from '../actions/error.actions';
import { Day, CapacityMatrix } from './physician-capacity.model';
import { switchMap } from 'rxjs/operator/switchMap';

@Injectable()
export class PhysicianCapacityEffects {
    constructor(
        private actions$: Actions,
        private physicianService: PhysicianService,
        private dayService: DayService,
        private capacityService: CapacityService) {}
    @Effect() departmentContext$ = this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((a: RouterNavigationAction<RouterStateUrl>) => a.payload.routerState)
    .filter((rsu: RouterStateUrl) => {
        return /capacity\/\w+/.test(rsu.url);
    })
    .map((a: RouterStateUrl) => {
        return new DepartmentContextAction(a.params['id']);
    });
    @Effect() loadPhysicians$ = this.actions$.ofType<DepartmentContextAction>(departmentContextType)
    .switchMap((action) => {
         return this.physicianService.getPhysicians(action.departmentId)
         .map((phys) => {
             return new LoadedAction(phys as Physician[], action.departmentId);
         })
         .catch((error) => Observable.of(new ErrorAction(error)));
    });
    /**/
    @Effect() loadCapacity$ = this.actions$.ofType<DepartmentContextAction>(departmentContextType)
    .switchMap((action) => {
        return this.capacityService.getCapacities(action.departmentId)
        .map((capmat) => {
            return new CapacityLoadedAction(capmat[0] as CapacityMatrix);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() loadDays$ = this.actions$.ofType<LoadedAction>(loadedType)
    .switchMap((action) => {
        return this.dayService.getDays()
        .map((days) => {
            return new DaysLoadedAction(days);
        })
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() saveCapacity$ = this.actions$.ofType<PhysicianCapacitySaveAction>(physCapSaveType)
    .switchMap((action) => {
        return this.capacityService.saveCapacity(action.capacity)
        .switchMap((location) => this.capacityService.getCapacity(location))
        .map((cap) => new CapacitySaveSuccessAction(cap as CapacityMatrix))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
}
