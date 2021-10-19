import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginSerivce: LoginService) {}

  intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(this.loginSerivce.BACKEND_BASE + '/login')) {
      return httpHandler.handle(request);
    }
    if(request.url.includes('http://localhost:8080/users/getByEmail')) {
      return httpHandler.handle(request);
    }
    const token = localStorage.getItem('token');
    const requestClone = request.clone({setHeaders: {
      Authorization: 'Bearer ' + token
    }})
    return httpHandler.handle(requestClone);
  }
}
