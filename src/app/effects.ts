import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
    NextAction,
    nextPageType,
    AddAction,
    PhysiciansLoadedAction,
    ErrorAction,
    addItemType,
    AddSuccessAction,
    RemoveAction,
    removeItemType,
    DeleteSuccessAction} from './lister/lister';
import { Observable } from 'rxjs/Observable';
import { ServiceClass } from './service-calls';
import { Department } from './department/department.model';

@Injectable()
export class EffectsClass {
    constructor(private actions$: Actions, private serviceCalls: ServiceClass) {}
    @Effect() nextActions$ = this.actions$.ofType<NextAction>(nextPageType)
    .do(action => {
        console.log(action);
    }).switchMap((/*have access to full action here*/) => {
        console.log('in switchmap for loaded action');
        return this.serviceCalls.getDepartments()
        .map((departments) => new PhysiciansLoadedAction(departments))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() addActions$ = this.actions$.ofType<AddAction>(addItemType)
    .do(action => {
        console.log(action);
    }).switchMap((action) => {
        console.log('in switchmap for add actions');
        return this.serviceCalls.addDepartment({name: action.item} as Department)
        .switchMap((location) => this.serviceCalls.getDepartment(location))
        .map((department) => new AddSuccessAction(department))
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
    @Effect() removeActions$ = this.actions$.ofType<RemoveAction>(removeItemType)
    .do(action => {
        console.log(action);
    }).switchMap((action) => {
        console.log('trying to delete');
        return this.serviceCalls.removeDepartment(action.item)
        .map(() => new DeleteSuccessAction())
        .catch((error) => Observable.of(new ErrorAction(error)));
    });
}
