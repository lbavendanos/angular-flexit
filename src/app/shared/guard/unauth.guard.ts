import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean {
    return this.checkLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (!this.authService.isLoggedIn()) { return true; }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
