import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = false;
  error: string = 'error';

  constructor(private authService: AuthService) {}

 ngOnInit(): void {
  this.authForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required)
  });
 }

 onSwitchMode() {
  this.isLoginMode = !this.isLoginMode;
 }

 onSubmit(form: FormGroup): void {
  if (!form.valid) {
    return
  }
  const email = form.value.email;
  const password = form.value.password;

  if(this.isLoginMode) {
    //...
  } else {
    this.authService.signup(email, password).subscribe(
      resData => {
        console.log(resData);
      }, errorRes => {
        console.log(errorRes);
      }
    )
  }
  
  form.reset();
 }
}
