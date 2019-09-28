import { Component, OnInit } from '@angular/core';
import { State, IncrementAction, DecrementAction } from '../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  private counterStream: Observable<number>;
  constructor(private store: Store<State>) {
    this.counterStream = store.select((st: State) => st.counter );
  }

  ngOnInit() {
  }

  up() {
    this.store.dispatch(new IncrementAction());
  }

  down() {
    this.store.dispatch(new DecrementAction());
  }
}
