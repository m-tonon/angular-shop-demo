import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

import {environment} from '../../../../environments/environment';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) {}

  signup(_email: string, _password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: _email,
        password: _password,
        returnSecureToken: true
      }
    ).pipe (catchError(errorRes => {
        let errorMessage = 'An unkown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        }
        return throwError(() => errorMessage);
      }))
  }

  login(_email: string, _password: string) {
    // return this.http.post<AuthResponseData>()
  }
}