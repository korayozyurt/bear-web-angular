import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../services/upload/upload-file.service';
import {BearGlobal} from '../../bear/BearGlobal';
import {Observable} from 'rxjs';
import {PojoService} from '../../services/pojo/pojo.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

import {cities} from '../../bear/consts';

@Component({
  selector: 'bear-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public endpoint = this.bearGlobal.apiEndpoint;

  private descriptionEditMode = false;

  private userDescriptionFormControl = new FormControl('');
  private nameFormControl =  new FormControl('', Validators.required);
  private surnameFormControl = new FormControl('', Validators.required);

  private passwordForm: FormGroup;
  private emailForm: FormGroup;
  private communicationForm: FormGroup;

  userId = sessionStorage.getItem(this.bearGlobal.userId);
  userObservable: Observable<any>;
  bearUser: any;

  errorMessage = '';

  cities = cities;
  filteredCities: any[];

  constructor(private bearGlobal: BearGlobal,
              private pojoService: PojoService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.userObservable = this.pojoService.getById('user', this.userId);
    this.userObservable.subscribe(
      (result) => {
        this.bearUser = result;
      }
    );
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordValidator: new FormControl('', Validators.required)
    });

    this.emailForm = new FormGroup({
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      currentPassword: new FormControl('', Validators.required)
    });

    this.communicationForm = new FormGroup({
      city: new FormControl(),
      phoneNumber: new FormControl()
    });

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

  descriptionEditClicked() {
    this.descriptionEditMode = !this.descriptionEditMode;
  }

  descriptionUpdateClicked() {
    this.pojoService.update(this.userDescriptionFormControl.value, 'user/update-description/' + this.userId).subscribe(
      (result) => {
        if (result === 1) {
          this.successNotification('Başarıyla güncellendi');
          this.descriptionEditClicked();
        } else {
          this.errorNotification('Bir hata meydana geldi');
        }
      }
    );
  }

  updateNameSurnameClicked() {
    const userObj = {id: this.userId, name: this.nameFormControl.value, surname: this.surnameFormControl.value};
    this.pojoService.update(userObj, 'user/update-name-surname').subscribe(
      (result) => {
        if (result === 1) {
          this.successNotification('Başarıyla güncellendi');
        } else {
          this.errorNotification('Bir hata meydana geldi');
        }
        this.nameFormControl.markAsPristine();
        this.surnameFormControl.markAsPristine();
      }
    );
  }

  passwordChangeClicked() {
    this.passwordForm.value.userId = this.userId;
    this.pojoService.update(this.passwordForm.value, 'user/update-password').subscribe(
      (result) => {
        this.successNotification('Şifre başarıyla değiştirildi');
        this.errorMessage = '';
        this.passwordForm.reset();
      },
      (error) => {
        this.errorNotification(error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
      }
    );
  }

  emailChangeClicked() {
    this.emailForm.value.userId = this.userId;
    this.pojoService.update(this.emailForm.value, 'user/update-email').subscribe(
      (result) => {
        this.successNotification(result.message);
        this.bearUser.email = this.emailForm.controls.newEmail.value;
      }, (error) => {
        this.errorNotification(error.error.errorMessage);
      }
    );
  }

  submitCommunicationFormClicked() {
    this.communicationForm.value.userId = this.userId;
    this.pojoService.update(this.communicationForm.value, 'user/update-communication-info').subscribe(
      (result) => {
        this.successNotification(result.message);
      }, (error) => {
        this.errorNotification(error.error.errorMessage);
      }
    );
  }

  successNotification(message: string) {
    this.messageService.add({severity: 'success', summary: message});
  }

  errorNotification(message: string) {
    this.messageService.add({severity: 'error', summary: message});
  }

}


















