import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
      this.router.navigate(['/dashboard']);
      return false; // Prevent navigating to the /login route
    } else {
      return true;
    }
  }
}