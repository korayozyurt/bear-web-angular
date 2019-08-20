import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BearGlobal} from '../bear/BearGlobal';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private bearGlobal: BearGlobal) { }



}
