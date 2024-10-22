import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.loadToken();
  authService.decodeJWT();

  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['app-forbidden']);
    return false;
  }
};
