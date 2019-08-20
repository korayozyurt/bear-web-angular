import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BearGlobal} from '../../bear/BearGlobal';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private endpoint: string;

  constructor(private httpClient: HttpClient,
              private bearGlobal: BearGlobal) {
    this.endpoint = this.bearGlobal.apiEndpoint;
  }

  login(user: any): Observable<any> {
    const bearHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const endpoint = this.bearGlobal.apiEndpoint + '/user/login';
    return this.httpClient.post(endpoint, user, {headers: bearHeader, observe: 'response'} );
  }

}
