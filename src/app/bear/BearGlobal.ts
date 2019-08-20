import {Injectable} from '@angular/core';

@Injectable()
export class BearGlobal {
  apiEndpoint = 'https://uzaktanelemanapi.herokuapp.com/v1';
  // apiEndpoint = 'http://localhost:8080/v1';

  authorization = 'Authorization';
  token = 'token';
  appName = 'Uzaktan Eleman v1';
  userId = 'userId';
  username = 'username';
  targetPage = 'lastPage';
}
