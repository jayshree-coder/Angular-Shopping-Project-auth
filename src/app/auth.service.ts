import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {

    const accessToken = this.cookieService.get('accessToken');
    console.log('Access Token:', accessToken); 

    if (accessToken) {

      return true;

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}