import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;
  error?: string ;

  constructor(
    private authService: AuthService,
    private router: Router) {}

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

  let authObs: Observable<AuthResponseData>;

  if(this.isLoginMode) {
    authObs = this.authService.login(email, password);
  } else {
    authObs = this.authService.signup(email, password);
  }
  
  authObs.subscribe({
    next: (resData) => {
      console.log(resData)
      this.router.navigate(['/']);
    },
    error: (errorMessage) => {
      console.log(errorMessage),
      this.error = errorMessage}
      }
    )
  
  form.reset();
 }
}
