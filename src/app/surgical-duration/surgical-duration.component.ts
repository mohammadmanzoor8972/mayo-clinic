import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Physician } from '../physician/physician.model';
import { MajorDiagnosis } from '../major-diagnosis/major-diagnosis.model';
import { AppState } from '../app.state';
import { SurgicalDurationMatrix, GridItem } from './surgical-duration.model';
import { SurgicalDurationSaveAction } from './surgical-duration.reducer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-surgical-duration',
  templateUrl: './surgical-duration.component.html',
  styleUrls: ['./surgical-duration.component.scss']
})
export class SurgicalDurationComponent implements OnInit, OnDestroy {
  private physicianStream: Observable<Physician[]>;
  private majorDiagnosisStream: Observable<MajorDiagnosis[]>;
  private matrixOfDuration: Map<string, number> = new Map();
  private surgicalDurationMatrixStream: Observable<SurgicalDurationMatrix>;
  private surgicalDurationMatrixSubscription: Subscription;
  private surgicalDurMatrixHolding: SurgicalDurationMatrix;
  private departmentIdStream: Observable<string>;
  private deptIdSubscription: Subscription;
  private departmentId: string;

  constructor(private appStore: Store<AppState>) {
    this.departmentIdStream = appStore.select((app: AppState) => app.department.selectedDepartmentId);
    this.majorDiagnosisStream = appStore.select((app: AppState) => app.surgicalDuration.surgicalDuration.majorDiagnosises);
    this.physicianStream = appStore.select((app: AppState) => app.surgicalDuration.surgicalDuration.physicians);
    this.surgicalDurationMatrixStream = appStore.select((app: AppState) => app.surgicalDuration.surgicalDurationMatrix);
  }

  ngOnInit() {
    this.surgicalDurationMatrixSubscription = this.surgicalDurationMatrixStream.subscribe((matrix) => {
      this.surgicalDurMatrixHolding = matrix;
      if (this.surgicalDurMatrixHolding && this.surgicalDurMatrixHolding.grid) {
      this.surgicalDurMatrixHolding.grid.forEach(
        (gridItem) => this.matrixOfDuration.set(gridItem.majordiagnosisId + '|' + gridItem.physicianId, gridItem.duration));
      }
    });
    this.deptIdSubscription = this.departmentIdStream.subscribe((dId) => this.departmentId = dId);
  }
  ngOnDestroy() {
    this.surgicalDurationMatrixSubscription.unsubscribe();
    this.deptIdSubscription.unsubscribe();
  }
  getSurgicalDuration(majorDiagnosis: MajorDiagnosis, physician: Physician) {
    return this.matrixOfDuration.get(majorDiagnosis._id + '|' + physician._id);
  }
  setSurgicalDuration(event: string, majorDiagnosis: MajorDiagnosis, physician: Physician) {
    this.matrixOfDuration.set(majorDiagnosis._id + '|' + physician._id, +event);
  }
  save() {
    // Map<[string1, string2], string3>
    // {majordiatnosisid: string1, physicianid: string2, duration: string3}
    // console.log(this.matrixOfDuration.size);
    const grid: GridItem[] = [];
    // this.matrixOfDuration.forEach((duration, [majordiagnosis, physician]) => grid.push(
    //   {duration, majordiagnosisId: majordiagnosis._id, physicianId: physician._id}));
    this.matrixOfDuration.forEach((duration, majordiagnosisIdphysicianId) => grid.push(
      {duration, majordiagnosisId: majordiagnosisIdphysicianId.split('|')[0], physicianId: majordiagnosisIdphysicianId.split('|')[1]}));
    //const sdm: SurgicalDurationMatrix = {grid, departmentId: '5a538eed0ecce90930aefcc7'} as SurgicalDurationMatrix;
    this.surgicalDurMatrixHolding = {...this.surgicalDurMatrixHolding, grid, departmentId: this.departmentId};
    console.log(this.surgicalDurMatrixHolding);
    this.appStore.dispatch(new SurgicalDurationSaveAction(this.surgicalDurMatrixHolding));
  }
}
