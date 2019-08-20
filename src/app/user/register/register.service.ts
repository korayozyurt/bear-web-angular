import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BearGlobal} from '../../bear/BearGlobal';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private bearGlobal: BearGlobal,
              private http: HttpClient) { }

  save(user: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const endpoint = this.bearGlobal.apiEndpoint + '/user';
    return this.http.post(endpoint, user, options);
  }
}
