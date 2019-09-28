import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ListState, AddAction, RemoveAction, NextAction, ConfigureAction } from './lister';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})
export class ListerComponent implements OnInit {
  private newLabel: string;
  @ViewChild('newL')
  private newL: ElementRef;
  private itemsStream: Observable<any[]>;
  @Input()
  private labelFunction: (x: any) => string = (x) => x.name
  constructor(private itemsStore: Store<ListState>) {
    this.itemsStream = itemsStore.select((ist: ListState) => ist.list);
  }

  ngOnInit() {
  }

  add() {
    console.log('dispatching add action');
    this.itemsStore.dispatch(new AddAction(this.newLabel));
  }

  remove(item: any) {
    console.log('dispatching remove action');
    this.itemsStore.dispatch(new RemoveAction(item));
  }
  next() {
    console.log('dispatching next action');
    this.itemsStore.dispatch(new NextAction());
  }
  configure(item: any) {
    console.log('dispatching configure action');
    this.itemsStore.dispatch(new ConfigureAction(item));
  }
}
