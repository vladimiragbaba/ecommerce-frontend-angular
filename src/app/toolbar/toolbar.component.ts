import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;

  isLoggedIn: boolean;

  constructor(private router: Router, private loginService: LoginService) { 
    loginService.isUserLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    })
  }

  ngOnInit(): void {
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('currentMail');
    this.loginService.setCurrentUser(null);
    this.loginService.isUserLoggedIn.next(false);
    this.loginService.isUserAdmin.next(false);
    this.router.navigate([''])
  }


}
