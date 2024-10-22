import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../Model/User.model';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
  ToastrModule,
  RouterModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err: any;
  loading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  onRegister() {
    this.loading = true;
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        this.loading = false;
        alert('veillez confirmer votre email');
        this.router.navigate(['/verifEmail']);
        console.log(res);
      },
      error: (err: any) => {
        if ((err.status = 400)) {
          this.err = err.error.message;
        }
      },
    });
  }
}
