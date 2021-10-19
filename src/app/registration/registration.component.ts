import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  public registerInvalid = false;
  private formSubmitAttempt = false;

  userExists: boolean = false;


  constructor( private fb : FormBuilder,
               private router: Router,
               private registrationService: RegistrationService,
               private loginService: LoginService) {
    this.form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
    firstName:['', Validators.required],
    lastName:['', Validators.required]
  }); }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void>{
    this.registerInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
     
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const firstName = this.form.get('firstName')?.value;
        const lastName = this.form.get('lastName')?.value;

        const jsonRegister = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        }

        this.registrationService.register(jsonRegister).subscribe(res => console.log(res));
        this.router.navigate([''])
       
  }

  }

  checkIfExists() {
    const email = this.form.get('email')?.value;
    if(email.length > 0) {
      this.loginService.getUserByEmail(email).subscribe(res => {
        if(res == null) {
          this.userExists = false;
        }
        else{
          this.userExists = true;
        }
      })
    }
  }

  

}
