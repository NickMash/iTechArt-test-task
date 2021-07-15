import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public API_URL = 'http://localhost:8080/';
  public isAuthorized$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  get userToken() {
    return JSON.parse(<string>localStorage.getItem('token'));
  }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getUserInfo(): Observable <any> {
    const url = `${this.API_URL}user`;

    return this.http.get(url, {
      headers: {Authorization: 'Bearer ' + this.userToken}})
      .pipe(
        map((response: any) => response.data),
        catchError((error): any => {
          throw error;
        }));
  }

  logIn(loginData: { username: string, password: string }): Observable <any> {
    const url = `${this.API_URL}auth/login`;

    this.isAuthorized$.next(false);
    return this.http.post(url, loginData)
      .pipe(catchError((error): any => {
        this.isAuthorized$.next(true);
        throw error;
      }));
  }

  logOut(): Observable <any> {
    const url = `${this.API_URL}auth/logout`;

    localStorage.removeItem('token');
    return this.http.post(url, '')
      .pipe(catchError((error): any => {
        throw error;
      }));
  }
}
