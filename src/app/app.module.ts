import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { NavigationComponent } from './navigation/navigation.component';
import {PrimeModule} from './prime.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { RegisterComponent } from './user/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './user/profile/profile.component';
import {BearGlobal} from './bear/BearGlobal';
import {MessageService} from 'primeng/api';
import { LoginComponent } from './home/login/login.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { BidComponent } from './project/project-detail/bid/bid.component';
import {environment} from '../environments/environment';
import { BearFileDropZoneDirective } from './bear/directives/bear-file-drop-zone.directive';
import { BearFileUploadComponent } from './bear/components/bear-file-upload/bear-file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    NavigationComponent,
    SideNavbarComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    BidComponent,
    BearFileDropZoneDirective,
    BearFileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [BearGlobal, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
