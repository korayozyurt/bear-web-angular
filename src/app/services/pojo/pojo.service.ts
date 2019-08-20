import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BearGlobal} from '../../bear/BearGlobal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PojoService {

  private endpoint: string;

  constructor(private httpClient: HttpClient, private bearGlobal: BearGlobal) {
    this.endpoint = this.bearGlobal.apiEndpoint;
  }

  get(requestMapping: string): Observable<any> {
    const endpoint = this.bearGlobal.apiEndpoint + '/' + requestMapping;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem(this.bearGlobal.token)
      })
    };
    return this.httpClient.get(endpoint, options);
  }

  getById(requestMapping: string, id: string): Observable<any> {
    const endpoint = this.endpoint +  '/' + requestMapping + '/' + id ;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem(this.bearGlobal.token)
      })
    };
    return this.httpClient.get(endpoint, options);
  }

  /**
   * @param pojo the pojo object
   * @param requestMapping apiEndpoint + /requestMapping
   */
  save(pojo: any, requestMapping: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem(this.bearGlobal.token)
      })
    };
    const endpoint = this.endpoint + '/' + requestMapping;
    return this.httpClient.post(endpoint, pojo, options);
  }

  update(pojo: any, requestMapping: string): Observable<any> {
    const endpoint = this.endpoint + '/' + requestMapping;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem(this.bearGlobal.token),
      })
    };
    return this.httpClient.put(endpoint, pojo, options);
  }
}
