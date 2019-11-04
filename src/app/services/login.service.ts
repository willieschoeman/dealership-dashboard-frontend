import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { UrlService } from './url.service';

@Injectable()
export class LoginService {

  private authenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.authenticated.asObservable();

  constructor(private router: Router,
    private apiService: ApiService,
    private url: UrlService) { }

  // Public method for auth checking, referencing private method
  public isLoggedIn(): boolean {

    return this.authChecker();

  }

  // Private method for auth checking
  private authChecker(): boolean {

    if (sessionStorage.getItem("USERNAME") && sessionStorage.getItem("DEALERID")) {
      return true;
    } else {
      return false;
    }
  }

  // Logout user
  public logout() {
    this.authLogout();
    this.router.navigate(['login']);
  }


  // Auth logout
  private authLogout() {

    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("DEALERID");

  }

  // Authenticate an user on the cms
  authenticate(val) {
    return this.apiService.post(this.url.urls['auth'], val);
  }

  // Auth as observable
  updateAuth(val) {
    this.authenticated.next(val);
  }

}
