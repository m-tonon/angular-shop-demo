import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) {}

  signup(_email: string, _password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA71Mt-pFJjEoiNvAqJjWLI643ZFMPuVhI',
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
}