import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, majorDiagnosisListFromRoot } from '../app.state';
import { MajorDiagnosis, Indication } from './major-diagnosis.model';
import { AddAction, RemoveAction, AddIndicationAction, RemoveIndicationAction } from './major-diagnosis.reducer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-major-diagnosis',
  templateUrl: './major-diagnosis.component.html',
  styleUrls: ['./major-diagnosis.component.scss']
})
export class MajorDiagnosisComponent implements OnInit, OnDestroy {
  private majorDiagnosisLabel: string;
  private majorDiagnosis: MajorDiagnosis;
  private departmentId: string;
  private departmentIdStream: Observable<string>;
  private majorDiagnosisStream: Observable<MajorDiagnosis[]>;
  private deptIdSubscription: Subscription;
  private indicationMap: Map<MajorDiagnosis, string> = new Map();
  private indicationStream: Observable<Indication[]>;
  @ViewChild('newM')
  private newM: ElementRef;
  @Input()
  private labelFunction: (x: MajorDiagnosis) => string = (x) => x.name
  constructor(private majorDiagnosisStore: Store<AppState>) {
    this.majorDiagnosisStream = majorDiagnosisStore.select(majorDiagnosisListFromRoot);
    this.indicationStream = majorDiagnosisStore.select((appState: AppState) => appState.majorDiagnosis.indicationList);
    this.departmentIdStream = majorDiagnosisStore.select((appState: AppState) => appState.majorDiagnosis.selectedDepartmentId);
  }

  ngOnInit() {
    this.deptIdSubscription = this.departmentIdStream.subscribe((dId) => this.departmentId = dId);
  }
  ngOnDestroy() {
    this.deptIdSubscription.unsubscribe();
  }
  add() {
    this.majorDiagnosisStore.dispatch(
      new AddAction(
        {
          name: this.majorDiagnosisLabel,
          departmentId: this.departmentId
        } as MajorDiagnosis));
  }
  remove(item: MajorDiagnosis) {
    this.majorDiagnosisStore.dispatch(new RemoveAction(item));
  }
  addInd(majorDiagnosis: MajorDiagnosis) {
    this.majorDiagnosisStore.dispatch(
      new AddIndicationAction({majordiagnosisId: majorDiagnosis._id, name: this.indicationMap.get(majorDiagnosis)} as Indication)
    );
  }
  removeIndication(indication: Indication) {
    this.majorDiagnosisStore.dispatch(new RemoveIndicationAction(indication));
  }
  getIndicationInput(majorDiagnosis: MajorDiagnosis) {
    return this.indicationMap.get(majorDiagnosis);
  }
  setIndicationInput(event: string, majorDiagnosis: MajorDiagnosis) {
    this.indicationMap.set(majorDiagnosis, event);
  }
  filter(majorDiagnosisId: string) {
    return this.indicationStream.map((ind) => ind.filter((d) => d.majordiagnosisId === majorDiagnosisId));
  }
}
