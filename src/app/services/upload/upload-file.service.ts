import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BearGlobal} from '../../bear/BearGlobal';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, private bearGlobal: BearGlobal) { }

  endpoint = this.bearGlobal.apiEndpoint + '/file/';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name.replace(/\s+/g, '_'));

    const username = sessionStorage.getItem(this.bearGlobal.username) != null
      ? sessionStorage.getItem(this.bearGlobal.username)
      : '';

    const req = new HttpRequest('POST', this.bearGlobal.apiEndpoint + '/file', formData, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders().set('username', username)
    });

    return this.http.request(req);
  }

  getFile(filename: string): Observable<any> {
    return this.http.get(this.bearGlobal.apiEndpoint + '/file' + filename);
  }

  removeFile(filename: string): Observable<any> {
    return this.http.delete(this.endpoint + filename);
  }
}
