import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  PhysicianState,
  AddAction,
  RemoveAction,
  LoadAction,
  LookUpAction } from './physician.reducer';
import { Physician } from './physician.model';
import { AppState } from '../app.state';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss']
})
export class PhysicianComponent implements OnInit, OnDestroy {
  private physicianLabel: string;
  private physician: Physician;
  @ViewChild('newP')
  private newP: ElementRef;
  private physicianStream: Observable<Physician[]>;
  private foundPhysicianStream: Observable<Physician>;
  private foundPhysicianSub: Subscription;
  private departmentIdStream: Observable<string>;
  private deptIdSubscription: Subscription;
  @Input()
  private labelFunction: (x: Physician) => string = (x) => x.lastName + ', ' + x.firstName
  constructor(private physicianStore: Store<AppState>) {
    this.physicianStream = physicianStore.select((appState: AppState) => appState.physician.physicianList);
    this.departmentIdStream = physicianStore.select((appState: AppState) => appState.department.selectedDepartmentId);
    this.foundPhysicianStream = physicianStore.select((appState: AppState) => appState.physician.physicianLookUp);
  }
  ngOnInit() {
    this.physician = {} as Physician;
    this.deptIdSubscription = this.departmentIdStream.subscribe((dId) => this.physician.departmentId = dId);
    this.foundPhysicianSub = this.foundPhysicianStream.subscribe((fps) => {
      this.physician = {...fps, departmentId: this.physician.departmentId};
    });
  }
  ngOnDestroy() {
    this.deptIdSubscription.unsubscribe();
    this.foundPhysicianSub.unsubscribe();
  }
  add() {
    this.physicianStore.dispatch(new AddAction(this.physician));
  }
  remove(item: Physician) {
    this.physicianStore.dispatch(new RemoveAction(item));
  }
  lookup() {
    this.physicianStore.dispatch(new LookUpAction(this.physicianLabel));
  }
}
