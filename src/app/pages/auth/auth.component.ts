import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = false;
  error: string = 'error';

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

  console.log(form);
  console.log(email, password);
  
  form.reset();
 }
}
