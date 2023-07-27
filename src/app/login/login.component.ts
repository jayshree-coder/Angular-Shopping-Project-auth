import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'; // Import the Router service


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
 username: string = '';
 password: string = ''; 

  constructor(private http: HttpClient, private toastr:ToastrService, private cookieService: CookieService,private router: Router ) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    const baseurl = environment.baseUrl;

    const formData = {
      username: this.username,
      password: this.password
    };

   this.http.post(`${baseurl}/login`, formData).subscribe(
      (data: any) => {

        this.toastr.success("Login Successfully") 
        let getrefreshToken = data.refreshToken;
        this.callRefreshTokenAPI(getrefreshToken);
       },
      (error) => {
        console.error('Login API error:', error.error.message);
        this.toastr.error(error.error.message);
      }
    );


  }
  
  callRefreshTokenAPI(refreshToken : string)
  {
    const baseurl = environment.baseUrl;
    const urlencoded = new URLSearchParams();
    urlencoded.append('refreshToken', refreshToken);

    this.http.post(`${baseurl}/refresh`, urlencoded.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .subscribe(
      (data: any) => {
        console.log('API response:', data);
        const accessToken = data.accessToken;
        const userData = data.user;

       
        localStorage.setItem("userData", JSON.stringify(userData));
        const expirationTime = 1; // in days
        this.cookieService.set('accessToken', accessToken, expirationTime, '/', 'localhost', false, 'Lax');
        this.router.navigate(['/dashboard']);

      },
      (error) => {
        console.error('API error:', error);
        const errorMessage = error.error.message || 'An error occurred during the API call';

        this.toastr.error(errorMessage);
      }
    );
  }
  
}
