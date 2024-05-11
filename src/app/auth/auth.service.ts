import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResult } from './login-result';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public tokenKey : string = "worldCitiesToken";
private _authStatus = new BehaviorSubject<boolean>(false);
public authStatus = this._authStatus.asObservable();

  constructor(protected http: HttpClient) { }
  Login(item : LoginRequest) : Observable<LoginResult> {
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResult>(url, item)
    .pipe(tap(loginResult => {
      if(loginResult.success){
        localStorage.setItem(this.tokenKey, loginResult.token);
        this._setAuthStatus(true);
      }
    }));
    }

  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }

  init() : void {
    if(this.isAuthenticated()){
      this._setAuthStatus(true);
    }
  }

  private _setAuthStatus(isAuthenticated : boolean) : void {
    this._authStatus.next(isAuthenticated);
  }

  isAuthenticated() : boolean {
    return this.getToken() !== null;
  }

  Logout() : void{
    localStorage.removeItem(this.tokenKey);
    this._setAuthStatus(false);
  }
}
