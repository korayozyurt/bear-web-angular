import {Component, DoCheck, OnInit} from '@angular/core';
import {BearGlobal} from '../bear/BearGlobal';

@Component({
  selector: 'bear-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [BearGlobal]
})
export class NavigationComponent implements OnInit, DoCheck {

  appTitle: string = this.bearGlobal.appName;

  username: string = sessionStorage.getItem(this.bearGlobal.username);

  constructor(private bearGlobal: BearGlobal) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.username = sessionStorage.getItem(this.bearGlobal.username);
  }

  signOut() {
    sessionStorage.clear();
  }

}
