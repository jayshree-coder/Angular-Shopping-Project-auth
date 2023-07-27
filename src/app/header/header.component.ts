import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Collapse } from 'bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void { 
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
    
      this.isLoggedIn = true;
      const userDataString = localStorage.getItem('userData') || '';
      const userData = JSON.parse(userDataString);
      this.userName = userData.username || '';

    } else {
      this.isLoggedIn = false;
    }
  }

  ngAfterViewInit(): void {
    const collapser = document.getElementById('navbarNav');
    new Collapse(collapser);
  }
}