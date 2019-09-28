import { Component, OnInit, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-crud',
  templateUrl: './list-crud.component.html',
  styleUrls: ['./list-crud.component.scss']
})
export class ListCrudComponent implements OnInit {
  private newLabel: string;
  @ViewChild('newL')
  private newL: ElementRef;
  @Output()
  private labelSet: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  private labelRemove: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  private Title: string;
  @Input()
  private items: any[];
  @Input()
  private labelFunction: (x: any) => string = (x) => x.toString()
  constructor() { }

  ngOnInit() {
  }

  createLabel() {
    //do something?
    this.labelSet.emit(this.newLabel);
    this.newLabel = '';
    this.newL.nativeElement.focus();
    console.log(this.newLabel);
  }
  removeLabel(item: any) {
    //do something?
    this.labelRemove.emit(item);
    console.log(item);
  }

}
