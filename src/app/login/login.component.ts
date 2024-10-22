import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { User } from '../Model/User.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user = new User();
  err: number = 0;
  message: string = 'login ou mot de passe erronés..';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.err = 1;
        if (err.error.errorCause == 'disabled')
          this.message =
            'Utilisateur désactivé, Veuillez contacter votre Administrateur';
      },
    });
  }
}
