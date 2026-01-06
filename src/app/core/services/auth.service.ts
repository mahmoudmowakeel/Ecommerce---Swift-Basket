import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router)
  userData = null;

  registerFunction(data: object): Observable<any> {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/auth/signup`, data)
  }
  loginFunction(data: object): Observable<any> {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/auth/signin`, data)
  }

  saveUserData(): void {
    if (localStorage.getItem("userToken") !== null) {
      this.userData = jwtDecode(localStorage.getItem("userToken")!)
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login'])
  }

  verifyEmail(data: object): Observable<any> {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/auth/forgotPasswords`, data)
  }
  verifyOtp(data: object): Observable<any> {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/auth/verifyResetCode`, data)
  }
  verifyNewPass(data: object): Observable<any> {
    return this._HttpClient.put(`${environments.baseURL}/api/v1/auth/resetPassword`, data)
  }
}
