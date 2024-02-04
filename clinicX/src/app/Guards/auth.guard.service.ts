
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const toast = inject(NgToastService);
  const guard = inject(AuthService);
  //if(localStorage.getItem('token')){
  if (guard.isLogged()) {
    return true;
  } else {
    toast.error({ detail: 'ERROR', summary: 'Login First!', duration: 5000 });
    router.navigate(['']);
    return false;
  }
};