import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private items: any[];
  constructor() { }

  ngOnInit() {
    this.items = ['matt', 'brad'];
  }
  addit(x: string) {
    this.items.push(x);
  }
  dunkit(x: any) {
    this.items = this.items.filter((item) => item !== x);
  }
}
