import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, public router: Router) {}

  canActivate(): boolean {
    
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }

  }
 
}