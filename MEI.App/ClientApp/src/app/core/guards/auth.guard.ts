import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSession } from '../config/app-session';

@Injectable()
export class AuthGuard implements CanActivate {

  // Inject Router so we can hand off the user to the Login Page 
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (AppSession.getSessionStorage("EmpDetails")) {
      // Token from the LogIn is avaiable, so the user can pass to the route
      return true
    } else {
      // Token from the LogIn is not avaible because something went wrong or the user wants to go over the url to the site
      // Hands the user to the LogIn page
      AppSession.setSessionStorage('RequestUrl',next.routeConfig.path); 
      this.router.navigateByUrl('login');
      return false
    }
  }
}