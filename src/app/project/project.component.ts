import { Component, OnInit } from '@angular/core';
import {BearGlobal} from '../bear/BearGlobal';
import {Router} from '@angular/router';
import {PojoService} from '../services/pojo/pojo.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'bear-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  username: string;

  loginWarning = false;

  projectsObservalbe: Observable<any[]>;

  constructor(private bearGlobal: BearGlobal, private router: Router, private pojoService: PojoService) { }

  ngOnInit() {
    this.projectsObservalbe = this.pojoService.get('project');
  }

  addProject() {
    if (sessionStorage.getItem(this.bearGlobal.username)) {
      this.router.navigate(['/project/add-project']);
    } else {
        this.loginWarning = true;
    }
  }

  /**
   * if user not logged in, user must click the login. Then return back the page
   */
  loginClicked() {
    sessionStorage.setItem(this.bearGlobal.targetPage, '/project/add-project');
    this.router.navigate(['/login']);
  }

}
