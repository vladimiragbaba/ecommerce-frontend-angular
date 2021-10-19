import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  BACKEND_BASE = 'http://localhost:8080/users'

  constructor(private httpClient: HttpClient) { }

  register(registerBody: any): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + '/register', registerBody);
  }

}
