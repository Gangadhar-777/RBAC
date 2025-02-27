import { computed, inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = computed(() => authService.userDetails());

  if (!user()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const authChildGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = computed(() => authService.userDetails());

  const segment = route.url[route.url.length - 1]?.path;

  if (segment === 'admin' && user()?.roles !== 'ROLE_ADMIN') {
    router.navigate(['/login']);
    return false;
  }

  if (segment === 'hr' && user()?.roles !== 'ROLE_HR') {
    router.navigate(['/login']);
    return false;
  }
  if (segment === 'college' && user()?.roles !== 'ROLE_COLLEGE') {
    router.navigate(['/login']);
    return false;
  }
  if (segment === 'student' && user()?.roles !== 'ROLE_STUDENT') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
