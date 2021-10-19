import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  BACKEND_BASE = 'http://localhost:8080/users'

  private currentUser: any;

  public isUserLoggedIn: BehaviorSubject<boolean> = 
        new BehaviorSubject<boolean>(localStorage.getItem('token') != null);
  public isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE +'/login', {
      email: email,
      password: password
    })
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(u: any) {
    this.currentUser = u;
    if(this.currentUser != null) {
      delete this.currentUser.password;
    }
  }

  getUserByEmail(email: string) {
    return this.httpClient.get(this.BACKEND_BASE + "/getByEmail/" + email)
  }
}
