import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './Services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Services/token.interceptor';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppComponent implements OnInit {
  title = 'Cars';
  Admin!: Boolean;
  Name!: String;
  connected!: Boolean;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loadToken();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateUserState();
      });
  }

  updateUserState() {
    const currentUrl = this.router.url;
    console.log(currentUrl);
    if (currentUrl === '/Register' || currentUrl === '/verifEmail') {
      return;
    }
    if (this.authService.getToken() == null || this.authService.isTokenExpired()) {
      this.router.navigate(['/Login']);
    }
    this.authService.decodeJWT();
    this.Admin = this.authService.isAdmin();
    this.Name = this.authService.loggedUser;
    this.connected = this.authService.isloggedIn;
    console.log('Navigation detected, user state updated:', this.connected);
  }

  logout() {
    this.authService.logout();
  }
}
