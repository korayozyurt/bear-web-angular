import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginServiceService} from './login-service.service';
import {MessageService} from 'primeng/api';
import {BearGlobal} from '../../bear/BearGlobal';
import {Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'bear-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loadingDialog = false;

  constructor(private loginService: LoginServiceService,
              private messageService: MessageService,
              private bearGlobal: BearGlobal,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

  }

  onLogin() {
    this.loadingDialog = true;

    this.loginForm.value.email = this.loginForm.value.username;
    this.loginService.login(this.loginForm.value).subscribe(
      (result) => {

        if (result.body.id) {
          this.messageService.add({severity: 'success' , summary: 'Giriş Başarılı'});

          sessionStorage.setItem(this.bearGlobal.userId, result.body.id);
          sessionStorage.setItem(this.bearGlobal.username, this.loginForm.value.username);
          sessionStorage.setItem(this.bearGlobal.token, result.headers.get(this.bearGlobal.authorization));

          const targetPage = sessionStorage.getItem(this.bearGlobal.targetPage) != null
            ? sessionStorage.getItem(this.bearGlobal.targetPage)
            : '/';
          this.router.navigate([targetPage], {replaceUrl: true});
        } else {
          this.messageService.add({severity: 'error', summary: 'Hatalı Kullanıcı adı/email ve ya şifre'});
        }
      },
      (error) => {
        if (error.status === 403) {
          this.messageService.add({severity: 'error', summary: 'Hatalı Kullanıcı adı/email ve ya şifre'});
        } else {
          this.messageService.add({severity: 'error', summary: 'servis hatasi'});
        }
        this.loadingDialog = false;
      }, () => {
        this.loadingDialog = false;
      }
    );
  }

}
