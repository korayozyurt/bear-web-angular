import { Component, OnInit } from '@angular/core';
import {Project} from '../pojos/project';

@Component({
  selector: 'bear-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[];

  constructor() {
    this.projects = [
      {projectId: null, projectOwner: 'MKT', projectCategory: 'Planlama',
        projectAvatar: null, imagePath: null, description: 'yazilim planlamasi'},
      {projectId: null, projectOwner: 'BEAR', projectCategory: 'JavaFX',
        projectAvatar: null, imagePath: null, description: 'Java FX uygulamaları'},
      {projectId: null, projectOwner: 'MKT', projectCategory: 'Startup',
        projectAvatar: null, imagePath: null, description: 'Startup with Angular 7 and Spring Boot'},
      {projectId: null, projectOwner: 'Burak & Ozden', projectCategory: 'Finans',
        projectAvatar: null, imagePath: null, description: 'Borsada gelecegi gormek'},
      {projectId: null, projectOwner: 'Mertcan', projectCategory: 'Halkla Iliskiler',
        projectAvatar: null, imagePath: null, description: 'Musteri memnuniyeti'}
    ];
  }

  ngOnInit() {

  }

}
