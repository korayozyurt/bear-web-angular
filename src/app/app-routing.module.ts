import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProjectComponent} from './project/project.component';
import {RegisterComponent} from './user/register/register.component';
import {ProfileComponent} from './user/profile/profile.component';
import {LoginComponent} from './home/login/login.component';
import {AddProjectComponent} from './project/add-project/add-project.component';
import {ProjectDetailComponent} from './project/project-detail/project-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'project/add-project', component: AddProjectComponent},
  {path: 'project/project-detail/:id', component: ProjectDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
