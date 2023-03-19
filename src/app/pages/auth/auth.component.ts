import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  error: string = 'error';

 ngOnInit(): void {
  this.authForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required)
  });
 }

 onSubmit(): void {
  if (!this.authForm.valid) {
    return
  }
  const email = this.authForm.value.email;
  const password = this.authForm.value.password;

  console.log(this.authForm);
 }
}
