import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../app.state';
import { Physician } from '../physician/physician.model';
import { Day, CapacityMatrix, GridItem } from './physician-capacity.model';
import { PhysicianCapacitySaveAction } from './physician-capacity.reducer';

@Component({
  selector: 'app-physician-capacity',
  templateUrl: './physician-capacity.component.html',
  styleUrls: ['./physician-capacity.component.scss']
})
export class PhysicianCapacityComponent implements OnInit, OnDestroy {
  private physicianStream: Observable<Physician[]>;
  private dayStream: Observable<Day[]>;
  private matrixOfCapacity: Map<string, number> = new Map();
  private capacity: CapacityMatrix;
  private capacityMatrixStream: Observable<CapacityMatrix>;
  private capacityMatrixSubscription: Subscription;
  private departmentIdStream: Observable<string>;
  private departmentIdSubscription: Subscription;
  private departmentId: string;

  constructor(private appStore: Store<AppState>) {
    this.physicianStream = appStore.select((app: AppState) => app.physicianCapacity.physicianList);
    this.dayStream = appStore.select((app: AppState) => app.physicianCapacity.days);
    this.capacityMatrixStream = appStore.select((app: AppState) => app.physicianCapacity.capacityMatrix);
    this.departmentIdStream = appStore.select((app: AppState) => app.physicianCapacity.departmentId);
    // get the selected id?
   }

  ngOnInit() {
    this.capacityMatrixSubscription = this.capacityMatrixStream.subscribe((capmat) => {
      console.log(capmat);
      this.capacity = capmat;
      if (this.capacity && this.capacity.grid) {
        this.capacity.grid.forEach((gridItem) => this.matrixOfCapacity.set(gridItem.physicianId + '|' + gridItem.day, gridItem.duration));
      }
    });
    this.departmentIdSubscription = this.departmentIdStream.subscribe((deptId) => {
      this.departmentId = deptId;
    });
  }
  ngOnDestroy() {
    this.capacityMatrixSubscription.unsubscribe();
    this.departmentIdSubscription.unsubscribe();
  }
  getPhysicianCapacity(physician: Physician, day: Day) {
    return this.matrixOfCapacity.get(physician._id + '|' + day.name);
  }
  setSurgicalDuration(event: string, physician: Physician, day: Day) {
    this.matrixOfCapacity.set(physician._id + '|' + day.name, +event);
  }
  save() {
    console.log(this.matrixOfCapacity);
    const grid: GridItem[] = [];
    this.matrixOfCapacity.forEach((duration, physicianIdDay) => grid.push(
      {duration, physicianId: physicianIdDay.split('|')[0], day: physicianIdDay.split('|')[1]}));
    this.capacity = {...this.capacity, grid, departmentId: this.departmentId};
    console.log(this.capacity);
    this.appStore.dispatch(new PhysicianCapacitySaveAction(this.capacity));
  }
}
