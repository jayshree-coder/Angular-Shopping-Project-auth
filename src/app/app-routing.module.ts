import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component'; // Import the LoginComponent
import { DashboardComponent } from './dashboard/dashboard.component'; // Import the DashboardComponent
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component'; // Import the DashboardLayoutComponent
import { AuthService } from './auth.service'; // Import the AuthService
import { AuthGuard } from './auth/auth-guard.service'; // Import the AuthGuard service

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, // Use AuthGuard for the login route
 {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthService], // Use AuthService for the dashboard route
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}