import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {BearGlobal} from '../../bear/BearGlobal';
import {Router} from '@angular/router';

import {cities} from '../../bear/consts';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {app} from 'firebase';
import {finalize, tap} from 'rxjs/operators';

@Component({
  selector: 'bear-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  passwordConfirmation = new FormControl('', Validators.required);

  submitDisabled = true;

  cities = cities;
  filteredCities: any[];

  constructor(private registerService: RegisterService,
              private messageService: MessageService,
              private bearGlobal: BearGlobal,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      userDescription: new FormControl(''),
      password: new FormControl('', Validators.required),
      avatarPath: new FormControl('', Validators.required),
      city: new FormControl(''),
      phoneNumber: new FormControl('')
    });
    this.isformValidated();
  }

  fileUrlObserver(event) {
    event.subscribe(
      (result) => {
        this.registerForm.controls.avatarPath.setValue(result);
      }
    );
  }

  getCity(event) {
    this.filteredCities = [];

    this.cities.forEach(city => {
      if (city.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredCities.push(city);
      }
    });

    return this.filteredCities;
  }

  isformValidated() {
    this.registerForm.valueChanges.subscribe(() => {
      if (this.registerForm.pristine ||  this.registerForm.invalid
          || (this.registerForm.controls.password.value !== this.passwordConfirmation.value)) {
        this.submitDisabled = true;
      } else {
        this.submitDisabled = false;
      }
    });
  }

  onSubmit() {
    this.registerForm.value.userType = 'USER';
    let validated = true;
    Object.keys(this.registerForm.controls).forEach( key => {
      if (this.registerForm.get(key).value === '') {
        validated = false;
        return;
      }
    });
    if (validated) {
      this.registerService.save(this.registerForm.value).subscribe((result) => {
        const targetPage = sessionStorage.getItem(this.bearGlobal.targetPage) != null
          ? sessionStorage.getItem(this.bearGlobal.targetPage)
          : '/';
        this.router.navigate([targetPage], {replaceUrl: true});
      }, (error) => {
        this.messageService.add({severity: 'error', summary: error.error.errorMessage});
      }, () => {
        this.messageService.add({severity: 'success', summary: 'Kayıt Başarılı'});
      });
    }
  }

}
