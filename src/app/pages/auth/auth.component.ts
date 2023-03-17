import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
 form!: FormGroup;

 ngOnInit(): void {
  this.form = new FormGroup({
    'username': new FormControl(null),
    'password': new FormControl(null)
  });
 }

 onSubmit(): void {
  console.log(this.form);
 }
}
