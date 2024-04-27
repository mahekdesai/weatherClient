import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable, tap } from 'rxjs';
import { LoginResult } from './login-result';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public tokenKey : string = "worldCitiesToken";
  constructor(protected http: HttpClient) { }
  Login(item : LoginRequest) : Observable<LoginResult> {
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResult>(url, item)
    .pipe(tap(loginResult => {
      if(loginResult.success){
        localStorage.setItem(this.tokenKey, loginResult.token);
      }
    }));
    }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
