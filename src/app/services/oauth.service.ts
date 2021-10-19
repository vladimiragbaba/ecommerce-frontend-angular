import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const OAUTH_CLIENT = 'express-client';
const OAUTH_SECRET = 'express-secret';
const API_URL = 'http://localhost:8080';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic' + btoa(OAUTH_CLIENT + OAUTH_SECRET)
  })
  
};

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) {

  }

  login(data: any) {
    return this.http.post(this.baseUrl + '/oauth/token', data);
  }

  redirectUrl = '';

  private static handleError(error:HttpErrorResponse):any{
    if(error.error instanceof ErrorEvent){
      console.error('An error occured: ',error.error.message)
    } else {
      console.error(
        'Backend returned code ${eror.status}',
      )
    }
  }
}
