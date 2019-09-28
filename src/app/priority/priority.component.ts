import { Component, OnInit,EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core/src/metadata/directives';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Priority } from './priority.model';
import {AppState,priorityFromRoot} from '../app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AddAction,RemoveAction} from './priority.reducer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {
  pForm: FormGroup;
  private departmentId: string;
  private departmentIdStream: Observable<string>;
  private deptIdSubscription: Subscription;

  private newLabel: string;
  private priorityStream: Observable<Priority[]>;
  constructor(private fb: FormBuilder, private appStore: Store<AppState>) {
  //this.priorityStream =  appStore.select((appState: AppState) => appState.priority.priorityList);
  this.departmentIdStream = appStore.select((appState: AppState) => appState.priority.departmentId);
  this.priorityStream = appStore.select(priorityFromRoot);
  //this.appStore..source._value.priority.priorityList;//appStore.select(priorityFromRoot);  
  }


  

  // make a form for each row!
    // make a form for each row!
    initItems(): FormGroup {
      return this.fb.group({
        name: [null, Validators.required],
        priorityNumber: [null, Validators.required], 
        startAt: [null, Validators.required],
        endAt: [null, Validators.required]
      });
    }

  ngOnInit() {
    
    this.deptIdSubscription = this.departmentIdStream.subscribe((dId) => this.departmentId = dId);
    
    this.pForm = this.fb.group({
      priority: this.fb.array([this.initItems()])
    });

    
    
  }

  // getter to get a reference to priority form array in myForm form group
  get priority(): FormArray {
    return <FormArray>this.pForm.get('priority');
  }
  // add a new row, get reference to form array using getter method and push form group into it
  addRow() {
    //debugger;
    this.priority.push(this.initItems());
    //this.appStore.dispatch(new AddAction(this.initItems(), this.departmentId));
  }
  remove(item: Priority) {
    
    console.log(item)
   // this.priorityStream = this.appStore.select(priorityFromRoot);
   this.appStore.dispatch(new RemoveAction(item));
  }

  submit() {
    //debugger;
    console.log(this.pForm.value)
    this.appStore.dispatch(new AddAction(this.pForm.value, this.departmentId));
    this.pForm = this.fb.group({
      priority: this.fb.array([this.initItems()])
    });
    
  }

}
