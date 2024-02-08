import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  isLogged() {
    return sessionStorage.getItem('user') != null;
  }

  LogOut() {
      localStorage.removeItem('token');
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('user');
  }
}
