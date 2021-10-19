import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import jwt_decode from "jwt-decode";
import { decode } from 'querystring';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  public getLoggedInEmail = new Subject();

  constructor(
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { this.form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });}

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void>{
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
     
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;

        this.loginService.login(email, password).subscribe(res => {
          localStorage.setItem('token', res.token);
          let any = JSON.stringify(jwt_decode(res.token));
          let mail = JSON.parse(any).sub;

          console.log(JSON.parse(any))

          const role = JSON.parse(any).Authorities[0];
          
          if(role == "ADMIN") {
            this.loginService.isUserAdmin.next(true);
          }

          localStorage.setItem('currentMail', mail)

          this.loginService.isUserLoggedIn.next(true);

          this.loginService.getUserByEmail(localStorage.getItem('currentMail')).subscribe(res => {
            this.loginService.setCurrentUser(res);
          })

          this.router.navigate(['/products'])
        });

       
    }

    
    

  }

}
