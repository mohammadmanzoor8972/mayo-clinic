import { Component, Inject, OnInit } from '@angular/core';

import template from './header.component.html';

import * as gppaLogo from '!svg-sprite-loader!./icons/gppa-logo.svg';

@Component({
  template,
  selector: 'app-header',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public gppaLogo = gppaLogo;
  public UserName = 'User';
  public Picture = 'https://randomuser.me/api/portraits/women/85.jpg';
  constructor() { }
  ngOnInit(): void {
  }
}
