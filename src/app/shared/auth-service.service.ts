import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const url = environment.authUrl;
const loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANRFTCEcKsowG3X4AkwNbhU1Fr2_GkvXg";
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private _http: HttpClient) { }
  signUp(email, password): Observable<any> {
    const data = {

      'email': email,
      'password': password,
      'returnSecureToken': true
    }
    return this._http.post(`${url}`, data);
  }
  login(email, password): Observable<any> {
    const data = {
      'email': email,
      'password': password,
      'returnSecureToken': true
    }
    return this._http.post(`${loginUrl}`, data);
  }
  setDataToStorage(data) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('email', data.email),
      localStorage.setItem('idToken', data.idToken);
    localStorage.setItem('registered', data.registered)
    this.loggedIn.next(true);

  }
  isLoggedIn() {

    if (localStorage.getItem('loggedIn') === 'true') {
      return true;
    }
    else {
      return false;
    }

  }
  autoLogin() {

    if (localStorage.getItem('loggedIn') === 'true') {
      this.loggedIn.next(true);
      return true;
    }
    else {
      this.loggedIn.next(false);
      return false;
    }

  }
  getToken() {
    return localStorage.getItem('idToken');
  }
  clearStorage() {
    localStorage.clear();
    this.loggedIn.next(false)
  }
}
