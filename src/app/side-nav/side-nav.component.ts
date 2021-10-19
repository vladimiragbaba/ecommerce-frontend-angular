import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private loginService: LoginService) {

    loginService.isUserLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    })

    loginService.isUserAdmin.subscribe(res => {
      this.isAdmin = res;
    })

   }

  ngOnInit(): void {
  }

}
