import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AddAction, RemoveAction, DepartmentState, LoadAction, DepartmentSelectedAction } from './department.reducer';
import { Department } from './department.model';
import { AppState, departmentListFromRoot } from '../app.state';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  private newLabel: string;
  @ViewChild('newL')
  private newL: ElementRef;
  private departmentStream: Observable<Department[]>;
  @Input()
  private labelFunction: (x: Department) => string = (x) => x.name
  constructor(private appStore: Store<AppState>) {
    this.departmentStream = appStore.select(departmentListFromRoot);
  }

  ngOnInit() {
  }

  add() {
    console.log('dispatching add action');
    this.appStore.dispatch(new AddAction(this.newLabel));
  }
  remove(item: Department) {
    console.log('dispatching remove action');
    this.appStore.dispatch(new RemoveAction(item));
  }
}
